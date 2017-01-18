/**
 * Created by purushotham on 17-01-2017.
 */
(function(){

    angular
        .module('MSC.home')
        .controller('homeController', homeController);
       homeController.$inject=['samData'];
    function homeController(samData) {
      var vm=this;
        vm.product=[];
        vm.products=[];
        samData.get().then (function (msg) {

            vm.products=msg;
            console.log("In Home controller"+vm.products);
        });

    }   
  /*  function getSelectedData(products) {


    }*/
}());