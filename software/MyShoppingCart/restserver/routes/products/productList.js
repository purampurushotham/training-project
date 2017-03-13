/**
 * Created by purushotham on 1/3/17.
 */
var products=require('../../models/ProductModel');
var comments =require('../../models/CommentModel');
var offers = require('../../models/OffersModel');
var mongoose=require('mongoose');
var ProductRoute;
ProductRoute= {
    topRatedProducts: function (req, res) {
        console.log('asd');
        products.aggregate([
            {$match: {"rating": {$gt: 4}}},
            {
                $group: {
                    _id: "$subType", docs: {$push: "$$ROOT"}
                }
            },
            {
                $project: {
                    docs: {$slice: ["$docs", 0, 5]}

                }
            }
        ]).exec(function (err, prods) {
            if (err) {
                res.send(err);
            } else {
                res.send(prods);
                res.end();
            }
        });
    },
    getSearchedProduct : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var regularExpression = "/^"+queryParam.keyword+"/i";
        var regex = new RegExp(queryParam.keyword,"i");
        console.log(regularExpression)
        console.log(regex);
        var query={$or: [{name: { $regex: regex }}, {brand: { $regex: regex   }}]}
        products.find(query).exec(function (err, oneProduct) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({data : oneProduct});
                res.end();
            }
        });
    },
    viewEachProduct: function (req, res) {

        products.findOne({product_id: req.params.id}).populate('comments').exec(function (err, oneProduct) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(oneProduct);
                res.end();
            }
        });

    },
    getSimilarProduct: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = {type: queryParam.type,subType :queryParam.subType}
        if(queryParam.brand) {
            query.brand = queryParam.brand;
        } else if(queryParam.language){
            query.language = queryParam.language;
        }
        products.find(query).exec(function (err, simialrProds) {
            if (err) {
                res.send(err);
            }
            else {

                res.send({data: simialrProds});
                res.end();
            }
        });

    },
    viewBandWiseProducts : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = { subType: req.params.subType};
        products.find({subType : queryParam.subType}).exec(function (err, simialrProds) {
            if (err) {
                res.send(err);
            }
            else {

                res.send({data: simialrProds});
                res.end();
            }
        });
    },
    getSelectedBrands : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var t ="";
        var query= {subType : queryParam.subType};
        if(queryParam.brand){
            t="brand";
        } if(queryParam.language){
            t="language";
        }
        products.distinct(t,query ).exec(function (err, brands) {
            console.log(t);
            if (err) {
                res.send(err);
            }
            else {
                res.send({data: brands});
                res.end();
            }
        });

    },
    getOffers : function(req,res) {
        offers.distinct("type").exec(function (err, offers) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({data: offers});
                res.end();
            }
        });
    },
    filteredProducts : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var offersQuery=queryParam.offers;
        var brandsQuery=queryParam.brandsArray;
        var QArray=[];
        QArray.push({ "$unwind": "$offers" });
        QArray.push({$lookup : { from : "offers",localField : "offers",foreignField : "_id", as : "resObj"}});
        QArray.push({ "$unwind": "$resObj" });
        QArray.push({"$match" : {"subType" : queryParam.subtype, "price" : {$gt : queryParam.min,$lt : queryParam.max}}});
        if(offersQuery != undefined){
            if(offersQuery.length !=0){
                QArray.push({"$match" : {"resObj.type" : {$in : offersQuery}}});
                console.log("quertoooo + "+QArray)
                console.log(QArray)
            }
        }
        if(brandsQuery != undefined){
            if(brandsQuery.length !=0){
                if(queryParam.subtype == "fiction" || queryParam.subtype == "comic" || queryParam.subtype == "Biography") {
                    QArray.push({"$match": {"language": {$in: brandsQuery}}});
                }
                else{
                    QArray.push({"$match" : {"brand" : {$in : brandsQuery}}});

                }

            }
        }
        products.aggregate(QArray).exec(function(err, response){
            if(err)
                console.log(err);
            else
            {
                res.send({data : response});
            }

        });
        console.log(QArray)
    }
};
module.exports=ProductRoute;

