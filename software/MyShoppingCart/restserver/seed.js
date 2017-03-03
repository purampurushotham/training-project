/**
 * Created by purushotham on 1/3/17.
 */
var mongoose = require('mongoose')
var assert = require('assert')
var path =require("path")
var fs = require("fs");
var products = require("./models/ProductModel");
var CommentModel = require("./models/CommentModel");
var offers = require("./models/OffersModel");
var dateFormat = require('dateformat');
var moment = require('moment')
var Q =require ("q")
mongoose.connect('mongodb://localhost/myShoppingCart')

console.log("\n *STARTING* \n");
// Get content from file
console.log(__dirname)
var s=path.join(__dirname, '../client/data.json');
var contents = fs.readFileSync(s);
// Define to JSON type
var jsonContent = JSON.parse(contents);
// Get Value from JSON
var productsList =[];
var commentsList = [];
var offersList =[];
var promises=[];
for (var i=0;i<jsonContent.length;i++) {

    var singleProduct= jsonContent[i];
    insertProducts(singleProduct);
}
function  insertProducts(product) {
    // defining each product  object to map values
    var p =[];
    p.camera=[];
    p.product_id = product.id;
    p.name = product.name;
    p.price = product.price;
    p.type = product.type;
    p.subType = product.subType;
    for(c in product.camera){
        var s=product.camera[c];
        var  ps ={};
        ps[c]=s;
        p.camera.push(ps);

    }
    p.rating = product.rating;
    p.language = product.language;
    p.author = product.author;
    p.brand = product.brand;
    p.color = product.color;
    p.model_Name = product.modelName;
    p.battery = product.battery;
    p.rom = product.rom;
    p.ram = product.RAM;
    p.pic=product.pic;
    p.offers=[];
    p.comments=[];
    console.log(p);

    //inserting offers with promises
    product.offers.forEach(function(eachOffer) {
        promises.push(insertOffers(p,eachOffer));
    });
    //inserting comments with promises
    product.comments.forEach(function(eachComment) {
        promises.push(insertComments(p, eachComment));
    });

    Q.allSettled( promises ).then(function (resp) {
        var ProductsList = products(p);
        ProductsList.save(function (err) {
            if (err) {
                console.log(err);
                //return err;
            }
            else {
                console.log("data is loaded ");
            }
        });
    });
}
function insertOffers(product,eachOffer){
    console.log("in Inserting offers");
    var offer={};
    var deffered = Q.defer();
    offer.type =eachOffer.type;
    offer.percentage = eachOffer.percentage;
    var o=offers(offer);
    o.save(function (error, data) {
        if (error) {
            console.log(error);
            deffered.reject("reject");
        }
        else {
            console.log("$$$$$$$$$$$$$$$$$$$$")
            product.offers.push(o._id);
            deffered.resolve();
        }
    });
    return deffered.promise;
}
function insertComments(product,eachComment){
    console.log("in Inserting comments");
    var comment={};
    var deffered = Q.defer();
    comment.username=eachComment.username;
    comment.text=eachComment.text;
    comment.rating=eachComment.rating;
    var date = moment(eachComment.commentedOn.toString(), 'DD/MM/YYYY');
    var formatedDate = date.format('MM/DD/YYYY');
    var formatedIso = dateFormat(formatedDate, "isoDateTime");
    //console.log(" formated date"+formatedIso);// 20120412
    comment.commentedOn = formatedIso;
    var comm = CommentModel(comment);
    comm.save(function (error, data) {
        //console.log("saving comments to db");
        if (error) {
            console.log(error);
            deffered.reject("reject");
        }
        else {
            //console.log(data);
            product.comments.push(comm._id);
            deffered.resolve();
        }
    });
    return deffered.promise;
}

