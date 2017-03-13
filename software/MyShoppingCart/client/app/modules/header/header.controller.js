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
    headerCtrl.$inject = ['$uibModal','$localStorage','$state'];
    function headerCtrl(uibModal,$localStorage,$state) {
        console.log("in header ctrl")
        var vm = this;
        vm.$onInit = function () {
            vm.exists=false;
            console.log($localStorage);
            checkLogin();
            vm.registrationModal = function () {
                var modalInstance = uibModal.open({
                    animation: vm.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/partials/Registration.html',
                    controller: 'registrationCtrl',
                    controllerAs: 'rc',
                    resolve: {
                        fullName: function () {
                            return vm.fullName;
                        }
                    }
                });
                modalInstance.result.then(function (fullName) {
                    vm.fullName = fullName;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            console.log("after header ctrl");
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
                modalInstance.result.then(function (fullName) {
                    if($localStorage.userDetails){
                        vm.oneUser={};
                        vm.oneUser.firstName=$localStorage.userDetails.firstName
                        vm.oneUser.lastName=$localStorage.userDetails.lastName;
                        vm.exists=true;
                    }

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            vm.logout= logout;
            function logout(){
                $localStorage.$reset()
                vm.exists=false;
                $state.go('Home')
            }
            function checkLogin(){
                if($localStorage.hasOwnProperty('userDetails')){
                    vm.exists=true;
                }
            }

        };


    }
}());
// .controller('headerCtrl',headerCtrl)
// .directive('headerDirective',headerDirective);
/*headerCtrl.$inject=['headerDirective'];*/
/*
 $localStorage.userDetails = respone.data;
 console.log("$localStorage.userDetails ");
 console.log($localStorage.userDetails);
 vm.userIsLogged = true;*/
