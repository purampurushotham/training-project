/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("loginCtrl", loginCtrl);
    loginCtrl.$inject=['$uibModalInstance','userService']
    function loginCtrl(uibModalInstance,userService){
        console.log("in login ctrl");
        var vm=this;
        vm.user={};
        userLogin(vm.user);
        function userLogin(user){
            userService.userLogin(user).then(
                function success(response){
                    console.log(response);
                    vm.sucess=response.res;
                    console.log("**************************success");
                    console.log(vm.sucess)
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
        vm.cancel = function () {
            uibModalInstance.dismiss('cancel');
        };
    }

}());