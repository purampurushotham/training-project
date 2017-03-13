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
            bindings : {
                singlePro : '='
            }
        })
        .component("similarComponent",{
            templateUrl : "app/partials/similarProducts.html",
            controller :similarProduct,
            controllerAs: "sm",
            bindings : {
                similarProds : '='
            }
        })
        .component("commentsComponent",{
            templateUrl:"app/partials/comments.html",
            controller : commentsCtrl,
            controllerAs: "cm",
            bindings :{
                comments: "="
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
    viewCtrl.$inject=['$stateParams','viewProductService'];
        function viewCtrl($stateParams,viewProductService) {
            var vm = this;
            vm.similarProducts = [];
            vm.id = $stateParams.id;
            view(vm.id);
        function view(id){
            viewProductService.viewProduct(id).then(success).catch(failed);
            function success(response){
                    console.log(response);
                    vm.eachProduct=response;

                }
                function failed(error) {
                    console.log(error);
                }
            }
    }
    //getProduct controller
    ProductController.$inject=['viewProductService'];
    function ProductController(viewProductService) {
        var vm = this;
        vm.$onInit = function () {
            vm.vp = vm.singlePro;
            var subType = vm.vp.subType;
            var type=vm.vp.type;
            if(vm.vp.brand == 'undefined'){
                vm.vp.brand = vm.vp.language;
            }
            var brand=vm.vp.brand;
            //calling for similar products
            getSimilarProduct(type,subType,brand);
            function getSimilarProduct(type,subType,brand){
                //calling viewProductService tp view products
                viewProductService.getSimilarProduct(type,subType,brand).then(success).catch(failed);
                function success(response){
                    vm.simialrProds={};
                    vm.simialrProds=response;
                }
                function failed(error) {
                    console.log(error);
                }
            }
        };
    }
    similarProduct.$inject=[];
    function similarProduct() {
        var vm = this;
        vm.$onInit = function () {
            vm.similarProducts=vm.similarProds;
        };
    }
    commentsCtrl.$inject = ['viewProductService']
    function commentsCtrl(viewProductService) {

        var vm = this;
        vm.$onInit = function () {
            vm.comm=vm.comments;
            console.log(vm.comm)
            vm.sam =vm.comm;
            console.log(vm.sam);
            vm.commentsSize = 2;
            vm.tempSize = vm.commentsSize;
            vm.viewMore = function () {
                console.log(vm.sam.length);
                if (vm.sam.length > vm.commentsSize) {
                    vm.commentsSize = (vm.commentsSize) + ((vm.sam.length - 1) / 2);
                    console.log(vm.commentsSize);
                }
                else if (vm.sam.length < vm.commentsSize) {
                    vm.commentsSize = vm.sam.length;
                }
            }
            vm.hideButton = function () {
                if (angular.equals(vm.commentsSize, vm.sam.length)) {
                    return true;
                }
                else
                    return false;
            }

        }
    }
//pagination functionality
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
     /*/*paginate*/
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
