/**
 * Created by purushotham on 6/3/17.
 */
var passwordHash = require('password-hash');
var nodemailer = require("nodemailer");
var smtpTransport=require('nodemailer-smtp-transport')
var mongoose=require('mongoose');
var jwt = require('jwt-simple');
var tokens=require('../../models/TokenModel');
var addresses=require('../../models/AddressModel')
var users=require('../../models/userModel');
var tokenEnumObject=require('../../enums/token_enums');
var mailService=require("../mail/mailService")
var sendmail = require('sendmail')();
var usersRoute = {
    getExistedEmail : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var regularExpression = "/^"+queryParam.keyword+"/i";
        var regex = new RegExp(queryParam.keyword,"i");
        var query={email: { $regex: regex }};
        users.findOne(query).exec(function (err, emailsSet) {
            console.log({data : emailsSet});
            if (err) {
                res.send(err);
            }
            else {
                res.send({data : emailsSet.email});
                res.end();
            }
        });
    },
    createUserNew : function(req, res) {
        var queryParam =  req.body.q;
        console.log(queryParam);
        var query ={};
        query=queryParam;
        query.password=hashingPassword(query.password);
        function hashingPassword(password){
            var hashedPassword =passwordHash.generate(password);
            return hashedPassword;
        }
        query.startDate = new Date();
        query.updatedDate = new Date();
        query.isActive = false;
        var newUser=new users(query);
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                generateToken(query.firstName,query.lastName);
                res.send("Success");
                res.end();
            }
        });
        function generateToken(firstName,lastName){
            var serverAddress = req.protocol + '://' + req.get('host');
            var newToken=new tokens();
            newToken.token=jwt.encode(query.email,'xxx');
            console.log(newToken.token);
            if(newToken.token) {
                newToken.type=tokenEnumObject.REGISTRATION.code
                newToken.email = query.email;
                newToken.startDate=new Date();
                newToken.updatedDate=new Date();
                newToken.save(function (err) {
                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                    else {
                        var sendQuery={}
                        sendQuery.firstName=queryParam.firstName
                        sendQuery.lastName=queryParam.lastName
                        sendQuery.email=queryParam.email;
                        sendQuery.token=newToken.token;
                        sendQuery.serverAddress=serverAddress;
                        console.log("**************** berfore mail service")
                        console.log(sendQuery)
                        mailService.sendMail(sendQuery).then(function (success){    
                                console.log("************************ after mail service in success")
                                console.log(success)
                            },function (failed){
                                console.log(failed)
                            }
                        );
                    }
                })
            }
        }
    },
    confirmUser : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query={token : queryParam.token}
        tokens.findOne(query).exec(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(result)
                if(result == null){
                    res.send({data : result})
                    res.end();
                }
                else {

                    var re=result.email;
                    var quert1={email :re};
                    users.findOneAndUpdate({email :re},{$set : {isActive : true}}).exec(function (err, confirmed) {
                        if (err) {
                            res.send(err);
                        }
                        else{
                            tokens.findOne({email :re}).remove().exec(function (err, result) {
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    res.send({status : 200});
                                    res.end();
                                }

                            });
                        }
                    });
                }
            }
        });
    },
    //still implementing
    createAddress : function (req,res) {
        var qp = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var queryParam=qp.address;
        var query_id=qp.id
        var query={type : queryParam.type ,addressLine_1 : queryParam.addressLine_1,addressLine_2 : queryParam.addressLine_2,street : queryParam.street,city : queryParam.city,state : queryParam.state,country : queryParam.country ,zipcode : queryParam.zipcode}
        console.log("************************* in create address")
        var newAddress=new addresses(queryParam);
        if(queryParam._id){
            console.log("*********** has id")
            newAddress.isNew=false

        }
        else{
            console.log("*********** no id")
            newAddress.isNew=true
        }
        newAddress.save(function (err,address) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else if(!queryParam._id ){
                console.log("**************************8");
                console.log(address)
                console.log("**************************************************************************************************************8")
                users.findOne({_id : query_id }).exec(function (err, result) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        console.log({data : result});
                        console.log("************************************")
                        if(result != null ){
                            if(typeof result.addresses === 'undefined' || result.addresses.length ==0 ){
                                result.addresses.push(address._id);
                            }
                            else if(!result.addresses.includes(address._id)){
                                result.addresses.push(address._id);
                            }
                            result.save(function (errad,response){
                                if(errad){
                                    console.log(errad);
                                    res.send(errad)
                                }
                                else {
                                    console.log("************************* after saving addresses  ");
                                    console.log(response)
                                }
                            });
                        }
                        res.send({status : 200});
                        res.end();
                    }

                });
            }
        });
    }

};
module.exports=usersRoute;