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
        vm.forgotPassword = forgotPassword
        function forgotPassword() {
            console.log("calling")
            console.log(vm.user)
            userService.forgotPassword(vm.user).then(function success(response) {
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
            uibModalInstance.close('submit');
        };
    }
}())
