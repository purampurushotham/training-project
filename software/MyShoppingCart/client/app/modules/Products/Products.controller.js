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
        console.log("testinggg");
        var vm=this;
        vm.$onInit=function(){

            vm.electronic_subType=$stateParams.productType;
            console.log("in electronics controller");
            console.log(vm.electronic_subType)
            viewProductsByBrand(vm.electronic_subType);
            function viewProductsByBrand(subType){
                console.log("**&&&&&&&&&&&&&&&&&&&&&&&&&&^^^^^^^^^^^^^");
                ProductsListService.viewProductsByBrand(subType).then(success).catch(failed);
                function success(response){
                    console.log(response);
                    vm.productsList=response.data;
                    console.log("**************************success");

                }
                function failed(error) {
                    console.log(error);
                    console.log("**************************Failed");
                }
            }
            console.log(vm.electronic_subType);


           /* vm.viewState = function (id) {
                $state.go('view', {id:id});

            }*/

        }

    }
})();