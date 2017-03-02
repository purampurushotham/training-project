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
    /*  .controller('homeController', homeController)
     .directive('homeDirective',homeDirective);*/
    homeController.$inject=['$rootScope'];
    function homeController($rootScope) {
        var vm = this;
        vm.products=$rootScope.products;
        angular.forEach(vm.products, function(each,index){
            console.log(each)
            
        })

        /*vm.type = vm.pro;
        var query ={
            productType : vm.type
        };
        homeData.getProdType(query).then(function (response) {
            console.log(response)
            },
            function (msg) {
                console.log("error");
            });
        
*/
    }
}());

