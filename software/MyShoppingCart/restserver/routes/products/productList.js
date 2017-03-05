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
            console.log("in similarProducts");
            if (err) {
                res.send(err);
            }
            else {

                res.send({data: simialrProds});
                res.end();
            }
        });
    }
};
module.exports=ProductRoute;

