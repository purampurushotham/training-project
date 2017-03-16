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
        console.log("in app.config")
        $urlRouterProvider.otherwise("Home");
        $stateProvider
            .state("Home", {
                url: "/Home",
                templateUrl: "app/partials/home.html",
            })
            .state("view", {
                url: "/view/:id",
                templateUrl: "app/partials/product_view.html",
            })
            .state("search", {
                url: "/search/product/:productType",
                templateUrl: "app/partials/Electronics.html",
            })
            .state('confirmRegistration', {
                url: '/confirmregistration/:token',
                external : true,
                templateUrl: 'app/partials/user.html',
            })
            .state('Login', {
                url: '/existingUser',
                external : true,
                templateUrl: 'app/partials/Login.html',
            })
            .state('forgotpassword',{
                url : "/forgotpassword/:token",
                controller : 'resetPasswordCtrl',
                controllerAs : 'rp',
                external : true,
                templateUrl: 'app/partials/ResetPassword.html',

            })
            .state('profile',{
                url : "/user/profile",
                controller : 'profileCtrl',
                controllerAs : 'pc',
                external : true,
                templateUrl: 'app/partials/profile.html'

            });
        console.log("in config");
    }
})();