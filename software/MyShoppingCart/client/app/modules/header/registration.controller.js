/**
 * Created by purushotham on 6/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("registrationCtrl",registrationCtrl);
    registrationCtrl.$inject=['$uibModalInstance','userRegistrationFactory','Regexes','validation']
    function registrationCtrl($uibModalInstance,userRegistrationFactory,Regexes,validation) {
        var vm = this;
        vm.user={};
        vm.submitUser=submitUser;
        vm.namePattern =Regexes.NAME_PATTERN;
        vm.phonePattern=Regexes.PHONE_NO_PATTERN;
        vm.minLength=validation.USER_NAME_MIN_LENGTH;
        vm.maxLength=validation.USER_NAME_MAX_LENGTH;
        vm.passwordPattern=Regexes.PASSWORD_PATTERN;
        function submitUser(){
            userRegistrationFactory.createUserNew(vm.user).then(
                function success(response){

                },
                function failed(error) {

                }
            );
        }
        vm.checkmail =function() {
            if (typeof vm.user.email != 'undefined') {
                var email = vm.user.email;
                userRegistrationFactory.getExistedEmail(email).then(
                    function success(response) {
                        check(response.messages)
                    },
                    function failed(error) {
                    }
                );
            }
        };
        function check(message) {
            if(message == "email exists"){
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
