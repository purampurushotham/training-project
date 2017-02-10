/**
 * Created by purushotham on 17-01-2017.
 */
(function() {
    'use strict';
    angular
        .module('MSC')
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function appConfig($stateProvider,$urlRouterProvider,$locationProvider){
        $urlRouterProvider.otherwise("Home");
        $stateProvider
            .state("Home", {
                url: "/Home",
                templateUrl: "app/partials/home.html",
                /* controller:"homeController",
                 controllerAs:"hc"*/
            })
            .state("view", {
                url: "/view/:id",
                templateUrl: "app/partials/product_view.html",
                /*controller:"viewCtrl",
                 controllerAs:"vc"*/
            })
            .state("search", {
                url: "/search/electronics/:productType",
                templateUrl: "app/partials/Electronics.html",
                //controller:"ElectronicsCtrl",
                //controllerAs:"EC"
            });
        /*.state('Electronics.Mobiles', {
         url: '/Mobiles',
         templateUrl: 'Electronics-Mobiles.html'

         })
         .state('Electronics.Laptops', {
         url: '/Laptops',
         templateUrl: 'Electronics-Laptops.html',
         controller: "LaptopCtrl"
         })
         .state("Books", {
         url: "/Books",
         templateUrl: "Books.html"
         })
         .state("Books.Fiction", {
         url: "/Fiction",
         templateUrl: "Books-Fiction.html"
         })
         .state("Books.Comic", {
         url: "/Comic",
         templateUrl: "Books-Comic.html"
         })
         .state("Books.Biographies", {
         url: "/Biographies",
         templateUrl: "Books-Biographies.html"
         });
         */
        console.log("in config");
    }
})();