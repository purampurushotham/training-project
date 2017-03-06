/**
 * Created by purushotham on 6/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("registrationCtrl",registrationCtrl);
    registrationCtrl.$inject=['$uibModalInstance','userRegistrationFactory']
    function registrationCtrl($uibModalInstance,userRegistrationFactory) {
        var vm = this;
            vm.user={};
            console.log("registrationCtrl");
            vm.submitUser=submitUser;
            function submitUser(){
                console.log("in submitUser");
                console.log(vm.user)
                userRegistrationFactory.createUserNew(vm.user).then(
                    function success(response){
                        console.log(response);
                        console.log("**************************success");
                        //    console.log($rootScope.products);
                    },
                    function failed(error) {
                        console.log(error);
                        console.log("**************************Failed");
                    }
                );
            }
            vm.limitNameSearch = 500;
            vm.checkmail =function(){
                    console.log(vm.user.email)
                    console.log("in checkmail");
                    if (typeof vm.user.email != 'undefined' ) {
                        //api call
                        var email=vm.user.email;
                        console.log("api call");
                        userRegistrationFactory.getExistedEmail(email).then(
                            function success(response){
                                console.log(response);
                                vm.emailSet=response.res;
                                console.log("**************************success");
                                console.log(vm.emailSet)
                                //    console.log($rootScope.products);
                                check(vm.user.email,vm.emailSet);
                            },
                            function failed(error) {
                                console.log(error);
                                console.log("**************************Failed");
                            }
                        );
                        vm.limitNameSearch = 500;            }
                    else {
                        vm.limitNameSearch = 0;
                    }
                };
        function  check(usere,resultE) {
            console.log("**************** in check function")
            if(usere === resultE){
                vm.exists=true;
            }
            else
                vm.exists=false;


        }
    }
    vm.ok = function () {
        $uibModalInstance.close(vm.selected.item);
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}());
