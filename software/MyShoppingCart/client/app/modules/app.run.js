/**
 * Created by purushotham on 17-01-2017.
 */
(function(){
    angular
        .module("MSC")
        .run(appRun);

    appRun.$inject = [];
    function appRun() {
        console.log("in Run");
    }
}());