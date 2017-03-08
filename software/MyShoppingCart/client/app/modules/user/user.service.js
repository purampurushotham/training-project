/**
 * Created by purushotham on 7/3/17.
 */
(function(){
    'use strict'
    angular.module('MSC.user')
        .factory('userService',userService);
    userService.$inject=['api','$q'];
    function userService(api,q){
        var setOfUSerServices={
            confirmUser:confirmUser,
            validateUser :validateUser,
            forgotPassword : forgotPassword,
            resetPassword : resetPassword
        };
        return setOfUSerServices;
        function confirmUser(token){
            var query={};
            var deffered=q.defer();
            query.token=token;
            return api.confirmUser({q:query}).$promise
        }
        function validateUser(user){
            console.log("in userLogin");
            console.log(user);
            var query={}
            query.email=user.email;
            query.password=user.password;
            return api.validateUser({q:query}).$promise
        }
        function forgotPassword(email){
            console.log("*************** in forgotPassword sertvice");
            var query=email;
            console.log(query)
            return api.forgotPassword({q:query}).$promise

        }
        function resetPassword(user,token){
            console.log("in resert password service");
            var query={};
            query.user=user;
            query.token=token;
            return api.resetPassword({q:query}).$promise
        }

    }
}());