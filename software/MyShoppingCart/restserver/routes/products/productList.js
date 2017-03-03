/**
 * Created by purushotham on 1/3/17.
 */
var products=require('../../models/ProductModel');
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

        products.findOne({product_id: req.params.id}).exec(function (err, oneProduct) {
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
    getComments: function(req,res){
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
    },
    similarProducts: function (req, res) {
        console.log("**************************"+"in simiar products")
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam)
        var query = {type: req.params.type,subType :req.params.subType}
        if(queryParam.brand) {
            query.brand = queryParam.brand;
        }
        console.log("**************************")
        console.log(query)

        products.find(query).exec(function (err, simialrProds) {
            console.log("in similarProducts");
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
        console.log("$$$$$$$$$$$$$$$$$$$$$");
        console.log(queryParam);
        console.log("##############################");
        var query = { subType: req.params.subType};
        products.find({subType : req.params.subType}).exec(function (err, simialrProds) {
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

