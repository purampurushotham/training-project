/**
 * Created by purushotham on 8/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.user')
        .controller('resetPasswordCtrl', resetPasswordCtrl)

    //function(
    resetPasswordCtrl.$inject=['$stateParams','$state','userService'];
    function resetPasswordCtrl ($stateParams,$state,userService){
        var vm=this;
        vm.token = $stateParams.token;
        vm.user={};
        vm.pass=false;
        vm.checkPassword = function (){
            if(vm.user.cpassword == vm.user.password)
                vm.pass=true;
            else
                vm.pass=false;
        };
        vm.resetPassword=resetPassword;
        function resetPassword(){
            userService.resetPassword(vm.user,vm.token).then(
                function success(response){
                    console.log(response);
                    if(response.status == 'ok'){
                        $state.go('Home')
                    }
                },
                function failed(error)   {
                    console.log(error)
                }
            );

        }
        vm.submit = function () {
            if(vm.resetForm .$valid){
                resetPassword();
                //$uibModalInstance.close('submit');
            }
        };

        vm.cancel = function () {
            //$uibModalInstance.dismiss('cancel');
        };
    }
}());
