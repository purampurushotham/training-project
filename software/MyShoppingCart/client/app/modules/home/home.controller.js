/**
 * Created by purushotham on 17-01-2017.
 */
(function(){

    angular
        .module('MSC.home')
        .controller('homeController', homeController);
       homeController.$inject=['samData','$rootScope'];
    function homeController(samData,$rootScope) {
        var vm = this;

     //   vm.products=[];
      /*  vm.getData=function () {
            samData.getData().then(function (data) {
                    $rootScope.products={};
                $rootScope.products=data;
            },
            function (msg) {
                console.log("error");
            }); 
        };
        vm.getData();*/
        console.log("in home controller")
    }

}());