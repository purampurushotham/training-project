/**
 * Created by purushotham on 25-01-2017.
 */
/**
 * Created by purushotham on 25-01-2017.
 */
(function(){
    'use strict';
    angular.module("MSC.footer")
        .controller('footerCtrl',footerCtrl)
        .directive('footerDirective',footerDirective);
    function footerCtrl(){
        console.log("in footer");
    }
    function footerDirective(){
        return {
            restrict: "A",
            templateUrl:"app/partials/footer.html"
        }
    }
})();