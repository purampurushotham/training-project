/**
 * Created by purushotham on 2/7/2017.
 */
(function(){
    'use strict';
    angular.module('MSC.checkBoxes')
        .component("checkBoxesComponent",{
            templateUrl : "app/partials/checkboxes.html",
            controller : checkBoxCtrl,
            controllerAs : "cm",
            bindings : {
                productsList : "=",
                brandType : "=",
                multiSelect : "="
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
            vm.duplicateList1 = [];
            vm.duplicateList2 = [];
            /* functions */
            /*vm.getBookBrands=function(){

             }*/
            var removeDuplicates = function () {
                angular.forEach(vm.singleList, function (similarType, index) {
                    if (angular.equals(similarType.subType, vm.singleBrand)) {
                        vm.duplicateList1.push(similarType);
                    }
                });
                //removing duplicate products
                vm.singleList = [];

                console.log(vm.duplicateList2)
                angular.forEach(vm.duplicateList1, function (duplicateObject, index) {
                    vm.flag = false;
                    angular.forEach(vm.duplicateList2, function (singleObject, index) {
                        console.log("before loop")
                        if (angular.equals(duplicateObject.brand, singleObject.brand)) {
                            vm.flag = true
                        }
                    });
                    if (vm.flag == false && duplicateObject.brand != "") {
                        vm.duplicateList2.push(duplicateObject);
                    }
                });
            };
            //get offers in each brand
            angular.forEach()
            //function to get list of brands as check boxes
            vm.getBrands = function () {
                /*console.log("in selecting")
                 console.log(vm.selectedBrand)*/

                return vm.selectedBrand;
            };
            //calling to remove simlilar brands
            removeDuplicates();
            vm.singleList = angular.copy(vm.duplicateList2)
            //getting products based on brand
            vm.check = function (value, checked) {
                var idx = vm.selectedBrand.indexOf(value);
                if (idx >= 0 && !checked) {
                    vm.selectedBrand.splice(idx, 1);
                }
                if (idx < 0 && checked) {
                    vm.selectedBrand.push(value);
                    /*console.log(vm.selectedBrand)*/

                }
                // calling for multiple selected checkboxes
                multipleCheckings();
                if (checked) {
                    vm.productsList = vm.multiProduct;
                    /*console.log("in checked")*/
                    vm.slideFeature();
                }
                else if (!checked) {
                    /*console.log("in checkout")
                     console.log("before getoriginal")
                     console.log(vm.productsList);*/
                    vm.productsList = vm.getOriginal();
                    /*console.log("after getoriginal")
                     console.log(vm.productsList);*/
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
                            //console.log("in multiple checkings")

                        }
                    });
                });
            };
            //called when checkboxes are unchecked
            vm.getOriginal = function () {
                if (typeof vm.selectedBrand != 'undefined' && vm.selectedBrand.length === 0) {
                    /*console.log("in get Original");
                     console.log("getting error");*/
                    return vm.duplicateList1;
                }
                else  {
                    multipleCheckings();
                    return vm.multiProduct;
                }
            };
            vm.slideFeature = function () {
                /*console.log("in slider feature");
                 console.log(vm.productsList);*/
                vm.copySimilarProds = angular.copy(vm.productsList);
                console.log(vm.productsList);
                /* slideer */
                vm.slider = {
                    minValue: 1000,
                    maxValue: Math.max.apply(Math, vm.productsList.map(function (item) {return item.price})),
                    options: {
                        floor: 1000,
                        ceil: Math.max.apply(Math, vm.productsList.map(function (item) {return item.price})),
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
                /*var getMin=function () {
                 console.log("in min function");
                 Math.min.apply(Math, vm.productsList.map(function (item) {
                 console.log(item.price)
                 return item.price;
                 }));
                 }
                 var getMax= function getMax() {
                 console.log("in getmax function")
                 return Math.max.apply(Math, vm.productsList.map(function (item) {
                 console.log(item.price)
                 return item.price;
                 }));


                 }
                 */
                //slider on change
                function onSliderChange() {
                    /*   console.log("in slide change")*/
                    vm.sliderProducts = [];
                    angular.forEach(vm.copySimilarProds, function (eachProd, index) {
                        if (eachProd.price <= vm.slider.maxValue && eachProd.price >= vm.slider.minValue) {
                            vm.sliderProducts.push(eachProd);
                        }
                    });
                    vm.productsList = vm.sliderProducts;
                    /*console.log('after slider changing')
                     console.log(vm.productsList)*/
                }
            }
        }
    }
})();
