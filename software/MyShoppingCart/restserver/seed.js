
/**
 * Created by SB004 on 2/28/2017.
 */
var async = require('async');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var fs = require("fs");
var ProductModel=require('./models/product/ProductModel');
var CommentModel=require('./models/comment/CommentModel');
var OfferModel=require('./models/offers/OffersModel');

var Q = require('q');

var dateFormat = require('dateformat');
var moment = require('moment');
mongoose.connect('mongodb://localhost/myShoppingCart');
var db = mongoose.connection;
var dbCollection = db.collections;
console.log("connected and collections are : "+dbCollection);
//console.log(dbCollection);
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("../client/data.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
for(var i = 0; i<jsonContent.length; i++){
    var eachProd = jsonContent[i];
    insertProducts(eachProd);
}
function insertProducts(eachProduct){
    var product ={};
    //console.log(eachProduct);
    console.log("prod id "+eachProduct.id);
    product.product_id = eachProduct.id;
    product.name = eachProduct.name;
    product.price = eachProduct.price;
    product.model_Name = eachProduct.modelName;
    product.type = eachProduct.type;
    product.brand = eachProduct.brand;
    product.subType = eachProduct.subType;
    product.author = eachProduct.author;
    product.rating = eachProduct.rating;
    product.ram = eachProduct.RAM;
    product.rom =eachProduct.rom;
    product.color = eachProduct.color;
    product.battery = eachProduct.battery;
    product.camera= eachProduct.camera;
    product.language=eachProduct.language;
    product.pic=eachProduct.pic;
    product.offers = [];
    product.comments = [];
    //p.push(eachProduct);
    var allOfferIds = [];
    var allCommentIds = [];
    var promises = [];
    eachProduct.offers.forEach(function(eachOffer) {
        promises.push(insertOffers(product,eachOffer));
    });
    eachProduct.comments.forEach(function(eachComment) {
        promises.push(insertComments(product, eachComment));
    });
    Q.allSettled( promises ).then(function (resp) {
        var p = ProductModel(product);
        //console.log(product);
        p.save(function (err) {
            if (err) {
                console.log(err);
                //return err;
            }
            else {
                console.log("data Loaded");
            }
        });
    });
}
function insertOffers(prod,eachOffer){
    var newOffer ={};
    var deffered = Q.defer();
    newOffer.type = eachOffer.type;
    newOffer.percentage = eachOffer.percentage;
    var offer = OfferModel(newOffer);
    offer.save(function (err) {
        //console.log("dateform = "+dateform);
        if (err) {
            console.log(err);
            deffered.reject("reject");
            //return err;
        }
        else {
            prod.offers.push(offer._id);
            deffered.resolve();
        }
    });
    return deffered.promise;

}
function insertComments(prod,eachComment){
    var newComment ={};
    var deffered = Q.defer();
    newComment.username = eachComment.username;
    newComment.rating = eachComment.rating
    newComment.text = eachComment.text;
    var date = moment(eachComment.commentedOn.toString(), 'DD/MM/YYYY');
    var formatedDate = date.format('MM/DD/YYYY');
    var formatedIso = dateFormat(formatedDate, "isoDateTime");
    newComment.commentedOn = formatedIso;
    var comment = CommentModel(newComment);
    var dateform = comment.commentedOn;
    //p.push(eachProduct);
    comment.save(function (err) {
        if (err) {
            console.log(err);
            console.log("errorrr");

            deffered.reject("rejected");
        }
        else {
            prod.comments.push(comment._id);
            deffered.resolve();
        }
    });
    return deffered.promise;
}

