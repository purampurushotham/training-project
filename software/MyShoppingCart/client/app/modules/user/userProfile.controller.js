/**
 * Created by purushotham on 7/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("profileCtrl",profileCtrl);
    profileCtrl.$inject=['$localStorage','userService','$uibModal','NgTableParams']
    function profileCtrl($localStorage,userService,uibModal,NgTableParams){
        var vm=this;
        loadTable();
        vm.tableExists=false;
        vm.id=$localStorage.userDetails.id;
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
            vm.tableParams = new NgTableParams({}, {
                getData: function (params) {
                    // ajax request to api
                    return userService.getAddress(vm.id).then(function (response) {
                        /*//params.total(data.inlineCount); // recal. page nav controls*/
                        var data = response.data;
                        console.log("***************************** in get address");
                        console.log(data)
                        return data;
                    });
                }

            });
        }
        function saveOrUpdateModal() {
            var modalInstance = uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/partials/address.html',
                controller: 'tableCtrl',
                controllerAs: 'tc',
                resolve: {
                    id: function (){
                        return vm.id;
                    }
                }
            });
            modalInstance.result.then(function (id) {
                vm.id=id;
                loadTable();
                console.log(vm.id)


            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
         vm.editRow=function () {
             saveOrUpdateModal()
         };
        vm.addRows = function () {
            var modalInstance = uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/partials/address.html',
                controller: 'tableCtrl',
                controllerAs: 'tc',
                resolve: {
                    id: function (){
                        return vm.id;
                    }
                }
            });
            modalInstance.result.then(function (id) {
                vm.id=id;
                loadTable();
                console.log(vm.id)


            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
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