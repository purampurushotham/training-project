/**
 * Created by purushotham on 6/3/17.
 */
var mongoose=require('mongoose');
var users=require('../../models/userModel')
var RegistrationRoute;
RegistrationRoute={
    getExistedEmail : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("*****************************");
        console.log(queryParam);
        var regularExpression = "/^"+queryParam.keyword+"/i";
        var regex = new RegExp(queryParam.keyword,"i");
        console.log(regularExpression)
        console.log(regex);
        var query={email: { $regex: regex }}
        users.find(query).exec(function (err, emailsSet) {
            console.log("**************************"+"in getExistedEmail")
            console.log({res :emailsSet});
            if (err) {
                res.send(err);
            }
            else {
                res.send({res :emailsSet.email});
                res.end();
            }
        });

    },
    createUserNew : function(req,res) {
        console.log("in adddddddddddddddd");
        console.log(req.query)
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam);
        var query = queryParam
        console.log("**************************"+"in addd user")
        query.startDate = new Date();
        query.updatedDate = new Date();
        query.isActive = false;
        users.insertOne(query).exec(function (err, response) {
            console.log("**************************"+"in addd user")
            if (err) {
                res.send(err);
            }
            else {
                res.send("status : 200");
                res.end();
            }
        });
    
    }

}
module.exports=RegistrationRoute;