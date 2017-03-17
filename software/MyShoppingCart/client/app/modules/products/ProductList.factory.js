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
            viewProductsByBrand: viewProductsByBrand,
            getSelectedBrands:getSelectedBrands,
            getOffers : getOffers,
            filteredProducts:filteredProducts
        };
        return getAllProducts;

        function viewProductsByBrand(subType) {
            console.log("in ProductsListService " + " ****************" + "viewProductsByBrand");
            var query=subType;
            return api.viewBandWiseProducts({q: query}).$promise;
        }
        function getSelectedBrands(type){
            var query=type
            var deferred = $q.defer();
            return api.getSelectedBrands({q: query}).$promise;
        }
        function getOffers(){
            return api.getOffers().$promise;
        }
        function filteredProducts(q){
            var query=q;
            console.log(query);
            return api.filteredProducts({q:query}).$promise
        }

    }
}());
