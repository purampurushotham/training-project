var express = require('express');
/*var router = express.Router();*/
var path = require('path');
var products = require("./products/productList")
/* GET home page. */
var appRoutes=function(app){
    console.log("**********************************************in index.js")
    app.get('/products',products.topRatedProducts);
    app.get('/api/products/:id',products.viewEachProduct);
    app.get('/api/products/viewProduct/similaritems/*',products.getSimilarProduct);
    /*app.get('/api/products/subType/',products.viewBandWiseProducts);
    app.get('/api/products/comments/',products.getComments);*/
}
module.exports = appRoutes;
