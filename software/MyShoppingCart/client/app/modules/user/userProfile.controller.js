/**
 * Created by purushotham on 7/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("profileCtrl",profileCtrl);
    profileCtrl.$inject=['$localStorage','userService','$uibModal','NgTableParams','$filter']
    function profileCtrl($localStorage,userService,uibModal,NgTableParams,$filter){
        var vm=this;
        loadTable();
        vm.tableExists=false;
        vm.id=$localStorage.userDetails.id;
        vm.obj={};
        vm.obj.id=vm.id;
        vm.obj.address={};
        vm.profile={}
        userService.getProfile(vm.id).then(
            function success(response) {
                console.log(response)
                vm.profile = response.data      ;
                vm.tableExists=true;
            },
            function failed(error) {
                /*console.log(error);
                 console.log("**************************Failed");*/
            }
        );
        function loadTable() {
            console.log("In load table")
            vm.tableParams = new NgTableParams({
                page:1,
                count: 3

            },{

                counts : [2,5,10,25,50,100],
                getData: function (params) {
                    console.log(params.page(),params.count())
                    var query={
                        page_size : params.count()=== -1 ? 0 : params.count(),
                        page : (params.page()-1) * params.count(),
                        id : vm.id ,
                        sortingCriteria : params.sorting()
                    }
                    console.log(params);
                    return userService.getAddress(query).then(function (response) {
                        /*//params.total(data.inlineCount); // recal. page nav controls*/
                        vm.userTable = response.data;
                        console.log(response.pagination.total);
                        if(response.status == "ok"){
                        vm.message=response.messages;}
                        params.total(response.pagination.total);
                        console.log(params.total)
                        var filterObj = params.filter(),filteredData = $filter('filter')(vm.userTable, filterObj);
                        var sortObj = params.sorting(), orderedData = $filter('orderBy')(filteredData, filterObj);
                        var data= orderedData;
                        console.log(data)
                        return data;
                    });
                }

            });
        }
        function saveOrUpdateModal(row) {
            console.log(row);
            if(row != null)
                vm.obj.address=row;
            else
                vm.obj.address={};
            console.log(vm.obj);
            var modalInstance = uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/partials/address.html',
                controller: 'tableCtrl',
                controllerAs: 'tc',
                resolve: {
                    obj: function (){
                        return vm.obj;
                    }
                }
            });
            modalInstance.result.then(function (obj) {
                loadTable();
                console.log(vm.obj)


            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        vm.editRow=function (row) {
            saveOrUpdateModal(row);
        };
        vm.addRows = function (row) {
            console.log(row)
            saveOrUpdateModal(row);
        }
        vm.deleteRow=function(address){
            console.log("in delete row")
            console.log(address)
            var query={}
            query.address=address
            query.id=vm.id
            userService.deleteAddress(query).then(function success(response) {
                    if(response){
                        loadTable()
                    }
                },
                function failed(error) {
                    /*console.log(error);
                     console.log("**************************Failed");*/
                }
            );
        }
    }
}());