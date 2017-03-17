/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("loginCtrl", loginCtrl);
    loginCtrl.$inject=['$uibModalInstance','userService','$localStorage','$uibModal','$state']
    function loginCtrl(uibModalInstance,userService,$localStorage,uibModal,$state){
        var vm=this;
        vm.fullName={
            firstName : "",
            lastName : ""
        };
        vm.exists=true;
        vm.user={};
        vm.validateUser = validateUser;
        function validateUser(){
            userService.validateUser(vm.user).then(
                function success(response) {
                    vm.success = response;
                    checkResult();
                },
                function failed(error) {
                }
            );
        }
        function checkResult(){
            if (vm.success.data){
                vm.exists = true;
                $localStorage.userDetails={};
                $localStorage.userDetails.firstName = vm.success.data.firstName;
                $localStorage.userDetails.lastName=vm.success.data.lastName;
                $localStorage.userDetails.id=vm.success.data.id;
                $state.go('Home')
                uibModalInstance.close('submit');
            }
            else if(angular.equals(vm.success.status,'failed')){
                vm.exists = false;
            }
        }
        vm.forgotPassword=function(){
            var modalInstance = uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/partials/forgotPassword.html',
                controller: 'forgotPasswordCtrl',
                controllerAs: 'fc',
                resolve: {

                }
            });
            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        vm.submit = function () {
            if(vm.loginForm.$valid) {
                validateUser();
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