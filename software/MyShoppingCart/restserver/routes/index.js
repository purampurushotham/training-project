var express = require('express');
/*var router = express.Router();*/
var path = require('path');
var products = require("./products/productList");
/* GET home page. */
var appRoutes=function(app){
    app.get('/api/v1.0/products',products.topRatedProducts);
    app.get('/api/v1.0/products/search',products.getSearchedProduct)
    app.get('/api/v1.0/products/:id',products.viewEachProduct);
    app.get('/api/v1.0/products/viewProduct/similaritems/',products.getSimilarProduct);
    app.get('/api/v1.0/products/viewProduct/category/',products.viewBandWiseProducts);
    app.get('/api/v1.0/products/category/brands',products.getSelectedBrands);
    app.get('/api/v1.0/products/category/offers',products.getOffers);
    app.get('/api/v1.0/filteredProducts/',products.filteredProducts);
}
module.exports = appRoutes;
