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
            var query={}
            query.user=vm.user
            query.token=vm.token
            userService.resetPassword(query).then(
                function success(response){
                    if(response.status == 'ok'){
                        $state.go('Home')
                    }
                },
                function failed(error)   {
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
