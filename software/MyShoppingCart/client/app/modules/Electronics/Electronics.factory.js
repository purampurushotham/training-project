/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module('MSC.Electronics')
        .factory('samData', function ($http,$q) {
            var dataService={
                products:[],
                getData:getData
            };
            return dataService;

              function getData() {
                    var deffered=$q.defer();

                    $http.get('data.json').then(function mySuccess(data) {
                        deffered.resolve(data);

                    }).then(function myError(error) {
                        deffered.reject("error in getting data");
                    });
                    return deffered.promise;

                }
            });

}());
/*

workflow.factory('getWorkflow', function($http, $q) {
    return {
        getFlow: function() {
            var deferred = $q.defer();
            $http.get('steps.json').success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject();
            });
            return deferred.promise;
        }
    }
});*/
