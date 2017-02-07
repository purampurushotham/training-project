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
                brandType : "="


            }
        });
    checkBoxCtrl.$inject=[];
    function checkBoxCtrl() {
        var vm = this;
        vm.$onInit = function () {
            vm.singleList = vm.productsList;
            vm.singleBrand = vm.brandType;
            vm.selectedBrand = [];
            vm.duplicateList1=[];
            vm.duplicateList2=[];
          //  console.log(vm.selectedBrand);
            console.log("in checkBoxCtrl");
            vm.compareFn = function(obj1, obj2){
                console.log("in compare function")
                console.log(obj1.brand)
                console.log("in compare function")
                console.log(obj2.brand)
                return obj1.brand === obj2.brand;
            };
            vm.removeDuplicates=function(){
                console.log("$$$$$$$$$$$$$$");
                angular.forEach(vm.singleList,function(similarType,index){
                   if(angular.equals(similarType.subType,vm.singleBrand )){
                       vm.duplicateList1.push(similarType);
                   }
                });
                vm.singleList=[];
                angular.forEach(vm.duplicateList1,function(duplicateObject,index){
                    vm.flag=false;
                    angular.forEach(vm.duplicateList2,function(singleObject,index){
                        console.log(duplicateObject.brand + " "+singleObject.brand)
                        if(angular.equals(duplicateObject.brand, singleObject.brand)){ vm.flag = true };
                    });
                    if(vm.flag == false && duplicateObject.brand != "") {
                        vm.duplicateList2.push(duplicateObject); }
                });
            };

            vm.removeDuplicates();
            vm.singleList=angular.copy(vm.duplicateList2)
            console.log(vm.singleList)
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
        }
    }

})();
