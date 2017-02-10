/**
 * Created by purushotham on 19-01-2017.
 */
(function () {
    angular
        .module("MSC.view")
        .controller("viewCtrl",viewCtrl)
        .component("viewComponent",{
            templateUrl : "app/partials/product.html",
            controller : ProductController,
            controllerAs : "vc",
            bindings :{
                reqId : "="
            }
        })
        .component("similarComponent",{
            templateUrl : "app/partials/similarProducts.html",
            controller :similarProduct,
            controllerAs: "sm",
            bindings : {
                productType :"=",
                same : "=",
                proBrand : "="
            }
        })
        .component("commentsComponent",{
            templateUrl:"app/partials/comments.html",
            controller : commentsCtrl,
            controllerAs: "cm",
            bindings :{
                sam: "="
            }
        })
        .component("paginationComponent",{
            templateUrl :"app/partials/pagination.html",
            controller : userDefinedPagination,
            controllerAs : "pc",
            bindings : {
                pages :"="
            }
        });
    //root controller
    viewCtrl.$inject=['$stateParams','$rootScope'];
    //root contorller function*/
    function viewCtrl($stateParams,$rootScope) {
        var vm = this;
        vm.similarProducts = [];
        vm.id = $stateParams.id;
        vm.ele = $rootScope.products;
        console.log(vm.id);
    }
    //getProduct controller
    ProductController.$inject=['$rootScope'];
    function ProductController($rootScope) {
        console.log("******************");
        var vm=this;
        vm.vp = {};
        vm.$onInit = function() {

            vm.t="something";
            console.log("in get fiunction");
            console.log(vm.reqId);

            angular.forEach($rootScope.products, function (product, index) {
                if (vm.reqId === product.id) {
                    console.log("in get Id");
                    vm.vp = product;
                }
            });
            vm.subType=vm.vp.subType;
            console.log("ssss"+vm.subType)

        };

    }
    similarProduct.$inject=['$rootScope'];
    function similarProduct($rootScope) {
        console.log("similarProducts");
        var vm = this;
        vm.$onInit = function () {
            console.log(this);
            vm.similarProducts=[];
            vm.ProductComments=[];
            vm.productRange=[];
            angular.forEach($rootScope.products, function (similarProduct, index) {
                if (vm.productType === similarProduct.subType &&vm.proBrand === similarProduct.brand && vm.same != similarProduct ){
                    vm.similarProducts.push(similarProduct);
                }
            });
            vm.productRange=vm.similarProducts;
            console.log(vm.similarProducts);
        };
    }
    function commentsCtrl(){
        console.log("in comments ctrl");
        var vm=this;
        vm.$onInit = function () {
            console.log(vm.sam);
            vm.commentsSize=2;
            vm.tempSize=vm.commentsSize
            vm.viewMore=function(){
                console.log("in viewMore function");
                console.log(vm.sam.length);
                if(vm.sam.length > vm.commentsSize ){
                    vm.commentsSize=(vm.commentsSize)+((vm.sam.length-1)/2);
                    console.log(vm.commentsSize);
                }
                else if(vm.sam.length < vm.commentsSize){
                    vm.commentsSize = vm.sam.length;
                }
            }
                vm.hideButton=function(){
                    if(angular.equals(vm.commentsSize,vm.sam.length)){
                        return true;
                    }
                    else
                        return false;
                }

        }

    }
    function userDefinedPagination() {
        var vm = this;
        console.log("userDefinedPagination");
        vm.$onInit = function () {

            console.log("%%%%%%%%%%%%%%%%%%%%%%");
            console.log(vm.pages);
            vm.currentPage = 0;
            vm.totalPages = 0;
            vm.pageSize = 3;
            vm.pagedData = angular.copy(vm.pages);
            vm.pages = [];
            console.log(vm.pagedData);
            vm.pageButtonDisabled = function (data) {
                if (data == -1) {
                    console.log("in pageButton");
                    return vm.currentPage == 0;
                }
                return vm.currentPage >= vm.pagedData.length / vm.pageSize - 1;
            };
            /*/!*paginate*!/*/
            vm.paginate = function (nextPrevMultiplier) {
                vm.currentPage += (nextPrevMultiplier * 1);
                vm.pages = vm.pagedData.slice(vm.currentPage * vm.pageSize);
                console.log("in paginate");
                console.log(vm.pages);
            };
            vm.selectedPage=function(){
                    vm.totalPages = Math.ceil(vm.pagedData.length / vm.pageSize);
                    vm.pages = vm.pagedData;
                };
            vm.selectedPage();
            }
        }
    //Price Range feature

     /*//calling all methods*!/
     getId();
     similarProduct();
     sliderFeature();
     userDefinedPagination();
*/
     /*end of controller*/

})();
