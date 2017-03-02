/*
/!**
 * Created by purushotham on 17-01-2017.
 *!/
(function () {
    angular
        .module('MSC.home')
        .factory('homeData',homeData)
    homeData.$inject=['$http','$q'];
    function homeData($http,$q) {
        return {
            getProdType:function (Type) {
                console.log(Type)
                var products=[];
                var deffered=$q.defer();
                $http.get('/products/pro?'+Type).then(function mySuccess(response) {
                    deffered.resolve(response.data);
                    console.log("in samData")
                }).then(function myError(error) {
                    deffered.reject("error in getting data");
                });
                return deffered.promise;
            }
        };
    }
}());
*/
