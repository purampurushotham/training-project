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
        console.log(vm.fullName);
        vm.exists=true;
        vm.user={};
        console.log(vm.user);
        vm.validateUser = validateUser;
        function validateUser(){
            console.log("user loigin");
            userService.validateUser(vm.user).then(
                function success(response) {
                    console.log(response);
                    vm.success = response;
                    console.log(vm.success);
                    console.log("**************************success");
                    checkResult();
                },
                function failed(error) {
                    console.log("invalid userid or password");
                    console.log("**************************Failed");
                }
            );
        }
        function checkResult(){
            console.log("in check Result")
            if (vm.success.hasOwnProperty('firstName') && vm.success.hasOwnProperty('lastName')) {
                vm.exists = true;
                $localStorage.userDetails={};
                $localStorage.userDetails.firstName = vm.success.firstName;
                $localStorage.userDetails.lastName=vm.success.lastName;
                $localStorage.userDetails.id=vm.success.id;
                console.log($localStorage.userDetails)
                console.log("**************************success");
                $state.go('Home')
                uibModalInstance.close('submit');
            }
            else if (vm.success.data.status === 404) {
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