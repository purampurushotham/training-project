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
            confirmUser:confirmUser
    };
        return setOfUSerServices;
        function confirmUser(token){
            var query={};
            var deffered=q.defer();
            query.token=token;
            return api.confirmUser({q:query}).$promise
        }
    }
}());