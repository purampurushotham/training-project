/**
 * Created by purushotham on 3/3/17.
 */
(function () {
    'use strict';
    angular
        .module("MSC.Products")
        .factory("ProductsListService", ProductsListService);
    ProductsListService.$inject = ['api', '$q'];
    function ProductsListService(api,$q) {
        var getAllProducts = {
            viewProductsByBrand: viewProductsByBrand

        };
        return getAllProducts;
        
        function viewProductsByBrand(subType) {
            console.log("in ProductsListService " + " ****************" + "viewProductsByBrand");
            var query = {};
            query.subType=subType;
            var deferred = $q.defer();
            return api.viewBandWiseProducts({q: query}).$promise;
        }
    }
}());
