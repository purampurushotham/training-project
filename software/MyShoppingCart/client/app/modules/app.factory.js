/**
 * Created by purushotham on 2/3/17.
 */
angular
    .module("MSC")
    .factory("samData",samData);
samData.$inject=['$http','$q'];
function samData($http,$q) {

    return {
        getData:function () {
            var products=[];
            var deffered=$q.defer();
            $http.get('/products').then(function mySuccess(response) {
                deffered.resolve(response.data);
            }).then(function myError(error) {
                deffered.reject("error in getting data");
            });
            return deffered.promise;
        }
    };
}