
/* Created by purushotham on 2/7/2017*/
(function() {
    'use strict';
    angular.module('MSC.checkBoxes')
        .controller('filterCtrl',filterCtrl)
        .component("checkBoxesComponent", {
            templateUrl: "app/partials/checkboxes.html",
            controller: checkBoxCtrl,
            controllerAs: "cm",
            bindings: {
                productsList: "=",
                brandType: "=",
                allProducts: "="
            }
        });
    //Price Range feature
    filterCtrl.$inject=['ProductsListService']
    function filterCtrl(ProductsListService){
        console.log("in filter controller");}
    checkBoxCtrl.$inject=['ProductsListService']
    function checkBoxCtrl(ProductsListService) {
        var vm = this;
        vm.$onInit = function () {

            //defalut list of products
            vm.collection=vm.allProducts
            vm.eachProduct = vm.productsList;
            vm.selectedSubType = vm.brandType;
            if (vm.eachProduct.type === 'book') {
                vm.selectedBrand = vm.eachProduct.language;
            } else
                vm.selectedBrand = vm.eachProduct.brand;
            console.log(vm.selectedBrand)
            getSelectedBrands(vm.selectedBrand, vm.selectedSubType);
            function getSelectedBrands(selectedBrand, selectedSubType) {
                var query={}
                query.subType=selectedSubType;
                if(selectedSubType =='comic' || selectedSubType == 'fiction' || selectedSubType === 'bibilography')
                    query.language = selectedBrand;
                query.brand=selectedBrand;
                ProductsListService.getSelectedBrands(query).then(success).catch(failed);
                function success(response) {
                    console.log(response);
                    if(response.status == "ok")
                        vm.setBrands = response.data;
                }
                function failed(error) {
                    console.log(error);
                }
            }
            offerCtrl(vm.productsList);
            function offerCtrl(productsList) {
                getOffers();
                function getOffers() {
                    ProductsListService.getOffers().then(
                        function success(response) {
                            console.log(response);
                            if(response.status == "ok")
                                vm.setOffers = response.data;
                        },
                        function failed(error) {
                            console.log(error);
                        });
                }
            }
            /* sliderFeature(vm.productsList,vm.selectedSubType);*/
            vm.filteredObjects=
            {
                filteredBrand: [],
                filteredOffer: [],
                slider: {
                    minValue: 1000,
                    maxValue: 80000,
                    options: {
                        floor: 1000,
                        ceil: 80000,
                        step: 1000,
                        minRange: 1000,
                        maxRange: 80000,
                        translate: function (value, sliderId, label) {
                            switch (label) {
                                case 'model':
                                    return '<b>Min :</b> ₹' + value;
                                case 'high':
                                    return '<b>Max :</b>₹' + value;
                                default:
                                    return '₹/' + value
                            }
                        },
                        onChange : vm.checkBrand
                    }
                }
            };
            sliderFeature(vm.productsList,vm.selectedSubType);
            function sliderFeature(productsList,type) {
                console.log(productsList);
                vm.products = productsList;
                vm.proType=type;
                vm.copySimilarProds = angular.copy(vm.products);

            }
            if(vm.eachProduct.type == 'book' ){
                some();
            }
        };
        function some(){
            vm.filteredObjects.slider.minValue=100;
            vm.filteredObjects.slider.maxValue=6000;
            vm.filteredObjects.slider.options.step=10;
            vm.filteredObjects.slider.options.ceil=6000;
            vm.filteredObjects.slider.options.floor=100;
            vm.filteredObjects.slider.options.minRange=5000;
            vm.filteredObjects.slider.options.maxRange=6000;
            console.log(vm.filteredObjects.slider)
        }
        //calling service method when ever changes in any checkboxes or slider
        vm.checkBrand=function () {
            vm.min=vm.filteredObjects.slider.minValue;
            vm.max=vm.filteredObjects.slider.maxValue;
            vm.ProductType=vm.proType;
            //calling for selected brands and selected offers
            var brandsArray=getselectedBrands(vm.filteredObjects.filteredBrand);
            var offersArray =getSelectedOffers(vm.filteredObjects.filteredOffer)
            //saving all filters in one query
            var query={};
            query.brandsArray=brandsArray;
            query.offers=offersArray;
            query.subtype=vm.ProductType;
            query.min=vm.min;
            query.max=vm.max;
            ProductsListService.filteredProducts(query).then(
                function success(response) {
                    console.log(response);
                    if(response.status == "ok")
                        vm.filteredResult = response.data;
                    vm.allProducts=angular.copy(vm.filteredResult);
                },
                function failed(error) {
                    console.log(error);
                });
        };
        function getselectedBrands (filteredBrand){
            var brandArray=[];
            for(var i=0;i<filteredBrand.length;i++){
                console.log("%%%%%%%%%%%%%%%")
                console.log(filteredBrand[i])
                brandArray.push(filteredBrand[i]);
            }
            return brandArray;
        }
        function getSelectedOffers(filteredOffer){
            var offerArray=[];
            for(var i=0;i<filteredOffer.length;i++){
                offerArray.push(filteredOffer[i]);
            }
            return offerArray;
        }
    }
})();

