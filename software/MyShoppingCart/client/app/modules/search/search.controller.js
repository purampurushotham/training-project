/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module("MSC.search")
        .controller("searchCtrl",searchCtrl);
    searchCtrl.$inject=['samData','$state']
    function searchCtrl(samData,$state,checkName,viewState) {
        var vm = this;
        vm.product = {};
        //ssvm.products={};*/
        console.log("in Search controller");
        vm.limitNameSearch = 500

        vm.checkName = function (lettersTyped) {

            if (lettersTyped.length > 2) {
                vm.limitNameSearch = 500;
            }
            else {
                vm.limitNameSearch = 0;
            }
        }
        vm.viewState = function (id) {
            $state.go('view', {id:id});

        }
    }
}());