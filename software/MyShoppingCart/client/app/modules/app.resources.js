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
                url : '/api/v1.0/products/:id'
            },
            "getSearchedProduct": {
                method : 'GET',
                url : '/api/v1.0/products/search'
            },
            "similarProduct":{
                method : "GET",
                url : "/api/v1.0/products/viewProduct/similaritems/"
            },
            'viewBandWiseProducts': {
                method : 'GET',
                url : "/api/v1.0/products/viewProduct/category/"
            },
            'getSelectedBrands' : {
                method : 'GET',
                url : "/api/v1.0/products/category/brands"
            },
            'getOffers' :{
                method : 'GET',
                url : "/api/v1.0/products/category/offers/"
            },
            'filteredProducts':{
                method :'GET',
                url : "/api/v1.0/filteredProducts/"
            },
            'getExistedEmail' : {
                method : "GET",
                url : "/api/v1.0/users/getExistedEmail/"
            },
            'createUserNew': {
                method : 'POST',
                url : "/api/v1.0/users/addUser"
            },
            'confirmUser':{
                method : 'PUT',
                url : "/api/v1.0/users/confirmUser"
            },
            'validateUser' : {
                method : 'GET',
                url : "/api/v1.0/user/authenticate"
            },
            'logout' : {
                method : 'GET',
                url : "/api/v1.0/user/logout"
            },
            'forgotPassword' : {
                method : "GET",
                url : "/api/v1.0/users/forgotPassword"
            },
            'resetPassword' : {
                method : 'PUT',
                url : "/api/v1.0/users/resetPassword"
            },
            'getProfile': {
                method : "GET",
                url : "/api/v1.0/user/profile"
            },
            'createAddress' : {
                method  : 'POST',
                url : "/api/v1.0/users/address/create"
            },
            'getAddress' : {
                method : "GET",
                url : "/api/v1.0/users/profile/address"
            },
            'deleteAddress' : {
                method : 'DELETE',
                url : "api/v1.0/users/profile/deleteAddress"
            }
        }
    }
}());