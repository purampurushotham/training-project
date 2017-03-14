/**
 * Created by purushotham on 10/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("tableCtrl",tableCtrl);
    tableCtrl.$inject=['userService','$uibModalInstance','obj','NgTableParams']
    function tableCtrl(userService,uibModalInstance,obj,NgTableParams){
        var vm=this;
        /*vm.id=id;
        vm.address={};
         console.log(vm.address);
         console.log(id)
         */
        vm.obj=obj
        vm.address=vm.obj.address
        console.log(vm.address)
        console.log(vm.obj)
        function createAddress(obj){
            userService.createAddress(vm.address,vm.obj.id).then(
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
                uibModalInstance.close(vm.obj);
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

