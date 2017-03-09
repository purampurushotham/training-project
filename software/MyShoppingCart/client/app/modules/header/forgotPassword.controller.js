/**
 * Created by purushotham on 8/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("forgotPasswordCtrl", forgotPasswordCtrl);
    forgotPasswordCtrl.$inject=['$uibModalInstance','userService','$state']
    function forgotPasswordCtrl(uibModalInstance,userService,$state) {
        console.log("in forgot password")
        var vm = this;
        vm.exists=true;
        vm.forgotPassword = forgotPassword;
        function forgotPassword() {
            console.log("calling")
            console.log(vm.user)
            userService.forgotPassword(vm.user).then(function success(response) {
                    console.log(response);
                    vm.success = response;
                    console.log(vm.success);
                    console.log("**************************success");
                    checkEmail();
                },
                function failed(error) {
                    console.log("invalid userid or password");
                    console.log("**************************Failed");
                }
            );
        }

        vm.submit = function () {
            if(vm.forgotForm.$valid){
                forgotPassword();
                 uibModalInstance.close('submit');
            };
        }
        function checkEmail() {
            if(vm.success.data.status=404){
                vm.message=vm.success.data.message;
                vm.exists=false;
            }
            else
                vm.exists=true;
        }
    }

}())
