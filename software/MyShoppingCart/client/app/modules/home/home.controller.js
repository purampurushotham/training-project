/**
 * Created by purushotham on 17-01-2017.
 */
(function(){

    angular
        .module('MSC.home')
        .component('homeComponent',{
            templateUrl : "app/partials/topProducts.html",
            controller : homeController,
            controllerAs : "hc"
        });
    homeController.$inject=['$rootScope'];
    function homeController($rootScope) {
        var vm = this;
        //after calling the service in app.run storing  top rated products in rootscope.products for only once
        vm.products=$rootScope.products;
        angular.forEach(vm.products, function(each,index){
            console.log(each)
            
        });
    }
}());

