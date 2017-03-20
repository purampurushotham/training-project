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
                logout : logout,
                forgotPassword : forgotPassword,
                resetPassword : resetPassword,
                getProfile : getProfile,
                createAddress: createAddress,
                getAddress :getAddress,
                deleteAddress : deleteAddress
            };
            return setOfUSerServices;
        function confirmUser(token){
            var query=token;
            var deffered=q.defer();
            
            return api.confirmUser({q:query}).$promise
        }
        function validateUser(user){
            var query=user;
            return api.validateUser({q:query}).$promise
        }
        function logout(id){
            var query=id;
            return api.logout({q:query}).$promise
        }
        function forgotPassword(email){
            var query=email;
            return api.forgotPassword({q:query}).$promise

        }
        function resetPassword(reset){
            var query=reset
            return api.resetPassword({q:query}).$promise
        }
        function getProfile(id){
            var query={}
            query.id=id
            return api.getProfile({q:query}).$promise


        }
        function createAddress(create){
            var query=create;
            return api.createAddress({q:query}).$promise
        }
        function getAddress(object){
            var query =object;
            return api.getAddress({q: query}).$promise
        }
        function deleteAddress(del) {
            var query=del;
            return api.deleteAddress({q: query}).$promise
        }
    }
}());