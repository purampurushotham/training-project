/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module("MSC.search")
        .controller("searchCtrl",searchCtrl);
    searchCtrl.$inject=['samData']
    function searchCtrl(samData,checkName) {
        var vm=this;
        vm.product={};
        //ssvm.products={};*/
        console.log("in Search controller");
        vm.limitNameSearch = 500

        vm.checkName = function(lettersTyped)
        {

            if(lettersTyped.length > 2)
            {
                vm.limitNameSearch = 500;
            }
            else{
                vm.limitNameSearch = 0;
            }
        }
    }

}());