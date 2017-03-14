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
                vm.profile = response.data.profile;
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
                count: 6

            },{

                //counts : [2,5,10,25,50,100],
                getData: function (params) {
                    var query={
                        page_size : params.count()=== -1 ? 0 : params.count(),
                        page : params.page(),
                        id : vm.id ,
                        sortingCriteria : params.sorting()
                    }
                    console.log(params);
                    return userService.getAddress(query).then(function (response) {
                        /*//params.total(data.inlineCount); // recal. page nav controls*/
                        vm.userTable = response.data;
                        params.total(vm.userTable.length);
                        console.log("***************************** in get address");
                        var filterObj = params.filter(),filteredData = $filter('filter')(vm.userTable, filterObj);
                        var sortObj = params.sorting(), orderedData = $filter('orderBy')(filteredData, filterObj);
                        var data= orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        console.log(data)
                        return data;
                    });
                }

            });
        }
        /*
        var isFilterApplied = true;
        if(angular.equals(params.filter(), {})) { isFilterApplied = false; }
        var query = {
            page_size: params.count() === -1 ? 0 : params.count(),
            page:params.page(),
            firstName:params.filter()["firstName"],
            email:params.filter()["email"],
            phoneNumber:params.filter()["phoneNumber"],
            isPayeeNotAllowed:true
        };
        return addUserService.getAllUser(query).then(function(response) {
            vm.noRecordMessage=false;
            vm.isDataExist = (response.data.length === 0)
            params.total(response.pagination.total);
            if( vm.isDataExist && !isFilterApplied){
                vm.noRecordMessage=true;
            } else {
                var orderedData = params.sorting() ?
                    $filter('orderBy')(response.data, params.orderBy()) : response.data;
                return orderedData;
            }
        }, function(error) {
            console.error('Error occured while loading data.');
        });
    }});
}*/

        function saveOrUpdateModal(row) {
            console.log(row)
            if(row != null)
                vm.obj.address=row
            else
                vm.obj.address={}
            console.log(vm.obj)
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
            userService.deleteAddress(address,vm.id).then(function success(response) {
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