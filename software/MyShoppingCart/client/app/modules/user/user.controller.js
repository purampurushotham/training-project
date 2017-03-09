/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    angular.module('MSC.user')
        .controller('confirmregistration',confirmregistration);
    confirmregistration.$inject=['$stateParams','$state','userService']
    function confirmregistration($stateParams,$state,userService){
        console.log("in confirmationCtrl");
        var vm=this;
        vm.token=$stateParams.token;
        console.log(vm.token);
        resetToken(vm.token);
        function resetToken(token){
            userService.confirmUser(token).then(
                function success(response){
                    console.log(response);
                    if(response.data == null){
                        console.log("**************************success");
                        $state.go('confirmRegistration')
                    }
                },
                function failed(error) {
                    console.log(error.data);
                    if(error.data === "null"){
                    }
                    console.log("**************************Failed");
                }
            );
        }
        
    }
}());