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
    searchCtrl.$inject=['$state','$rootScope','searchProductFactory']
    function searchCtrl($state,$rootScope,searchProductFactory) {
        var vm = this;
        vm.products = [];
        vm.limitNameSearch = 500;
        vm.checkName = function (lettersTyped) {
            if (lettersTyped.length > 2) {
                //api call for search products
                searchProductFactory.getSearchedProduct(lettersTyped).then(
                    function success(response){
                        if(response.status == "ok")
                            vm.products=response.data;
                    },
                    function failed(error) {
                    }
                );
                vm.limitNameSearch = 500;
            }
            else {
                vm.limitNameSearch = 0;
            }
        };
        vm.viewState = function (id) {
            $state.go('view', {id:id});

        }
    }
}());