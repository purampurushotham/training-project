/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module("MSC.search")
        .component("searchComponent",{
            templateUrl: "app/partials/search.html",
            controller : searchCtrl,
            controllerAs :"sc"
        });
    //.controller("searchCtrl",searchCtrl);
    searchCtrl.$inject=['$state','$rootScope','searchProductFactory']
    function searchCtrl($state,$rootScope,searchProductFactory) {
        var vm = this;
        vm.products = [];
        console.log("in Search controller");
        vm.limitNameSearch = 500;
        vm.checkName = function (lettersTyped) {
            console.log("in checkName");
            if (lettersTyped.length > 2) {
                //api call
                searchProductFactory.getSearchedProduct(lettersTyped).then(
                    function success(response){
                        console.log(response);
                        vm.products=response.data;
                        console.log("**************************success");
                        console.log(vm.products)
                        //    console.log($rootScope.products);
                    },
                function failed(error) {
                    console.log(error);
                    console.log("**************************Failed");
                }
                );
                vm.limitNameSearch = 500;            }
            else {
                vm.limitNameSearch = 0;
            }
        };
        vm.viewState = function (id) {
            $state.go('view', {id:id});

        }
    }
}());