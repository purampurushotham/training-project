var express = require('express');
/*var router = express.Router();*/
var path = require('path');
var products = require("./products/productList");
var usersRoute = require("./users/usersRoute");
var authenticateRoute = require("./authenticateRoute/authenticateRoute");
/* GET home page. */
var appRoutes=function(app){
    console.log("**********************************************in index.js")
    app.get('/products',products.topRatedProducts);
    app.get('/api/products/search',products.getSearchedProduct)
    app.get('/api/products/:id',products.viewEachProduct);
    app.get('/api/products/viewProduct/similaritems/',products.getSimilarProduct);
    app.get('/api/products/viewProduct/category/',products.viewBandWiseProducts);
    app.get('/api/products/category/brands',products.getSelectedBrands);
    app.get('/api/products/category/offers',products.getOffers);
    app.get('/api/filteredProducts/',products.filteredProducts);
    app.get('/api/users/getExistedEmail',usersRoute.getExistedEmail);
    app.post('/api/users/addUser',usersRoute.createUserNew);
    app.put('/api/users/confirmUser',usersRoute.confirmUser);
    app.get('/api/user/authenticate',authenticateRoute.validateUser);
    app.get('/api/users/forgotPassword',authenticateRoute.forgotPassword);
    app.put('/api/users/resetPassword',authenticateRoute.resetPassword);
    app.get('/api/user/profile',authenticateRoute.getProfile);

}
module.exports = appRoutes;
