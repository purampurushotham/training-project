/**
 * Created by purushotham on 19-01-2017.
 */
(function () {
    angular
        .module("MSC.view")
        .component("viewComponent",{
            templateUrl : "app/partials/product.html",
            controller : viewCtrl,
            controllerAs : "vc",
            bindings:{

            }
        })

    viewCtrl.$inject=['$stateParams','$rootScope'];
    //contorller function*/
    function viewCtrl($stateParams,$rootScope) {
        var vm = this;
        vm.similarProducts = [];
        vm.id = $stateParams.id;
        vm.vp = {};
        vm.ele = $rootScope.products;
        console.log(vm.id);
        getId();
        //iterate in list to get id*/
        function getId() {
            angular.forEach($rootScope.products, function (product, index) {
                if (vm.id === product.id) {
                    console.log("in get Id");
                    vm.vp = product;
                }
            });

        }
    }
    //retrieving similar products
    /*  function similarProduct() {
     //ierate tolist to get brand and subtype
     angular.forEach($rootScope.products, function (similarProduct, index) {
     //vm.vp.brand === similarProduct.brand &&
     if ( vm.vp.subType === similarProduct.subType) {
     console.log(vm.vp.subType);
     vm.similarProducts.push(similarProduct);
     console.log(vm.similarProducts);
     }
     //console.log("in similarProduct")
     });
     }
     //Price Range feature
     /!* function sliderFeature() {
     vm.copySimilarProds=angular.copy(vm.similarProducts);
     console.log(vm.copySimilarProds)
     /!* slideer *!/
     vm.slider = {
     minValue:vm.ele[0].price,
     maxValue:vm.ele[20].price,
     options: {
     floor: 1000,
     ceil:30000,
     step: 1000,
     /!*minRange: 1000,
     maxRange: 100000,*!/
     onChange: onSliderChange,
     translate: function(value, sliderId, label) {
     switch (label) {
     case 'model':
     return '<b>Min :</b> ₹' + value;
     case 'high':
     return '<b>Max :</b>₹'  + value;
     default:
     return '₹/' + value
     }
     }
     }
     };
     //slider on change
     function onSliderChange() {
     /!*  console.log("in slide change")*!/
     vm.similarProducts = [];
     angular.forEach(vm.copySimilarProds, function (eachProd, index){
     if(eachProd.price <= vm.slider.maxValue && eachProd.price >= vm.slider.minValue) {
     vm.similarProducts.push(eachProd);
     /!*console.log(vm.similarProducts);*!/
     }
     });

     }

     }*!/
     //PAgination function*!/
     function userDefinedPagination() {
     vm.currentPage = 0;
     vm.totalPages = 0;
     vm.pageSize = 3;
     vm.pagedData = angular.copy(vm.similarProducts);
     vm.similarProducts=[];
     //Closure Functions *!/
     /!*pageButtonDisabled*!/
     vm.pageButtonDisabled = function (data) {
     if (data == -1) {
     console.log("in pageButton");
     return vm.currentPage == 0;
     }
     return vm.currentPage >= vm.pagedData.length / vm.pageSize - 1;
     };
     /!*paginate*!/
     vm.paginate = function (nextPrevMultiplier) {
     vm.currentPage += (nextPrevMultiplier * 1);
     vm.similarProducts = vm.pagedData.slice(vm.currentPage * vm.pageSize);
     console.log("in paginate");
     };
     /!*end of closures*!/

     /!*retrieve set of similar products*!/
     function selectedPage() {
     vm.totalPages = Math.ceil(vm.pagedData.length / vm.pageSize);
     vm.similarProducts = vm.pagedData;
     }
     selectedPage();
     }
     /!*!//calling all methods*!/
     getId();
     similarProduct();
     sliderFeature();
     userDefinedPagination();

     /!*end of controller*!/*/


})();
