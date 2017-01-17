/**
 * Created by purushotham on 17-01-2017.
 */
(function(){

    angular
        .module('MSC.home')
        .controller('homeController', homeController);
       homeController.$inject=['samData'];
    function homeController(samData) {
        console.log("In controller");
        var vm = this;
        samData.get().then(function (msg) {
            vm.msg = msg;
        });
    }
}());