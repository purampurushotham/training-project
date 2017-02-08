(function() {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module("MSC", ["ngRateIt",
        "ui.router",
        "ui.bootstrap",
        "ui.select",
        "rzModule",
        "checklist-model",
        "MSC.header",
        "MSC.footer",
        "MSC.home",
        "MSC.search",
        "MSC.view",
        "MSC.Electronics",
        "MSC.checkBoxes",
        "MSC.priceSlider"
    ]);
    console.log("in module");
}());