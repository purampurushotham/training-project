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
        function getSimilarProduct(type,subType,brand){
            console.log("in viewProductService "+" ****************" + "similarProduct");
            var query={};
            query.type =type;
            query.subType = subType;
            if(type == 'book') {
                query.language = brand;
            }else
                query.brand = brand;
            var deferred = $q.defer();
            //query = ObjToQueryParam(query)
            console.log("iiii"+query)
            console.log(query)
            return api.similarProduct({q:query}).$promise;
        }
       /* function getComments(productID){
            console.log("in viewProductService "+" ****************" + "getComments");
            var query={};
            query.productId=productID;
            var deferred = $q.defer();
            return api.getComments().$promise;
        }
*/
      /*  function ObjToQueryParam(query){
            var paramString = ""
            var names = Object.keys(query)
            for(var i = 0; i < names.length; i++) {
                paramString = paramString +names[i]+'='+query[names[i]]+'&'
            }
            return paramString
        }*/
    }
}());