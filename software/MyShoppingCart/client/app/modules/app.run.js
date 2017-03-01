/**
 * Created by purushotham on 17-01-2017.
 */
(function(){
    angular
        .module("MSC")
        .factory("samData",samData)
        .run(appRun);
    samData.$inject=['$http','$q'];
    function samData($http,$q) {
      
        return {
            getData:function () {
                var products=[];
                var deffered=$q.defer();
                $http.get('/products').then(function mySuccess(response) {  
                    deffered.resolve(response.data);
                    console.log("in samData")
                }).then(function myError(error) {
                    deffered.reject("error in getting data");
                });
                return deffered.promise;

            }

        };
    }
    appRun.$inject = ['samData','$rootScope'];
    function appRun(samData,$rootScope) {
        samData.getData().then(function (data) {
                $rootScope.products={};
                $rootScope.products=data;
            },
            function (msg) {
                console.log("error");
            });
        console.log("in Run");
    }
}());
