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
        vm.products = angular.copy($rootScope.products);}
}());

