/**
 * Created by purushotham on 17-01-2017.
 */
(function(){

    angular
        .module('MSC.home')
        .component('homeComponent',{
            templateUrl : "app/partials/topProducts.html",
            controller : homeController,
            controllerAs : "hc",
            bindings :{
                pro: '@'
            }
        });
    /*  .controller('homeController', homeController)
     .directive('homeDirective',homeDirective);*/
    homeController.$inject=['samData','$rootScope'];

    function homeController(samData,$rootScope) {
        var vm = this;
        vm.products = angular.copy($rootScope.products);
        console.log("in home controller");
        vm.mobiles = 'mobiles';
        vm.laptops = 'laptops';
        vm.Books = 'Books';
        vm.type = "something"
        console.log("hhhhh"+vm.mobiles)
    }
}());

/* function homeDirective() {


 console.log("in homeDirective");
 return {
 restrict: 'EA',
 controller: homeController,
 controllerAs: 'hc',
 scope: {
 prodType: '@'
 },
 templateUrl: "app/partials/products.html",*/

/* link: function (scope,attrs) {*/
/*     // console.log(scope.proType)    ;*/
/*     console.log("attrs ==" + scope.prodType)*/
/*     if (scope.prodType === 'mobiles') {*/
/*         scope.type = "mobiles";*/
/*         console.log(scope.proType);*/
/*     }*/
/*     else if (scope.prodType === 'laptops') {*/
/*         scope.prodType = "laptops"*/
/*     }*/
/*     else if (scope.prodType === 'book') {*/
/*         scope.prodType = "comic";*/
/*     }*/
/* }*/
