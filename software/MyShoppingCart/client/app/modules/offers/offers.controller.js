/**
 * Created by purushotham on 2/10/2017.
 */
(function(){
    'use strict';
    angular.module("MSC.offers")
        .component("offersComponent",{
            templateUrl: "app/partials/offers.html",
            controller : offerCtrl,
            controllerAs : "oc",
            bindings : {
                offeredProducts : "=",
                offerBrands : "="
            }
        })
        .
    offerCtrl.$inject =['ProductsListService']
    function offerCtrl(ProductsListService) {
        var vm = this;
        vm.$onInit = function () {
            console.log("in offer ctrl");
            getOffers();
            function getOffers() {
                ProductsListService.getOffers().then(success).catch(failed);
                function success(response) {
                    console.log("**************************success");
                    console.log(response);
                    vm.setOffers = response.data;
                    console.log(vm.setOffers);

                    //    console.log($rootScope.products);
                }

                function failed(error) {
                    console.log("**************************Failed");
                    console.log(error);
                }
            }

                /*vm.tempOffers = vm.offeredProducts;
                vm.tempBrands = vm.offerBrands;
                vm.offers = [];
                vm.duplicate_offers = [];
                vm.eacharray = [];
                vm.selectedOffer=[];
                angular.forEach(vm.tempOffers, function (singleObject, index) {
                    vm.offers.push(singleObject.offers)
                });
                angular.forEach(vm.offers, function (singleObject, first) {
                    angular.forEach(singleObject, function (innerObject, second) {
                        vm.eacharray.push(innerObject);
                    });
                });
                console.log(vm.eacharray)
                angular.forEach(vm.eacharray, function (singleObject, first) {
                    vm.flag = false;
                    angular.forEach(vm.duplicate_offers, function (duplicateObject, second) {
                        console.log("inside loop")
                        if(angular.equals(duplicateObject.type,singleObject.type)) {
                            vm.flag = true;
                        }

                    });
                    if (vm.flag == false && singleObject.type!= "") {
                        console.log("pushed")
                        vm.duplicate_offers.push(singleObject);
                    }
                });
                console.log(vm.duplicate_offers);
                vm.getOffers=function(){
                    return vm.selectedOffer;
                };
                vm.check = function (value, checked) {
                    var idx = vm.selectedOffer.indexOf(value);
                    if (idx >= 0 && !checked) {
                        vm.selectedOffer.splice(idx, 1);
                    }
                    if (idx < 0 && checked) {
                        vm.selectedOffer.push(value);
                        /!*console.log(vm.selectedBrand)*!/

                    }
                    console.log(vm.selectedOffer)*/
                /*angular.forEach(vm.duplicateList,function(duplicateObject,second){
                 vm.flag = false;
                 if(angular.equals(singleObject.type,duplicateObject.type)){
                 vm.flag = true;
                 if (vm.flag == false && singleObject!= "") {
                 vm.duplicateList.push(singleObject);
                 }
                 }
                 });
                 });*/
        }
    }
})();