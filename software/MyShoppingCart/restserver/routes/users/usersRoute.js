/**
 * Created by purushotham on 6/3/17.
 */
var passwordHash = require('password-hash');
var nodemailer = require("nodemailer");
var emailTemplates = require('email-templates');
var smtpTransport=require('nodemailer-smtp-transport');
var mongoose=require('mongoose');
var jwt = require('jwt-simple');
var tokens=require('../../models/token/TokenModel');
var addresses=require('../../models/addressModel/AddressModel');
var users=require('../../models/user/userModel');
var tokenEnumObject=require('../../enums/token_enum');
var mailService=require("../mail/mailService");
var SuccessResponse= require('../../models/successResponse/SuccessResponse');
var ErrorResult = require('../../models/errorResult/ErrorResult');
var apiUtils=require('../../utils/apiUtils');
var path=require('path')
var extConfigLoc =path.join(__dirname,'../../config/config.json');
var config = require(extConfigLoc);
var appConfig = JSON.parse(JSON.stringify(config));
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
            else if(emailsSet!= null){
                res.send(new SuccessResponse('ok',emailsSet.email,'',"email exists"));
                res.end();
            }
            else{
                res.send(new SuccessResponse('ok','','',"new Email address"));
                res.end();
            }
        });
    },
    createUserNew : function(req, res) {
        var queryParam =  req.body.q;
        console.log(queryParam);
        var query ={};
        query=queryParam;
        query.password=apiUtils.generatePassword(query.password);
        query.isActive = false;
        var newUser=new users(query);
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                generateToken(query.firstName,query.lastName);
                res.send(new SuccessResponse("ok",'','',"success"));
                res.end();
            }
        });
        function generateToken(firstName,lastName){
            var newToken=new tokens();
            newToken.token=apiUtils.generateToken(query.email);
            console.log(newToken.token);
            if(newToken.token) {
                newToken.type=tokenEnumObject.REGISTRATION.code;
                newToken.email = query.email;
                newToken.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        var sendQuery={};
                        sendQuery.firstName=queryParam.firstName;
                        sendQuery.lastName=queryParam.lastName;
                        sendQuery.email=queryParam.email;
                        sendQuery.token=newToken.token;
                        sendQuery.serverAddress= apiUtils.getServerUrl(req);
                        sendQuery.subject=appConfig.mail.addUserSubject;
                        sendQuery.url =sendQuery.serverAddress+"/#!/confirmregistration/"+sendQuery.token;
                        sendQuery.fullName = sendQuery.firstName+ " "+sendQuery.lastName;
                        console.log(sendQuery)
                        mailService.sendMail('userRegistration',sendQuery).then(function (success){
                                console.log("************************ after mail service in success");
                                console.log(success)
                                res.send(new SuccessResponse('ok','','','Mail send successfully'))
                            },function (failed){

                                return res.json(new ErrorResult('failed', "invalid email address", [{'msg':'maiing error'}]));
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
                                    res.send(new SuccessResponse('ok','','','User is activated'))
                                    res.end();
                                }

                            });
                        }
                    });
                }
            }
        });
    },
    createAddress : function (req,res) {
        var qp = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var queryParam=qp.address;
        var query_id=qp.id
        var query={type : queryParam.type ,addressLine_1 : queryParam.addressLine_1,addressLine_2 : queryParam.addressLine_2,street : queryParam.street,city : queryParam.city,state : queryParam.state,country : queryParam.country ,zipCode : queryParam.zipCode}
        var newAddress=new addresses(queryParam);
        if(queryParam._id){
            newAddress.isNew=false

        }
        else{
            newAddress.isNew=true
        }
        newAddress.save(function (err,address) {
            if (err) {

                res.send(err);
            }
            else if(!queryParam._id ){
                users.findOne({_id : query_id }).exec(function (err, result) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        if(result != null ){
                            if(typeof result.addresses === 'undefined' || result.addresses.length ==0 ){
                                result.addresses.push(address._id);
                            }
                            else if(!result.addresses.includes(address._id)){
                                result.addresses.push(address._id);
                            }
                            result.save(function (errad,response){
                                if(errad){
                                    res.send(errad)
                                }
                                else {

                                }
                            });
                        }
                        res.send(new SuccessResponse('ok','','','adresss is created'));
                        res.end();
                    }

                });
            }
        });
    }

};
module.exports=usersRoute;