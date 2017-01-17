/**
 * Created by purushotham on 17-01-2017.
 */
(function () {
    angular
        .module('MSC.home')
        .factory('samData', function ($http) {
            return {
                get: function () {
                    console.log("inside function");
                    return $http.get('data.json');
                }
            };
        });
}());
