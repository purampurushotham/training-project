/**
 * Created by Ashoka on 2/9/2017.
 */
//not using this component refer search controller
(function(){
    'use strict';
    angular.module('MSC.searchByBrand')
        .component('searchByBrandComponent',{
            templateUrl : "app/partials/searchByBrand.html",
            controller : searchByBrandCtrl,
            controllerAs : "sb",
            bindings :{
                checkBrand: "=",
            }
        });
    function searchByBrandCtrl(){
        var vm=this;
        console.log("in searchBy ctrl");
        vm.$onInit=function(){
            console.log(vm.checkBrand);
            vm.products=vm.checkBrand;
        }
    }
})();