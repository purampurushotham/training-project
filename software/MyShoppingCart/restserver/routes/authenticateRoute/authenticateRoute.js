/**
 * Created by purushotham on 8/3/17.
 */
var passwordHash = require('password-hash');
var nodemailer = require("nodemailer");
var apiUtils =require('../../utils/apiUtils')
var mongoose=require('mongoose');
var jwt = require('jwt-simple');
var tokens=require('../../models/TokenModel');
var users=require('../../models/userModel');
var addresses=require('../../models/AddressModel')
var tokenEnumObject=require('../../enums/token_enums');
var SuccessResponse= require('../../models/SuccessResponse');
var ErrorResult = require('../../models/errorResult/ErrorResult')
var path=require('path');
var extConfigLoc =path.join(__dirname,'../../config/config.json');
var config = require(extConfigLoc);
var appConfig = JSON.parse(JSON.stringify(config));
var mailService=require("../mail/mailService");
var sendmail = require('sendmail')();
var authenticateRoute = {
    validateUser: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = {email: queryParam.email, isActive: true};
        users.findOne(query).exec(function (err, resultSet) {
            if (err) {
                res.send(err);
            }
            else if (resultSet != null) {
                var validatePassword = apiUtils.verifyPassword(queryParam.password, resultSet.password);
                if (validatePassword) {
                    var newToken = new tokens();
                    newToken.token = apiUtils.generateToken(query.email);
                    if (newToken.token) {
                        newToken.type = tokenEnumObject.AUTH.code;
                        newToken.email = query.email;
                        newToken.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.send(err);
                            }
                            else {
                                var data = {};
                                data.firstName = resultSet.firstName;
                                data.lastName = resultSet.lastName;
                                data.id = resultSet._id;
                                res.send(new SuccessResponse('ok',data,'',"logged in successfully"));
                            }
                        });
                    }
                }
                else {
                    return res.json(new ErrorResult('failed', "Invalid credentials", [{'msg':'Password is incorrect'}]));
                }
            }
            else {
                return res.json(new ErrorResult('failed', "Invalid credentials", [{'msg':'email is incorrect'}]));
            }
        });
    },
    logout : function(req,res){
        var queryParam=req.query.q
        console.log("***************************");
        console.log(queryParam);
        users.findOne( {_id :queryParam} ).exec(function (err,result){
            if(err){
                res.send(err)
            }
            else if(result !=null){
                tokens.remove({email : result.email}).exec(function(err1,response){
                    if(err1){
                        res.send(new ErrorResult('failed','token not found'))
                    }
                    else {
                        // console.log(response)
                        res.send(new SuccessResponse('ok',response,'',"logged out successfully"));
                    }
                });
            }
        });

    },
    forgotPassword: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = {email: queryParam.email, isActive: true};
        users.findOne(query).exec(function (err, resultSet) {
            if (err) {
                res.send(err);
            }
            else if (resultSet != null) {
                var newToken = new tokens();
                newToken.token = apiUtils.generateToken(query.email)
                if (newToken.token) {
                    newToken.type = tokenEnumObject.OTP.code;
                    newToken.email = query.email;
                    newToken.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            var sendQuery={};
                            sendQuery.firstName=resultSet.firstName
                            sendQuery.lastName=resultSet.lastName
                            sendQuery.email=queryParam.email;
                            sendQuery.token=newToken.token;
                            sendQuery.serverAddress=apiUtils.getServerUrl(req);
                            sendQuery.url= sendQuery.serverAddress + "/#!/forgotpassword/" + sendQuery.token;
                            sendQuery.subject=appConfig.mail.forgotPassworSubject
                            sendQuery.fullName=sendQuery.firstName+ " "+sendQuery.lastName
                            mailService.sendMail('forgotPassword',sendQuery).then(function (success){
                                    console.log("************************ after mail service in success");
                                    console.log(success);
                                    res.send(new SuccessResponse('ok','','','Mail send successfully'))
                                },function (failed){

                                    return res.json(new ErrorResult('failed', "invalid email address", [{'msg':'maiing error'}]));
                                }
                            );

                        }
                    });
                }
                res.send(new SuccessResponse("ok",'','',"message delivered successfully"))
            }
            else {
                return res.json(new ErrorResult('failed', "Invalid credentials", [{'msg':'email is incorrect'}]))

            }
        });
    },
    resetPassword: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var query = {token: queryParam.token}
        tokens.findOne(query).exec(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                if (result == null) {
                    res.send(new ErrorResult('failed', "Invalid credentials", [{'msg':'token is expiresd'}]));
                    res.end();
                }
                else {
                    var re = result.email
                    var newPassword = passwordHash.generate(queryParam.user.password);
                    var quert1 = {email: re}
                    users.findOneAndUpdate({email: re}, {$set: {password: newPassword}}).exec(function (err, confirmed) {
                        console.log("**************************" + "in user collection")
                        if (err) {
                            res.send(err);
                        }
                        else if(confirmed != null){
                            tokens.findOne({email: re}).remove().exec(function (err, result) {
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    res.send(new SuccessResponse("ok",result.email,'',"password updated successfully"));
                                    res.end();
                                }

                            });
                        }
                        else{
                            return res.json(new ErrorResult('failed', "Invalid Token ", [{'msg':'email is incorrect'}]))
                        }
                    });
                }
            }
        });
    },
    getProfile: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        users.findById({_id: queryParam.id}).exec(function (err, result) {
            if (err) {
                res.send(err);
            }
            else if(result !=null){
                var profile = {};
                profile.firstName = result.firstName;
                profile.lastName = result.lastName;
                profile.email = result.email;
                profile.phoneNumber = result.phoneNumber;
                console.log(profile)
                res.send(new SuccessResponse("ok",profile,'',"success"));
                res.end();
            }
            else
                return res.json(new ErrorResult('failed', "Invalid user ", [{'msg':'user doesn;t exists'}]))
        });
    },
    getAddress: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam);
        var query = {_id: queryParam.id}
        users.findOne(query).populate({
            path: 'addresses',
            options: {sort: queryParam.sortingCriteria,skip : queryParam.page ,limit :queryParam.page_size }}).exec(function (err, results) {
            if (err) {
                res.send(err);
            }
            else if(results != null){
                console.log("************************ in getAddress")
                console.log(results.addresses);
                users.findOne(query).populate('addresses').exec(function (err,response) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        console.log("************************"+response.addresses.length)
                        var pagination={};
                        pagination.total=response.addresses.length;
                        res.send(new SuccessResponse("ok",results.addresses,pagination,"success"));
                    }
                })

            }
            else
                return res.json(new ErrorResult('failed', "Address", [{'msg':'no addresss are found '}]))
        });
    },
    deleteAddress : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log(queryParam);
        var address=queryParam.address;
        users.findOne({ _id : queryParam.id}).exec(function (err, results) {
            if (err) {
                res.send(err);
            }
            else {
                for(var i=0;i< results.addresses.length;i++){
                    if(results.addresses.includes(address._id))
                        results.addresses.pop(addr);
                    console.log(results.addresses)
                }


                results.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        console.log("******************** in removing address")
                        addresses.remove({_id : address._id}).exec(function (errad,response) {
                            if (errad) {
                                res.send(errad);
                            }
                            else {
                                console.log(response)
                                console.log(results);
                                res.send(new SuccessResponse('ok','','','address is deleted'))
                            }
                        });
                    }
                });
            }

        });
    }
};
module.exports=authenticateRoute;


