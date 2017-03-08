/**
 * Created by purushotham on 8/3/17.
 */
(function() {
    'use Strict'
    angular.module('MSC.user')
        .controller('resetPasswordCtrl', resetPasswordCtrl);
      //  .directive('compareTo',compareTo);
    //function(
    resetPasswordCtrl.$inject=['$stateParams','$state','userService'];
    function resetPasswordCtrl ($stateParams,$state,userService){
        var vm=this;
        console.log("#####################")
        vm.token = $stateParams.token;
        console.log("in reset password controller");
        vm.user={};
        vm.resetPassword=resetPassword;
        function resetPassword(){
            console.log("in resert password")
            console.log(vm.user,vm.token)
            userService.resetPassword(vm.user,vm.token).then(
                function success(response){
                    console.log(response);
                    if(response.data == null){
                        console.log("**************************success");
                        $state.go('Login')
                    }
                },
                function failed(error) {
                    console.log(error)
                    console.log(error);
                    if(error.data === "null"){
                    }
                    console.log("**************************Failed");
                }
            );
            
        }
    }
       /* var model = this;

        model.message = "";

        model.user = {
            username: "",
            password: "",
            confirmPassword: ""
        };

        model.submit = function(isValid) {
            console.log("h");
            if (isValid) {
                model.message = "Submitted " + model.user.username;
            } else {
                model.message = "There are still invalid fields below";
            }
        };

    };

    var compareTo = function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    };
*/
}());
