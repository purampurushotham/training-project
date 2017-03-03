/**
 * Created by purushotham on 2/3/17.
 */
(function() {
    'use strict';

    angular.module('MSC')

        .factory('api', api);

    api.$inject = ['$resource', '$rootScope'];

    function api ($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }
    var getParamDefaults = function () {
        return {
            id : '@id'
        };
    };
    var getActions = function(){
        return {
            'viewProduct': {
                method : 'GET',
                url : '/api/products/:id'
            },
            "similarProduct":{
                method : "GET",
                url : "/api/products/similaritems/*"
            },
            'viewBandWiseProducts': {
                method : 'GET',
                url : "/api/products/subType/"
            },
            'getComments': {
                method : 'GET',
                url : "/api/products/comments/"
            }
        }
    }
}());