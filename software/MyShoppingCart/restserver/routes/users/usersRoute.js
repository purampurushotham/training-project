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
var sendmail = require('sendmail')();
var usersRoute = {
    getExistedEmail : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var regularExpression = "/^"+queryParam.keyword+"/i";
        var regex = new RegExp(queryParam.keyword,"i");
        var query={email: { $regex: regex }};
        users.find(query).exec(function (err, emailsSet) {
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
                console.log(err)
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
                        var transport = nodemailer.createTransport(smtpTransport({
                            service: "gmail ",  // sets automatically host, port and connection security settings
                            auth: {
                                user: "purams225@gmail.com",
                                pass: "Password"
                            }
                        }));

                        transport.sendMail({  //email options
                            from: "noreply@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
                            to: "puram.purushotham@india.semanticbits.com", // receiver
                            subject: "Emailing with nodemailer", // subject
                            text: "HI"+" "+firstName+ " "+lastName+"please follow this link for account activation" + " "+
                            serverAddress+"/#!/confirmregistration/"+newToken.token //body
                        }, function(error, response){  //callback
                            if(error){
                                console.log(error);
                            }else{
                                console.log("Message sent: " + response.message);
                            }
                            transport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                        });
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

                    var re=result.email
                    var quert1={email :re}
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
        var query={type : queryParam.type ,addressLine_1 : queryParam.addressLine1,addressLine_2 : queryParam.addressLine2,street : queryParam.street,city : queryParam.city,state : queryParam.state,country : queryParam.country ,zipcode : queryParam.zipcode}
        console.log(query)
        var newAddress=new addresses(query);
        newAddress.save(function (err,address) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                users.find({_id : query_id }).exec(function (err, result) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        console.log(result);
                        if(result != null ){
                            if(result.addresses.indexOf(address._id) === 'undefined')
                                result.addresses.push(address._id);
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