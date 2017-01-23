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
            if(t === ele["id"]){
                console.log("matchfound"+ele["id"]);
                vm.vp=ele;
                break;
            }



        }
        for(var i=0;i<data;i++){
            var s=vm.ele[i];
            if(vm.vp.brand === s["brand"] && vm.vp.subType === s["subType"] && vm.vp != s){
                console.log("matchfound in similar"+s["brand"]);
                vm.similarProducts.push(s);
                console.log(vm.similarProducts);

            }
        }
        /* slidee */
        vm.slider = {
            minValue:vm.ele[0].price,
            maxValue: vm.ele[20].price,
            options: {
                floor: 0,
                ceil:99999,
                step: 2,
                minRange: vm.ele[0].price,
                maxRange: 99999 ,
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
        console.log(vm.slider.minValue)
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