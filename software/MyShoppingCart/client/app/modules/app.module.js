(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module("MSC", [
        "ui.router",
        "ui.bootstrap",
        "ui.select",
        "MSC.home",
        "MSC.search",
        "MSC.Electronics"
    ]);
    console.log("in module");
}());