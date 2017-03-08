/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("loginCtrl", loginCtrl);
    loginCtrl.$inject=['$uibModalInstance','userService','$localStorage','$uibModal']
    function loginCtrl(uibModalInstance,userService,$localStorage,uibModal){
        console.log("in login ctrl");
        var vm=this;
        vm.fullName={
            firstName : "",
            lastName : ""
        };
        console.log(vm.fullName)
        var exists=false;
        vm.user={};
        console.log(vm.user)
        vm.validateUser = validateUser;
        function validateUser(){
            console.log("user loigin");
            userService.validateUser(vm.user).then(
                function success(response){
                    console.log(response);
                    vm.success=response;
                    console.log(vm.success);
                    console.log("**************************success");
                    vm.fullName.firstName=vm.success.firstName;
                    vm.fullName.lastName=vm.success.lastName;
                    $localStorage.userDetails =vm.fullName;
                    console.log($localStorage.userDetails)
                },
                function failed(error) {
                    console.log("invalid userid or password");
                    console.log("**************************Failed");
                }
            );
            if(vm.success === "Login successfully"){
                exists=true;
                $state.go('Home')
            }
            else if(vm.success === "Login failed"){
                exists=false;
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
                console.log("*footer model instacndxe")
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        vm.submit = function () {
            uibModalInstance.close('submit');
        };
        vm.cancel = function () {
            uibModalInstance.dismiss('cancel');
        };
    }

}());