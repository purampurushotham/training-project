
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
                filteredBrand:getBrand,
                filteredOffer:getOffers,
                filteredPrice:getPriceRange
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
                console.log(vm.selectedBrand)
            };
            function getBrand(brand){
                angular.forEach(vm.productsList,function(){})
            }
            //removing duplicate products
            /*
             /!* vm.singleList = [];
             console.log(vm.duplicateList1);
             angular.forEach(vm.duplicateList1, function (duplicateObject, index) {
             vm.flag = false;
             angular.forEach(vm.duplicateList2, function (singleObject, index) {

             if (angular.equals(duplicateObject.brand, singleObject.brand)) {
             vm.flag = true;
             }
             });
             if (vm.flag == false && duplicateObject.brand != "") {
             vm.duplicateList2.push(duplicateObject);
             //  console.log(vm.duplicateList2)
             }
             });
             };*!/
             var removeDuplicateOffers = function () {
             console.log("removeDuplicateOffers");
             angular.forEach(vm.duplicateList1, function (singleObject, index) {
             vm.offers.push(singleObject.offers);
             });
             // console.log(vm.offers);
             angular.forEach(vm.offers, function (singleObject, index) {
             console.log("-----------ok-------------");
             console.log(singleObject[0].type);
             angular.forEach(singleObject, function (singleOffer, index) {
             /!*TODO:REMOVE THIS LOOP*!/
             console.log("INSIDE SINGLE OFFER");
             console.log(singleOffer.type);
             vm.boolOffer = false;
             angular.forEach(vm.offersType, function (duplicateOffer, index) {
             console.log("INSIDE DUPLICATE OFFER");
             console.log(singleOffer.type + " " + duplicateOffer.type);
             if (angular.equals(duplicateOffer.type, singleOffer.type)) {
             vm.boolOffer = true;
             }
             });
             if (vm.boolOffer === false && singleOffer.type != "") {
             vm.offersType.push(singleOffer)

             }
             });
             });
             };
             //function to get list of brands as check boxes
             //get offers in each brand
             //calling to remove simlilar brands
             //after removing duplicate brands
             vm.singleList = angular.copy(vm.duplicateList2)
             //getting products based on brand
             vm.check = function (value, checked) {
             var index = vm.selectedBrand.indexOf(value);
             if (index >= 0 && !checked) {
             vm.selectedBrand.splice(index, 1);
             }
             if (index < 0 && checked) {
             vm.selectedBrand.push(value);
             }
             // calling for multiple selected checkboxes
             multipleCheckings();
             if (checked) {
             vm.productsList = vm.multiProduct;
             vm.slideFeature();
             }
             else if (!checked) {
             vm.productsList = vm.getOriginal();
             vm.slideFeature();
             }
             };
             //function is called when clicked on multiple checkboxes
             var multipleCheckings = function () {
             vm.multiProduct = [];
             angular.forEach(vm.selectedBrand, function (singleObject, index) {
             angular.forEach(vm.duplicateList1, function (selectedObject, index) {
             if (angular.equals(singleObject.brand, selectedObject.brand) &&
             angular.equals(singleObject.subType, selectedObject.subType)) {
             vm.multiProduct.push(selectedObject);
             console.log("in multiple checkings")

             }
             });
             });
             };
             //called when checkboxes are unchecked
             vm.getOriginal = function () {
             if (typeof vm.selectedBrand != 'undefined' && vm.selectedBrand.length === 0) {
             return vm.duplicateList1;
             }
             else {
             multipleCheckings();
             return vm.multiProduct;
             }
             };
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

