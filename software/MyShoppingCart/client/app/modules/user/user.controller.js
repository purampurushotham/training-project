/**
 * Created by purushotham on 7/3/17.
 */
(function() {
    angular.module('MSC.user')
        .controller('confirmregistration',confirmregistration);
    confirmregistration.$inject=['$stateParams','$state','userService']
    function confirmregistration($stateParams,$state,userService){
        var vm=this;
        vm.token=$stateParams.token;
        resetToken(vm.token);
        function resetToken(token){
            var query={}
            query.token=token;
            userService.confirmUser(query).then(
                function success(response){
                    if(response.data == null){
                        $state.go('confirmRegistration')
                    }
                },
                function failed(error) {
                    if(error.data === "null"){
                    }
                }
            );
        }

    }
}());