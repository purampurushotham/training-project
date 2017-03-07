/**
 * Created by purushotham on 6/3/17.
 */
(function () {
    'use strict';
    angular
        .module("MSC.header")
        .factory("userRegistrationFactory", userRegistrationFactory);
    userRegistrationFactory.$inject=['api']
    function userRegistrationFactory(api){
        var registrationService={
            getExistedEmail:getExistedEmail,
            createUserNew:createUserNew
        };
        return registrationService;
    function getExistedEmail(keyword) {
        var query={};
        query.keyword=keyword;
        console.log("########################")
        console.log(query)
        return api.getExistedEmail({q:query}).$promise
    }
        function createUserNew(user) {
            var query=user;
            console.log("######################## in adduser")
            console.log(query)
            return api.createUserNew({q:user}).$promise
        }
    }
    
    

}());

