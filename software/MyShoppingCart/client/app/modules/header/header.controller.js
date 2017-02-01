/**
 * Created by purushotham on 25-01-2017.
 */
(function(){
    'use strict'
    angular.module('MSC.header')
        .component('headerComponent',{
            templateUrl : "app/partials/header.html",
            controller : headerCtrl,
            controllerAs : "hc"
        });
    function headerCtrl() {
        console.log("in header ctrl")
    }
})();
// .controller('headerCtrl',headerCtrl)
// .directive('headerDirective',headerDirective);
/*headerCtrl.$inject=['headerDirective'];*/