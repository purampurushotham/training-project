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
    checkBoxCtrl.$inject=[];
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
            /*  console.log("before removing duplicates");
             console.log(vm.singleList);
             */
            console.log(vm.selectedBrand);
            /*console.log("in checkBoxCtrl");
             console.log(vm.singleBrand);*/
            vm.removeDuplicates = function () {
                console.log("$$$$$$$$$$$$$$");
                angular.forEach(vm.singleList, function (similarType, index) {
                    if (angular.equals(similarType.subType, vm.singleBrand)) {
                        vm.duplicateList1.push(similarType);
                    }
                });
                /*console.log("in duplicate list1");
                 console.log(vm.duplicateList1);*/
                vm.singleList = [];
                angular.forEach(vm.duplicateList1, function (duplicateObject, index) {
                    vm.flag = false;
                    angular.forEach(vm.duplicateList2, function (singleObject, index) {
                        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                        console.log(duplicateObject)
                        if (angular.equals(duplicateObject.brand, singleObject.brand)) {
                            vm.flag = true
                        }
                    });
                    if (vm.flag == false && duplicateObject.brand != "") {
                        vm.duplicateList2.push(duplicateObject);
                    }
                });
            };
            vm.getBrands = function () {
                return vm.selectedBrand;
            };
            vm.removeDuplicates();
            /* console.log("after removing duplicates");
             console.log(vm.duplicateList2);*/
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
                vm.multipleCheckings();
            }
            vm.multipleCheckings = function () {
                vm.checkedList = [];
                vm.checkedList = angular.copy(vm.multiProduct);
                vm.multiProduct = [];
                console.log("multi select");
                angular.forEach(vm.selectedBrand,function(singleObject,index){
                   angular.forEach(vm.duplicateList1,function(selectedObject,index){
                        if(angular.equals(singleObject.brand,selectedObject.brand) &&
                            angular.equals(singleObject.subType,selectedObject.subType)){
                            console.log("equals")
                                vm.multiProduct.push(singleObject);
                        }
                    });
                });
                console.log(vm.multiProduct);
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
