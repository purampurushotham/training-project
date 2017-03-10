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
        console.log("************************** "+vm.id)
        vm.address={};
        console.log("********************* table ctrl");
        console.log(vm.address);
        function createAddress(address){
            userService.createAddress(address,vm.id).then(
                function success(response) {
                    console.log(response);
                    vm.success = response;
                    console.log(vm.success);
                    console.log("**************************success");
                },
                function failed(error) {
                    console.log("invalid userid or password");
                    console.log("**************************Failed");
                }
            );
        }
        vm.submit = function () {
            if(vm.addressForm.$valid) {
               createAddress(vm.address);
                console.log(vm.address);
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

