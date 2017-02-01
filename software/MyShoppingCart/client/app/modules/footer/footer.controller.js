/**
 * Created by purushotham on 25-01-2017.
 */
/**
 * Created by purushotham on 25-01-2017.
 */
(function(){
    'use strict';
    angular.module("MSC.footer")
        .component("footerComponent",{
           templateUrl : "app/partials/footer.html",
            controller : footerCtrl,
            controllerAs : "fc"
        });
    function footerCtrl(){
        console.log("in footer");
    }
})();