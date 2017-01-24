/**
 * Created by purushotham on 19-01-2017.
 */
(function () {
    angular
        .module("MSC.view")
        .controller("viewCtrl",viewCtrl);

    viewCtrl.$inject=['$stateParams','$rootScope'];
    function viewCtrl($stateParams,$rootScope) {
        var vm=this;
        vm.similarProducts=[];
        vm.id=$stateParams.id;
        vm.vp={};
        vm.ele=$rootScope.products;
        //iterateto list to get id
        function getId() {
            angular.forEach($rootScope.products, function (product, index) {
                if (vm.id === product.id) {
                    console.log("matchfound" + vm.id);
                    vm.vp = product;
                }
            });
        }
        function similarProduct() {
            //ierate tolist to get brand and subtype
            angular.forEach($rootScope.products, function (similarProduct, index) {
                if (vm.vp.brand === similarProduct.brand && vm.vp.subType === similarProduct.subType && vm.vp != similarProduct) {
                    vm.similarProducts.push(similarProduct);
                    console.log(vm.similarProducts);
                }
                console.log("in similarProduct")
            });
        }

        function sliderFeature() {
            vm.copySimilarProds=angular.copy(vm.similarProducts);
            console.log(vm.copySimilarProds)
            /* slideer */
            vm.slider = {
                minValue:vm.ele[0].price,
                maxValue:vm.ele[20].price,
                options: {
                    floor: 1000,
                    ceil:30000,
                    step: 1000,
                    /*minRange: 1000,
                    maxRange: 100000,*/
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
            function onSliderChange() {
                console.log("in slide change")
                vm.similarProducts = [];
                angular.forEach(vm.copySimilarProds, function (eachProd, index){
                    if(eachProd.price <= vm.slider.maxValue && eachProd.price >= vm.slider.minValue) {
                        vm.similarProducts.push(eachProd);
                        console.log(  vm.similarProducts);
                    }
                });

            }

        }
        function userDefinedPagination(){
            vm.currentPage=1;
            vm.pageCount=5;
            vm.pageLimit=5;
            vm.pages=[];
            vm.pageButtonDisabled = function(data) {
                if (data == -1) {
                    return vm.currentPage == 0;
                }
                return vm.currentPage >= dataFactory.data.length/vm .pageSize - 1;
            }
        }
            //calling getId function
        getId();
        similarProduct();
        sliderFeature();
    }

})();
