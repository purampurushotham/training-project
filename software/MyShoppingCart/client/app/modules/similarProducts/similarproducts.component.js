/**
 * Created by purushotham on 01-02-2017.
 */
(function () {
    'use strict'
    angular.module('MSC.similarProducts')
        .component('similarProductsComponent',{
            templateUrl : "app/partials/similarProduct.html",
            controller : similarProduct,
            controllerAs : "sc",
            bindings:{

            }
        });
    function similarProduct() {
        var vm=this;
        //ierate tolist to get brand and subtype
        angular.forEach($rootScope.products, function (similarProduct, index) {
            if ( vm.vp.subType === similarProduct.subType) {
                console.log(vm.vp.subType);
                vm.similarProducts.push(similarProduct);
                console.log(vm.similarProducts);
            }
        });
    }
}());