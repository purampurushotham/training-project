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
            resetPassword : resetPassword,
            getProfile : getProfile,
            createAddress: createAddress,
            getAddress :getAddress,
            deleteAddress : deleteAddress
        };
        return setOfUSerServices;
        function confirmUser(token){
            var query={};
            var deffered=q.defer();
            query.token=token;
            return api.confirmUser({q:query}).$promise
        }
        function validateUser(user){
            var query={}
            query.email=user.email;
            query.password=user.password;
            return api.validateUser({q:query}).$promise
        }
        function forgotPassword(email){
            var query=email;
            return api.forgotPassword({q:query}).$promise

        }
        function resetPassword(user,token){
            var query={};
            query.user=user;
            query.token=token;
            return api.resetPassword({q:query}).$promise
        }
        function getProfile(id){
            var query={}
            query.id=id
            return api.getProfile({q:query}).$promise


        }
        function createAddress(address,id){
            var query={}
            query.address=address
            query.id=id;
            return api.createAddress({q:query}).$promise
        }
        function getAddress(id){
            var query =id;
            return api.getAddress({q: query}).$promise
        }
        function deleteAddress(address,id) {
            var query={};
            query.address=address;
            query.id=id;
            return api.deleteAddress({q: query}).$promise
        }
    }
}());