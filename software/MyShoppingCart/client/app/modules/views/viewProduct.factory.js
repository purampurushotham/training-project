/**
 * Created by purushotham on 2/3/17.
 */
(function () {
    angular
        .module("MSC.view")
        .factory("viewProductService", viewProductService);
    viewProductService.$inject = ['api','$q'];
    function viewProductService(api,$q) {
        var getProduct = {
            viewProduct: viewProduct
        };
        
        return getProduct;
        
        function viewProduct(id) {
            console.log("in viewProductService")
            var query={};
            query.id=id;
            var deferred = $q.defer();
            return api.viewProduct({q:query, id:id}).$promise;
        }
    }
}());