/**
 * Created by purushotham on 10/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("tableCtrl",tableCtrl);
    tableCtrl.$inject=['userService','$uibModalInstance','obj','NgTableParams','Regexes']
    function tableCtrl(userService,uibModalInstance,obj,NgTableParams,Regexes){
        var vm=this;
        /*vm.id=id;
         vm.address={};
         console.log(vm.address);
         console.log(id)
         */
        vm.obj=obj
        vm.address=vm.obj.address
        vm.zipCode_Pattern=Regexes.ZIPCODE_PATTERN
        console.log(vm.address)
        console.log(vm.obj)
        function createAddress(obj){
            var query={}
            query.address=vm.address
            query.id=vm.obj.id;
            userService.createAddress(query).then(
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

