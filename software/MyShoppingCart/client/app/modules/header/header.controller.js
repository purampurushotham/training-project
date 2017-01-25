/**
 * Created by purushotham on 25-01-2017.
 */
(function(){
    'use strict'
    angular.module('MSC.header')
        .controller('headerCtrl',headerCtrl)
        .directive('headerDirective',headerDirective);
    /*headerCtrl.$inject=['headerDirective'];*/
    function headerCtrl() {
        console.log("in header ctrl")
    }
    function headerDirective() {
        return{
            restrict:'A',
            templateUrl:"app/partials/header.html"
        }
    }
})();