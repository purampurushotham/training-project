
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
    function checkBoxCtrl() {
        var vm = this;
        vm.$onInit = function () {
            vm.singleList = vm.productsList;
            vm.multiProduct = vm.multiSelect;
            vm.singleBrand = vm.brandType;
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
                    minPrice : null,
                    maxPrice : null
                }
            };
            function removeDuplicates (filteredSubType) {
                angular.forEach(vm.singleList, function (eachDevice, index) {
                    if (!vm.allBrands[eachDevice.subType]) {
                        vm.allBrands[eachDevice.subType] = [];
                    }
                    if (vm.allBrands[eachDevice.subType].indexOf(eachDevice.brand) < 0) {
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
            console.log(vm.filteredBrands);
            vm.checkBrand = function (value, checked) {
                var index = vm.selectedBrand.indexOf(value);
                if (index >= 0 && !checked) {
                    vm.selectedBrand.splice(index, 1);
                }
                if (index < 0 && checked) {
                    vm.selectedBrand.push(value);
                }
                console.log(vm.filteredObjects)
            };
            function filterDevices(){
                console.log("in filter Devices");
                
            }
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

