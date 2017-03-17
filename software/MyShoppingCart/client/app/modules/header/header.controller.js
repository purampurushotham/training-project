/**
 * Created by purushotham on 25-01-2017.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .component('headerComponent', {
            templateUrl: "app/partials/header.html",
            controller: headerCtrl,
            controllerAs: "hc"
        });
    headerCtrl.$inject = ['$uibModal','$localStorage','$state','userService'];
    function headerCtrl(uibModal,$localStorage,$state,userService) {
        var vm = this;
        vm.$onInit = function () {
            vm.exists=false;
            checkLogin();
            vm.registrationModal = function () {
                var modalInstance = uibModal.open({
                    animation: vm.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/partials/Registration.html',
                    controller: 'registrationCtrl',
                    controllerAs: 'rc'
                });
                modalInstance.result.then(function () {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            vm.loginModal=function(){
                var modalInstance = uibModal.open({
                    animation: vm.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/partials/Login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'lc',
                    resolve: {
                        fullName: function () {
                            return vm.fullName;
                        }

                    }
                });
                modalInstance.result.then(function () {
                    checkLogin();
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            vm.logout= logout;
            function logout(){
                var id=$localStorage.userDetails.id;
                userService.logout(id).then(function (success){
                        if(success){
                            $localStorage.$reset();
                            vm.exists=false;
                            $state.go('Home');
                        }
                    },
                    function (failed){
                    });
            }
            function checkLogin(){
                if($localStorage.hasOwnProperty('userDetails')){
                    vm.oneUser={};
                    vm.oneUser.firstName=$localStorage.userDetails.firstName
                    vm.oneUser.lastName=$localStorage.userDetails.lastName;
                    vm.exists=true;
                }
            }

        };


    }
}());