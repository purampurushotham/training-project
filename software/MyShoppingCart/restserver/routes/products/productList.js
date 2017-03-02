/**
 * Created by purushotham on 1/3/17.
 */
var products=require('../../models/ProductModel');
var mongoose=require('mongoose');
var ProductRoute;
ProductRoute={
    topRatedProducts: function (req,res){
        console.log('asd');
        products.aggregate([
            {$match : {"rating" :{$gt :4} } },
            {$group: {_id:"$subType", docs:{$push : "$$ROOT"}
            }},
            {$project : {
                docs : {$slice : ["$docs" ,0,5 ]}

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
    viewEachProduct :function(req,res){

        products.findOne({product_id : req.params.id}).exec(function (err,oneProduct){
            console.log(oneProduct);
            if(err){
                res.send(err);
            }
            else {
                console.log("$$$$$$$$$$$$$$$$$$$$$");
                res.send(oneProduct);
                console.log("$$$$$$$$$$$$$$$$$$$$$");
                res.end();
            }
        });

    }

};
module.exports=ProductRoute;

