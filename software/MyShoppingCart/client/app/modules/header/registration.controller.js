/**
 * Created by purushotham on 6/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("registrationCtrl",registrationCtrl);
    registrationCtrl.$inject=['$uibModalInstance','userRegistrationFactory','fullName']
    function registrationCtrl($uibModalInstance,userRegistrationFactory,fullName) {
        var vm = this;
        vm.fullName = fullName;
        console.log(vm.fullName)
        vm.user={};
        console.log("registrationCtrl");
        vm.submitUser=submitUser;
        function submitUser(){
            console.log(vm.user)
            userRegistrationFactory.createUserNew(vm.user).then(
                function success(response){
                    console.log(response);
                },
                function failed(error) {
                    console.log(error);
                }
            );
        }
        vm.checkmail =function() {
            console.log(vm.user.email)
            console.log("in checkmail");
            if (typeof vm.user.email != 'undefined') {
                //api call
                var email = vm.user.email;
                console.log("api call");
                userRegistrationFactory.getExistedEmail(email).then(
                    function success(response) {
                        console.log(response);
                        vm.emailSet = response.res;
                        check(vm.user.email, vm.emailSet);
                    },
                    function failed(error) {
                        console.log(error);
                    }
                );
            }
        };
        //checking if the email exists in DB
        function check(usere,resultE) {
            if(usere === resultE){
                vm.exists=true;
            }
            else
                vm.exists=false;


        }
        vm.submit = function () {
            $uibModalInstance.close('submit');
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

}());
