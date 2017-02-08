/**
 * Created by Ashoka on 2/7/2017.
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
            var clickCount = false;
            console.log(vm.singleBrand)
            vm.selectedBrand = [];
            vm.duplicateList1 = [];
            vm.duplicateList2 = [];
            /* functions */

            var removeDuplicates = function () {
                angular.forEach(vm.singleList, function (similarType, index) {
                    if (angular.equals(similarType.subType, vm.singleBrand)) {
                        vm.duplicateList1.push(similarType);
                    }
                });
                //removing duplicate products
                vm.singleList = [];
                angular.forEach(vm.duplicateList1, function (duplicateObject, index) {
                    vm.flag = false;
                    angular.forEach(vm.duplicateList2, function (singleObject, index) {
                        if (angular.equals(duplicateObject.brand, singleObject.brand)) {
                            vm.flag = true
                        }
                    });
                    if (vm.flag == false && duplicateObject.brand != "") {
                        vm.duplicateList2.push(duplicateObject);
                    }
                });
            };
            //function to get list of brands as check boxes
            vm.getBrands = function () {
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
                    console.log(vm.selectedBrand)

                }
                // calling for multiple selected checkboxes
                multipleCheckings();
                if (checked) {
                    vm.productsList = vm.multiProduct;
                }
                else if (!checked) {
                    vm.productsList = getOriginal();
                }
            };
            //function is called when clicked on multiple checkboxes
            var multipleCheckings = function () {
                vm.checkedList = [];
                vm.checkedList = angular.copy(vm.multiProduct);
                vm.multiProduct = [];
                angular.forEach(vm.selectedBrand, function (singleObject, index) {
                    angular.forEach(vm.duplicateList1, function (selectedObject, index) {
                        if (angular.equals(singleObject.brand, selectedObject.brand) &&
                            angular.equals(singleObject.subType, selectedObject.subType)) {
                            vm.multiProduct.push(selectedObject);
                        }
                    });
                });
            };
            //called when checkboxes are unchecked
            var getOriginal = function () {
                if (typeof vm.selectedBrand != 'undefined' && vm.selectedBrand.length === 0) {
                    return vm.duplicateList1;
                }
                else if (clickCount == false) {
                    multipleCheckings();
                    clickCount = true;
                    return vm.multiProduct;
                }
            };
            vm.slideFeature = function () {
                console.log("in slider feature");
                console.log(vm.productsList);
                vm.copySimilarProds = angular.copy(vm.productsList);
                console.log(vm.copySimilarProds);
                /* slideer */
                vm.slider = {
                    minValue: getMin,
                    maxValue: getMax,
                    options: {
                        floor: 1000,
                        ceil: 30000,
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
                    /*   console.log("in slide change")*/
                    vm.sliderProducts = [];
                    angular.forEach(vm.copySimilarProds, function (eachProd, index) {
                        if (eachProd.price <= vm.slider.maxValue && eachProd.price >= vm.slider.minValue) {
                            vm.sliderProducts.push(eachProd);
                        }
                    });
                    vm.productsList = vm.sliderProducts;
                    console.log('after slider changing')
                    console.log(vm.productsList)
                }

                function getMin() {
                    console.log("in min function");
                    return Math.min.apply(Math, vm.productsList.map(function (item) {
                        console.log()
                        return item.price;
                    }));
                }

                function getMax() {
                    console.log("in getmax function")
                    return Math.max.apply(Math, vm.productsList.map(function (item) {
                        return item.price;
                    }));


                }

            }
        }
    }
})();
/*console.log(vm.singleList);*/

/* vm.checkFirst = function() {
 vm.selectedBrand.splice(0, vm.selectedBrand.length, vm.singleList[0]);
 };

 vm.checkAll = function() {
 vm.selectedBrand.splice(0, vm.selectedBrand.length);
 for (var i in vm.singleList) {
 vm.selectedBrand.push(vm.singleList[i]);
 }
 };

 vm.uncheckAll = function() {
 vm.selectedBrand.splice(0, vm.selectedBrand.length);
 }
 */

/*    vm.compareFn = function(obj1, obj2){
 console.log("in compare function")
 console.log(obj1.brand)
 console.log("in compare function")
 console.log(obj2.brand)
 return obj1.brand === obj2.brand;
 };
 */
