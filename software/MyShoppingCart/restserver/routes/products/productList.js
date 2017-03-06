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
            console.log(prods);
            if (err) {
                res.send(err);
            } else {
                res.send(prods);
                res.end();
            }
        });
    },
    viewEachProduct: function (req, res) {

        products.findOne({product_id: req.params.id}).populate('comments').exec(function (err, oneProduct) {
            console.log("**************************"+"in view eachProduct")
            console.log(oneProduct);
            if (err) {
                res.send(err);
            }
            else {
                res.send(oneProduct);
                res.end();
            }
        });

    },
    /* getComments: function(req,res){
     // var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
     console.log("**************************in getComments ********************" )
     products.find({product_id: req.params.productId}).populate('comments').exec(function (err, oneProduct) {
     console.log(oneProduct);
     if (err) {
     res.send(err);
     }
     else {
     res.send(oneProduct);
     res.end();
     }
     });
     },*/
    getSimilarProduct: function (req, res) {
        console.log("********************* get similar product ******************8")
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("**************************"+"in simiar products")
        console.log(queryParam.type)
        var query = {type: queryParam.type,subType :queryParam.subType}
        if(queryParam.brand) {
            query.brand = queryParam.brand;
        } else if(queryParam.language){
            query.language = queryParam.language;
        }
        console.log("**************************"+"in simiar products")
        console.log(query)
        products.find(query).exec(function (err, simialrProds) {
            console.log("in similarProducts");
            if (err) {
                res.send(err);
            }
            else {

                console.log(simialrProds)
                res.send({data: simialrProds});
                res.end();
            }
        });

    },
    viewBandWiseProducts : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("$$$$$$$$$$$$$$$$$$$$$");
        console.log(queryParam);
        console.log("##############################");
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
        console.log("&&&&&&&&&&&&&&&&&&&&&&&& in getSelectedBrands")
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam);
        var t ="";
        var query= {subType : queryParam.subType};
        if(queryParam.brand){
            t="brand";
        } if(queryParam.language){
            t="language";
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&");
        }
        console.log(t)
        console.log(query)
        products.distinct(t,query ).exec(function (err, brands) {
            console.log(t);
            if (err) {
                res.send(err);
            }
            else {
                console.log(brands)
                res.send({data: brands});
                res.end();
            }
        });

    },
    getOffers : function(req,res) {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&& in getOffers")
        offers.distinct("type").exec(function (err, offers) {
            console.log("in getOffers");
            if (err) {
                res.send(err);
            }
            else {
                console.log(offers)
                res.send({data: offers});
                res.end();
            }
        });
    },
    filteredProducts : function(req,res){
        console.log("*********************** filtered products  ********************");
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam);
        var offersQuery=queryParam.offers;
        var brandsQuery=queryParam.brandsArray;
        var QArray=[];
        QArray.push({ "$unwind": "$offers" });
        QArray.push({$lookup : { from : "offers",localField : "offers",foreignField : "_id", as : "resObj"}});
        QArray.push({ "$unwind": "$resObj" });
        QArray.push({"$match" : {"subType" : queryParam.subtype, "price" : {$gt : queryParam.min,$lt : queryParam.max}}});
      if(offersQuery != undefined){
            if(offersQuery.length !=0){
                //queryTo.offers.type = {$in : offersSelectedArray};
                QArray.push({"$match" : {"resObj.type" : {$in : offersQuery}}});
                console.log("quertoooo + "+QArray)
                console.log(QArray)
            }
        }
        if(brandsQuery != undefined){
            if(brandsQuery.length !=0){
                console.log("*********************** filtering  ********************");
                if(queryParam.subtype == "fiction" || queryParam.subtype == "comic" || queryParam.subtype == "Biography") {
                    console.log("*********************** changing  subtype  ********************");
                    QArray.push({"$match": {"author": {$in: brandsQuery}}});
                }
                else{
                    console.log("*********************** not  changing  subtype  ********************");
                    QArray.push({"$match" : {"brand" : {$in : brandsQuery}}});

                }
                console.log(QArray)
            }
        }
        console.log("*********************** default query ********************");
        products.aggregate(QArray).exec(function(err, response){
            console.log("in productlist categorywiseProducts")
            if(err)
                console.log(err);
            else
            {
                console.log("categorywiseProducts response received"+response.length);
                res.send({data : response});
            }

        });
        console.log("quertoooo formed + "+QArray)

        console.log(QArray)
    }
}
module.exports=ProductRoute;

