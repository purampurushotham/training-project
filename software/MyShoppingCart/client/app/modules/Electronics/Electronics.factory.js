/**
 * Created by purushotham on 18-01-2017.
 */
(function () {
    angular
        .module('MSC.Electronics')
        .factory('samData', function ($http) {
            return {
                get: function () {
                    console.log("inside function");
                    return $http.get('data.json');
                }
            };
        });
}());
