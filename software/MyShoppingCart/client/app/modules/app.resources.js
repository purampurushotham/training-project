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
            "getSearchedProduct": {
                method : 'GET',
                url : '/api/products/search'
            },
            "similarProduct":{
                method : "GET",
                url : "/api/products/viewProduct/similaritems/"
            },
            'viewBandWiseProducts': {
                method : 'GET',
                url : "/api/products/viewProduct/category/"
            },
            'getSelectedBrands' : {
                method : 'GET',
                url : "/api/products/category/brands"
            },
            'getOffers' :{
                method : 'GET',
                url : "/api/products/category/offers/"
            },
            'filteredProducts':{
                method :'GET',
                url : "/api/filteredProducts/"
            },
            'getExistedEmail' : {
                method : "GET",
                url : "/api/users/getExistedEmail/"
            },
            'createUserNew': {
                method : 'POST',
                url : "/api/users/addUser"
            }

            
            /*'getComments': {
                method : 'GET',
                url : "/api/products/comments/"
            }
*/        }
    }
}());