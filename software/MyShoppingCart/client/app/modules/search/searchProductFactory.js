/**
 * Created by purushotham on 6/3/17.
 */
(function () {
    'use strict';
    angular
        .module("MSC.search")
        .factory("searchProductFactory", searchProductFactory);
    searchProductFactory.$inject = ['api', '$q'];
    function searchProductFactory(api,q){
        var searchProduct={
            getSearchedProduct : getSearchedProduct
        };
        return searchProduct;
        function getSearchedProduct(keyword){
            var query ={}
            query.keyword=keyword;
            return api.getSearchedProduct({q:query}).$promise
        }
    }
}());
