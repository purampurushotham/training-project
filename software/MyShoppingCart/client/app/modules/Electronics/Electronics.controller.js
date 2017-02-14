/**
 * Created by purushotham on 18-01-2017.
 */
(function(){
    'use strict';
    angular
        .module('MSC.Electronics')
        .component('electronicsComponent',{
            templateUrl : "app/partials/productsType.html",
            controller: ElectronicsCtrl,
            controllerAs : "ec"
        });
    ElectronicsCtrl.$inject=['$stateParams',"$rootScope"];
    function ElectronicsCtrl($stateParams,$rootScope) {
        var vm=this;
        vm.$onInit=function(){
            console.log("in electronics controller");
            vm.products=$rootScope.products;
            vm.electronic_subType=$stateParams.productType;
            console.log(vm.electronic_subType);


           /* vm.viewState = function (id) {
                $state.go('view', {id:id});

            }*/

        }

    }
})();