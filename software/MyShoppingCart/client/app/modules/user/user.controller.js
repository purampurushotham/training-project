/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    angular.module('MSC.user')
        .controller('confirmregistration',confirmregistration);
    confirmregistration.$inject=['$stateParams','userService']
    function confirmregistration($stateParams,userService){
        console.log("in confirmationCtrl");
        var vm=this;
        vm.token=$stateParams.token;
        console.log(vm.token);
        resetToken(vm.token);
        function resetToken(token){
            userService.confirmUser(token).then(
                function success(response){
                    console.log(response);
                    vm.sucess=response.res;
                    console.log("**************************success");
                    console.log(vm.sucess)
                },
                function failed(error) {
                    console.log(error.data);
                    if(error.data === "null"){
                        $state.go('oldUser');
                    }
                    console.log("**************************Failed");
                }
            );
        }
        
    }
}());