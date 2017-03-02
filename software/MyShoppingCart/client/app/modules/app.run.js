/**
 * Created by purushotham on 17-01-2017.
 */
(function(){
    angular
        .module("MSC")
        .run(appRun);
    appRun.$inject = ['samData','$rootScope'];
    function appRun(samData,$rootScope) {
        samData.getData().then(function (data) {
                $rootScope.products={};
                $rootScope.products=data;
            console.log()
            },
            function (msg) {
                console.log("error");
            });
        console.log("in Run");
    }
}());
