/**
 * Created by purushotham on 18-01-2017.
 */
(function(){
    'use strict';
    angular
        .module('MSC.Products')
        .component('productsComponent',{
            templateUrl : "app/partials/productsType.html",
            controller: ProductsCtrl,
            controllerAs : "pc"
        });
    ProductsCtrl.$inject=['$stateParams','ProductsListService'];
    function ProductsCtrl($stateParams,ProductsListService) {
        var vm=this;
        vm.$onInit=function(){
            vm.electronic_subType=$stateParams.productType;
            viewProductsByBrand(vm.electronic_subType);
            function viewProductsByBrand(subType){
                var query={}
                query.subType=subType
                ProductsListService.viewProductsByBrand(query).then(success).catch(failed);
                function success(response){
                    if(response.status == "ok")
                        vm.products=response.data;
                }
                function failed(error) {
                }
            }
        }
    }
})();