/**
 * Created by purushotham on 17-01-2017.
 */
(function(){
    angular
        .module("MSC")
        .run(appRun);
    appRun.$inject = ['samData','$rootScope'];
    function appRun(samData,$rootScope) {
        console.log("in app.run")
        samData.getData().then(function (response) {
                $rootScope.products={};
            console.log("******************* in appRUn")
            console.log(response.data)
                $rootScope.products=response.data;
            console.log()
            },
            function (msg) {
                console.log("error");
            });
        console.log("in Run");
    }
}());
