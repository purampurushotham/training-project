/**
 * Created by purushotham on 25-01-2017.
 */
(function() {
    'use strict'
    angular.module('MSC.header')
        .component('headerComponent', {
            templateUrl: "app/partials/header.html",
            controller: headerCtrl,
            controllerAs: "hc"
        });
    headerCtrl.$inject = ['$uibModal'];
    function headerCtrl(uibModal) {
        console.log("in header ctrl")
        var vm = this;
        vm.items = ['item1', 'item2', 'item3'];
        vm.$onInit = function () {
            vm.registrationModal = function () {
                var modalInstance = uibModal.open({
                    animation: vm.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/partials/Registration.html',
                    controller: 'registrationCtrl',
                    controllerAs: 'rc',
                    resolve: {
                        items: function () {
                            return vm.items;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    vm.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            console.log("after header ctrl")
        }
        
    }
}());
// .controller('headerCtrl',headerCtrl)
// .directive('headerDirective',headerDirective);
/*headerCtrl.$inject=['headerDirective'];*/