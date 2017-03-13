/**
 * Created by purushotham on 10/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("tableCtrl",tableCtrl);
    tableCtrl.$inject=['userService','$uibModalInstance','id','NgTableParams']
    function tableCtrl(userService,uibModalInstance,id,NgTableParams){
        var vm=this;
        vm.id=id
        vm.address={};
        console.log(vm.address);
        console.log(id)
        function createAddress(address){
            userService.createAddress(address,vm.id).then(
                function success(response) {
                    vm.success = response;
                },
                function failed(error) {
                }
            );
        }
        vm.submit = function () {
            if(vm.addressForm.$valid) {
                createAddress(vm.address);
                loadTable();
                uibModalInstance.close(vm.id);
            }
            else{
                vm.exists=false;
            }

        };
        vm.cancel = function () {
            uibModalInstance.dismiss('cancel');
        };

    }
}());

