/**
 * Created by purushotham on 3/3/17.
 */
(function () {
    'use strict';
    angular
        .module("MSC.Products")
        .factory("ProductsListService", ProductsListService);
    ProductsListService.$inject = ['api', '$q'];
    function ProductsListService(api,$q) {
        var getAllProducts = {
            viewProductsByBrand: viewProductsByBrand,
            getSelectedBrands:getSelectedBrands,
            getOffers : getOffers,
            filteredProducts:filteredProducts
        };
        return getAllProducts;
        
        function viewProductsByBrand(subType) {
            console.log("in ProductsListService " + " ****************" + "viewProductsByBrand");
            var query = {};
            query.subType=subType;
            var deferred = $q.defer();
            return api.viewBandWiseProducts({q: query}).$promise;
        }
        function getSelectedBrands(brand,subType){
            var query={};
            query.subType=subType;
            if(subType =='comic' || subType == 'fiction' || subType === 'bibilography'){
                query.language = brand;
            }
            query.brand=brand;
            var deferred = $q.defer();
            return api.getSelectedBrands({q: query}).$promise;
        }
        function getOffers(){
            return api.getOffers().$promise;
        }
        function filteredProducts(filteredObject,subtype,min,max){
            console.log("**********************8 filteredProducts****************")
                var brandsArray=getselectedBrands(filteredObject.filteredBrand);
                var offersArray =getSelectedOffers(filteredObject.filteredOffer)
            var query={};
            query.brandsArray=brandsArray;
            query.offers=offersArray;
            query.subtype=subtype;
            query.min=min;
            query.max=max;
            console.log("**********************8 filteredProducts****************")
            console.log(query);
            return api.filteredProducts({q:query}).$promise
        }
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
}());
