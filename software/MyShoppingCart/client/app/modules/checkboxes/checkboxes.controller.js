
/* Created by purushotham on 2/7/2017*/
(function() {
    'use strict';
    angular.module('MSC.checkBoxes')
        .component("checkBoxesComponent", {
            templateUrl: "app/partials/checkboxes.html",
            controller: checkBoxCtrl,
            controllerAs: "cm",
            bindings: {
                productsList: "=",
                brandType: "=",
                multiSelect: "="
            }
        });
    checkBoxCtrl.$inject=['filterProductsService']
    function checkBoxCtrl(filterProductsService) {
        var vm = this;
        vm.$onInit = function () {
            vm.singleList = vm.productsList;
            vm.multiProduct = vm.multiSelect;
            vm.protype = vm.brandType;
            console.log(vm.singleBrand)
            vm.selectedBrand = [];
            vm.selectedOffer = [];
            vm.duplicateList1 = [];
            vm.duplicateList2 = [];
            vm.offersType = [];
            vm.offeredList = [];
            vm.offers = [];
            vm.allBrands = [];
            vm.allOffers = [];
            vm.filteredBrands=removeDuplicates(vm.brandType);
            vm.filteredOffers=[];
            vm.filteredObjects={
                filteredBrand: [],
                filteredOffer:[],
                filteredPrice:{
                    minPrice : 1000,
                    maxPrice : Math.max.apply(Math, vm.productsList.map(function (item) {
                        return item.price
                    })),
                    options: {
                        floor: 1000,
                        ceil: Math.max.apply(Math, vm.productsList.map(function (item) {
                            return item.price
                        })),
                        step: 1000,
                        minRange: 1000,
                        maxRange: 100000,
                        onChange: checkBrand,
                    }
                }
            };
            function removeDuplicates (filteredSubType) {
                angular.forEach(vm.singleList, function (eachDevice, index) {
                    if (!vm.allBrands[eachDevice.subType]) {
                        vm.allBrands[eachDevice.subType] = [];
                    }
                    if(typeof eachDevice.brand === 'undefined'){
                        console.log("in undefinerd");
                        eachDevice.brand = eachDevice.language;
                        console.log(eachDevice.brand)
                    }
                    if (vm.allBrands[eachDevice.subType].indexOf(eachDevice.brand) < 0) {
                        console.log("in if conditomn")
                        console.log(eachDevice.brand)
                        vm.allBrands[eachDevice.subType].push(eachDevice.brand);
                    }

                    angular.forEach(eachDevice.offers, function(eachOffer) {
                        if (!vm.allOffers[eachOffer.type]) {
                            vm.allOffers[eachOffer.type] = eachOffer;
                        }
                    });
                });
                if(filteredSubType === "Mobiles"){
                    return vm.allBrands.Mobiles;
                }
                else if(filteredSubType === "Laptops"){
                    console.log("in laptopa")
                    return vm.allBrands.Laptops;
                }
                else if(angular.equals(filteredSubType,"comic")){
                    return vm.allBrands.comic;
                }
                else if(angular.equals(filteredSubType,"fiction")){
                    return vm.allBrands.fiction;
                }
            };
            vm.filteredOffers=Object.keys(vm.allOffers);
            vm.checkfilter =checkBrand();
            function checkBrand() {
                console.log(vm.filteredObjects)
                vm.min=vm.filteredObjects.filteredPrice.minPrice;
                vm.max=vm.filteredObjects.filteredPrice.maxPrice;
                vm.productsList=[];
                vm.productsList=filterProductsService.filterProducts(vm.singleList ,vm.filteredObjects,vm.protype,vm.filteredOffers,vm.min,vm.max);

                console.log(vm.filteredObjects)

            };



            //removing duplicate products
            /*
             /!* vm.singleList = [];
             vm.slideFeature = function () {
             /!* slideer *!/
             vm.slider = {
             minValue: 1000,
             maxValue: Math.max.apply(Math, vm.productsList.map(function (item) {
             return item.price
             })),
             options: {
             floor: 1000,
             ceil: Math.max.apply(Math, vm.productsList.map(function (item) {
             return item.price
             })),
             step: 1000,
             minRange: 1000,
             maxRange: 100000,
             onChange: onSliderChange,
             translate: function (value, sliderId, label) {
             switch (label) {
             case 'model':
             return '<b>Min :</b> ₹' + value;
             case 'high':
             return '<b>Max :</b>₹' + value;
             default:
             return '₹/' + value
             }
             }
             }
             };
             //slider on change
             function onSliderChange() {
             /!*   console.log("in slide change")*!/
             vm.sliderProducts = [];
             angular.forEach(vm.copySimilarProds, function (eachProd, index) {
             if (eachProd.price <= vm.slider.maxValue && eachProd.price >= vm.slider.minValue) {
             vm.sliderProducts.push(eachProd);
             }
             });
             vm.productsList = vm.sliderProducts;
             /!*console.log('after slider changing')
             console.log(vm.productsList)*!/
             }
             };

             }*/
        }
    }
})();

