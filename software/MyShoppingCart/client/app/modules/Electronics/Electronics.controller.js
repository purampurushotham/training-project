/**
 * Created by purushotham on 18-01-2017.
 */
(function(){

    angular
        .module('MSC.Electronics')
        .controller('ElectronicsCtrl', ElectronicsCtrl);
    ElectronicsCtrl.$inject=['samData'];
    function ElectronicsCtrl(samData) {

        var vm = this;
        samData.get().then(function (msg) {
            vm.msg = msg;
        });
    }
}());