(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module("MSC", [
        "ui.router",
        "ui.bootstrap",
        "MSC.home"
    ]);
    console.log("in module");
}());