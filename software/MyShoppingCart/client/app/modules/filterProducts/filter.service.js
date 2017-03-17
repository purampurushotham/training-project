/**
 * Created by Ashoka on 2/14/2017.
 */
//not using this service  please refer productListFactory.js
(function(){
    'use strict';
    angular.module("MSC.checkBoxes")
        .service("filterProductsService",filterProductsService);
    function filterProductsService() {
        this.filterProducts=function(products, filterObj,protype,offer,minval,maxval) {

            //for brand
            var getfilteredBrands =function (filteredList){
                angular.forEach(filterObj.filteredBrand, function (eachBrand, index) {
                    angular.forEach(products, function (multipleObjects, index){
                        if(typeof multipleObjects.brand === 'undefined'){
                            multipleObjects.brand = multipleObjects.language
                        }
                        if(angular.equals(eachBrand,multipleObjects.brand) &&angular.equals(protype,multipleObjects.subType)){
                            filteredList.push(multipleObjects);
                        }
                    });
                });

                return getPrice(filteredList)

            };

            //for discounts
            var getfilteredOffers = function (filteredList) {
                if(filterObj.filteredOffer.length === 0)
                    return filteredList;
                var dummyList=angular.copy(filteredList);
                filteredList=[];
                angular.forEach(filterObj.filteredOffer, function (eachOffer, index) {
                    angular.forEach(dummyList, function (multipleObject, index) {
                        angular.forEach(multipleObject.offers, function (multipleOffers, index) {
                            if (multipleOffers.type == eachOffer) {
                                filteredList.push(multipleObject);
                            }

                        });
                    });
                });

                return getPrice(filteredList);
            };
            //filter based on price
            var getPrice = function (filteredList) {
                var copySimilarProds = angular.copy(filteredList);
                var filteredList = [];

                angular.forEach(copySimilarProds, function (eachProd, index) {
                    if (eachProd.price <= maxval && eachProd.price >= minval) {
                        filteredList.push(eachProd);
                    }
                });
                return isEmpty(filteredList);
            };
            //check for filteredList is empty or not
            var isEmpty=function(filteredList){
                if (filteredList.length === 0) {
                    filteredList = products;
                    return filteredList;
                }
                return filteredList;
            };

            this.filteredList = [];
            this.filteredList =getfilteredBrands(this.filteredList);
            this.filteredList = getfilteredOffers( this.filteredList);
            return this.filteredList;
        }

    }
}());