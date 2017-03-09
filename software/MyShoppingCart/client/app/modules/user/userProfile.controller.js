/**
 * Created by purushotham on 7/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("profileCtrl",profileCtrl);
    profileCtrl.$inject=['$localStorage','userService']
    function profileCtrl($localStorage,userService){
        console.log("in use profile");
        var vm=this;
        vm.id=$localStorage.userDetails.id;
         vm.profile={}
        userService.getProfile(vm.id).then(
            function success(response) {
                console.log(response);
                vm.profile = response.data.profile;
                console.log(vm.profile);
                console.log("**************************success");
            },
            function failed(error) {
                console.log("invalid userid or password");
                console.log("**************************Failed");
            }
        );
        console.log("after user service")
    }
}());