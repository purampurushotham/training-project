/**
 * Created by purushotham on 6/3/17.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .controller("registrationCtrl",function registrationCtrl($uibModalInstance, items) {
        var vm = this;
            console.log("registrationCtrl");
        vm.items = items;
        vm.selected = {
            item: vm.items[0]
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        console.log("after header ctrl")
    });
}());
