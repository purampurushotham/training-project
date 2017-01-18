/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module("MSC.search")
        .controller("searchCtrl",searchCtrl);
    function searchCtrl(){}
    searchCtrl.$inject=['samData']
    function searchCtrl(samData) {
        var vm=this;
        vm.product={};
        vm.products={};
        console.log("in Search controller");
        samData.get().then (function (msg) {

            vm.products=msg;
        });

    }
}());