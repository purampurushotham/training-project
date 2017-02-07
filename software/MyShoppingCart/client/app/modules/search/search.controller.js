/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module("MSC.search")
        .controller("searchCtrl",searchCtrl);
    searchCtrl.$inject=['samData','$state','$rootScope']
    function searchCtrl(samData,$state,$rootScope,checkName,viewState   ) {
        var vm = this;
        vm.products = [];
        //ssvm.products={};*/
        console.log("in Search controller");
        vm.limitNameSearch = 500;
        vm.product=$rootScope.products;
        vm.checkName = function (lettersTyped) {
        console.log("in checkName");
            if (lettersTyped.length > 2) {
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