/**
 * Created by purushotham on 2/3/17.
 */
(function () {
    'use strict';
    angular
        .module("MSC.view")
        .factory("viewProductService", viewProductService);
    viewProductService.$inject = ['api','$q'];
    function viewProductService(api,$q) {
        var getProduct = {
            viewProduct: viewProduct,
            getSimilarProduct : getSimilarProduct

        };

        return getProduct;

        function viewProduct(id) {
            console.log("in viewProductService")
            var deferred = $q.defer();
            return api.viewProduct({id:id}).$promise;
        }
        function getSimilarProduct(id,type,subType,brand){
            var query={};
            query.id=id
            query.type =type;
            query.subType = subType;
            if(type == 'book') {
                query.language = brand;
            }else
                query.brand = brand;
            var deferred = $q.defer();
            console.log("iiii"+query)
            console.log(query)
            return api.similarProduct({q:query}).$promise;
        }

    }
}());