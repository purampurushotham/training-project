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
            console.log("**********************88 in htttp get")
            var products=[];
            var deffered=$q.defer();
            $http.get('/api/products').then(function mySuccess(response) {
                console.log("**********************88 in htttp get")
                if(response.data.status == 'ok') {
                    console.log(response.data)
                    deffered.resolve(response.data);
                }
            }).then(function myError(error) {
                deffered.reject("error in getting data");
            });
            return deffered.promise;
        }
    };
}