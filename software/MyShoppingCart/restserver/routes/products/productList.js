/**
 * Created by purushotham on 1/3/17.
 */
var products=require('../../models/product/ProductModel');
var comments =require('../../models/comment/CommentModel');
var offers = require('../../models/offers/OffersModel');
var mongoose=require('mongoose');
var SuccessResponse= require('../../models/successResponse/SuccessResponse');
var ErrorResult = require('../../models/errorResult/ErrorResult');
var ProductRoute;
ProductRoute= {
    topRatedProducts: function (req, res) {
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
                return res.json(new ErrorResult("failed","cannot find products",[{"msg" : "cannot find products" }]))
            } else {
                res.send(new SuccessResponse("ok",prods,"","Success"));
                res.end();
            }
        });
    },
    getSearchedProduct : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var regularExpression = "/^"+queryParam.keyword+"/i";
        var regex = new RegExp(queryParam.keyword,"i");
        var query={$or: [{name: { $regex: regex,}}, {brand: { $regex: regex}}]};
        products.find(query).exec(function (err, oneProduct) {
            if (err) {
                return res.json(new ErrorResult("failed","found searched products",[{"msg" : "cannot have searched products"}]));
            }
            else if(oneProduct != null){
                res.send(new SuccessResponse("ok",oneProduct,"","found searched products"));
                res.end();
            }
        });
    },
    viewEachProduct: function (req, res) {

        products.findOne({product_id: req.params.id}).populate('comments').exec(function (err, oneProduct) {
            if (err) {
                return res.json(new ErrorResult("failed",'error in query',[{"msg" : "error in finding product"}]));
            }
            else if(oneProduct != null){
                res.send(new SuccessResponse("ok",oneProduct,"product is found"));
                res.end();
            }
        });

    },
    getSimilarProduct: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = {type: queryParam.type,subType :queryParam.subType ,_id : {$ne : queryParam.id}}
        if(queryParam.brand) {
            query.brand = queryParam.brand;
        } else if(queryParam.language){
            query.language = queryParam.language;
        }
        products.find(query).exec(function (err, simialrProds) {
            if (err) {
                return res.json(new ErrorResult("failed",'error in query',[{"msg" : "error in finding similar product"}]));
            }
            else {
                res.send(new SuccessResponse("ok",simialrProds,"similar Products are exists"));
                res.end();
            }
        });

    },
    viewBandWiseProducts : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = { subType: req.params.subType};
        products.find({subType : queryParam.subType}).exec(function (err, simialrProds) {
            if (err) {
                return res.json(new ErrorResult("failed",'error in query',[{"msg" : "error in finding brand wise product"}]));
            }
            else {

                res.send(new SuccessResponse("ok",simialrProds,"view products brand wise"));
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
            if (err) {
                return res.json(new ErrorResult("failed",'error in query',[{"msg" : "error in finding brand wise product"}]));
            }
            else {
                res.send(new SuccessResponse("ok",brands,"","Success"));
                res.end();
            }
        });

    },
    getOffers : function(req,res) {
        offers.distinct("type").exec(function (err, offers) {
            if (err) {
                return res.json(new ErrorResult("failed",'error in query',[{"msg" : "error in finding offers"}]));
            }
            else {
                res.send(new SuccessResponse("ok",offers,"","Success"));
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
                return res.json(new ErrorResult("failed",'error in query',[{"msg" : "error in filtering products"}]));
            else
            {
                res.send(new SuccessResponse("ok",response,"","Success"));
            }

        });
    }
};
module.exports=ProductRoute;

