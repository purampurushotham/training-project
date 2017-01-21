/**
 * Created by purushotham on 19-01-2017.
 */
(function () {
    angular
        .module("MSC.view")
        .controller("viewCtrl",viewCtrl);
    viewCtrl.$inject=['$stateParams','$rootScope']
    function viewCtrl($stateParams,$rootScope) {
        var vm=this;
        vm.similarProducts=[];
        vm.id=$stateParams.id;
        var t=vm.id;
        vm.vp={};
        vm.ele=$rootScope.products;
        var data=vm.ele.length;
        for (var i = 0; i < data; i++){
            var ele = vm.ele[i];
            console.log(ele);
            for (var key in ele){
                if(t === ele[key]){
                    console.log("matchfound"+ele[key]);
                    vm.vp=ele;
                    break;
                }

            }

        }
        for(var i=0;i<data;i++){
            var s=vm.ele[i];
                if(vm.vp.subType === s["subType"]){
                    console.log("matchfound in similar"+s["subType"]);
                    vm.similarProducts.push(s);
                    console.log(vm.similarProducts);

            }
        }
    }


    //       console.log($stateParams.id);

    /* function similarProducts(similarPro,$rootScope){

     console.log(similarPro);
     console.log($rootScope.products);
     var vm=this;
     vm.similar={};
     for (var i = 0; i < data; i++){
     var ele = vm.ele[i];
     console.log(ele);
     for (var key in ele){
     console.log("in similar  products");
     }*/
})();