var express = require('express');
/*var router = express.Router();*/
var path = require('path');
var products = require("./products/productList")
/* GET home page. */
var appRoutes=function(app){
    app.get('/products',products.topRatedProducts);
    app.get('/api/products/:id',products.viewEachProduct);
    app.get('/api/products/similaritems/*',products.similarProducts);
    app.get('/api/products/subType/',products.viewBandWiseProducts);
    app.get('/api/products/comments/',products.getComments);
}
module.exports = appRoutes;
