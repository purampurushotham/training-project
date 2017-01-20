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
                    console.log("matchfound"+ele[key])
                vm.vp=ele;
                    break;
                }

            }

        }
        console.log(vm.vp);
  //       console.log($stateParams.id);

     }
})();