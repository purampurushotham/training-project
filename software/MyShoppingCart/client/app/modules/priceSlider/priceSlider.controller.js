/**
 * Created by Ashoka on 2/7/2017.
 */
(function(){
    'use strict';
    angular
        .module('MSC.priceSlider')
        .component('sliderComponent',{
            templateUrl : "app/partials/rz-slider.html",
            controller: sliderFeature,
            controllerAs : "slc",
            bindings :{
                sliderProducts : "="
            }
        });
    //Price Range feature
    function sliderFeature() {
        var vm = this;
        vm.$onInit = function () {
            console.log("in slider feature");
            console.log(vm.sliderProducts);
            vm.copySimilarProds = angular.copy(vm.sliderProducts);
            console.log(vm.copySimilarProds);
            /* slideer */
            vm.slider = {
                minValue: 1000,
                maxValue: 30000,
                options: {
                    floor: 1000,
                    ceil: 30000,
                    step: 1000,
                    minRange: 1000,
                    maxRange: 100000,
                    onChange: onSliderChange,
                    translate: function (value, sliderId, label) {
                        switch (label) {
                            case 'model':
                                return '<b>Min :</b> ₹' + value;
                            case 'high':
                                return '<b>Max :</b>₹' + value;
                            default:
                                return '₹/' + value
                        }
                    }
                }
            };
            //slider on change
            function onSliderChange() {
                /*   console.log("in slide change")*/
                vm.sliderProducts = [];
                angular.forEach(vm.copySimilarProds, function (eachProd, index) {
                    if (eachProd.price <= vm.slider.maxValue && eachProd.price >= vm.slider.minValue) {
                        vm.sliderProducts.push(eachProd);
                        console.log(vm.sliderProducts);
                    }
                });

            }

        }



    }
})();