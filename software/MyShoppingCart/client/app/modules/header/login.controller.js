/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("loginCtrl", loginCtrl);
    loginCtrl.$inject=['$uibModalInstance','userService','$localStorage','$uibModal','$state']
    function loginCtrl(uibModalInstance,userService,$localStorage,uibModal,$state){
        console.log("in login ctrl");
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
                    console.log("**************************Failed");
                }
            );
        }
        function checkResult(){
            if (vm.success.hasOwnProperty('firstName') && vm.success.hasOwnProperty('lastName')) {
                vm.exists = true;
                //storing the user firstname lastname and id in localStorage
                $localStorage.userDetails={};
                $localStorage.userDetails.firstName = vm.success.firstName;
                $localStorage.userDetails.lastName=vm.success.lastName;
                $localStorage.userDetails.id=vm.success.id;
                $state.go('Home')
                uibModalInstance.close('submit');
            }
            else if (angular.equals(vm.success.data,"Login failed")) {
                vm.exists = false;
            }                }
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