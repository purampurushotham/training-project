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
                url : "/api/products/viewProduct/similaritems/*"
            },
            'viewBandWiseProducts': {
                method : 'GET',
                url : "/api/products/viewProduct/category/*"
            },
            'getSelectedBrands' : {
                method : 'GET',
                url : "/api/products/brands/*"
            },
            'getOffers' :{
                method : 'GET',
                url : "/api/products/offers/*"
            },
            'filteredProducts':{
                method :'GET',
                url : "/api/filteredProducts/*"
            }
            /*'getComments': {
                method : 'GET',
                url : "/api/products/comments/"
            }
*/        }
    }
}());