/**
 * Created by purushotham on 8/3/17.
 */
var passwordHash = require('password-hash');
var nodemailer = require("nodemailer");
var smtpTransport=require('nodemailer-smtp-transport')
var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var jwt = require('jwt-simple');
var tokens=require('../../models/TokenModel');
var users=require('../../models/userModel');
var addresses=require('../../models/AddressModel')
var tokenEnumObject=require('../../enums/token_enums');
var SuccessResponse= require('../../models/SuccessResponse');
var ErrorResult = require('../../models/errorResult/ErrorResult')
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
                var validatePassword = passwordHash.verify(queryParam.password, resultSet.password);
                if (validatePassword) {
                    var newToken = new tokens();
                    newToken.token = jwt.encode(query.email, 'xxx');
                    console.log(newToken.token);
                    if (newToken.token) {
                        newToken.type = tokenEnumObject.AUTH.code
                        newToken.email = query.email;
                        newToken.startDate = new Date();
                        newToken.updatedDate = new Date();
                        newToken.save(function (err) {
                            if (err) {
                                console.log(err)
                                res.send(err);
                            }
                            else {
                                var data = {}
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
                var serverAddress = req.protocol + '://' + req.get('host');
                newToken.token = jwt.encode(query.email, 'xxx');
                if (newToken.token) {
                    newToken.type = tokenEnumObject.OTP.code
                    newToken.email = query.email;
                    newToken.startDate = new Date();
                    newToken.updatedDate = new Date();
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
                                    pass: "Bujji143Bunny$"
                                }
                            }));

                            transport.sendMail({  //email options
                                from: "purams225@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
                                to: "puram.purushotham@india.semanticbits.com", // receiver
                                subject: "Emailing with nodemailer", // subject
                                text: "A request has been received to change the password. Clink on below link to set a new password." +
                                serverAddress + "/#!/forgotpassword/" + newToken.token//body
                            }, function (error, response) {  //callback
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Message sent: " + response.message);
                                }
                                transport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                            });

                        }
                    });
                }
                res.send(new SuccessResponse("ok",response,'',"message delivered successfully"))
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
                                    res.send(new SuccessResponse("ok",result,'',"password rpdated successfully"));
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
                        var total=response.addresses.length;
                        res.send(new SuccessResponse("ok",results.addresses,total,"success"));
                    }
                })

            }
            else
                return res.json(new ErrorResult('failed', "Address", [{'msg':'no addresss are found '}]))
        });
        /*
         if(req.query.page) {
         var page_number =req.query.page ? req.query.page:1;
         var page_size = req.query.page_size ? req.query.page_size : 5 ;
         var regExp;
         if(req.query.firstName){
         var str = req.query.firstName;
         var tokens = str.split(' ');
         var andQuery = [];

         if(tokens.length===1){
         andQuery.push({firstName:new RegExp(tokens[0], "i")},{lastName:new RegExp(tokens[0], "i")});
         query['$or'] = andQuery;
         }
         else{
         ['firstName','lastName'].forEach(function(attr, ind){
         var orQuery = [];
         tokens.forEach(function(token,tokenInd) {
         var ele = {};
         ele[attr]= new RegExp(token, "i");
         orQuery.push(ele)
         });
         andQuery.push({'$or':orQuery})
         });
         query['$and'] = andQuery;
         }
         }if(req.query.email){
         regExp= new RegExp(req.query.email, "i");
         query.email=regExp;
         }if(req.query.phoneNumber){
         regExp= new RegExp(req.query.phoneNumber, "i");
         query.phoneNumber=regExp;
         } if(req.query.isPayeeNotAllowed) {
         query.roles = {'$ne':'ROLE_PAYEE'};
         }


         // Refer for paginate https://www.npmjs.com/package/mongoose-paginate
         UserModel.paginate(query, { page: Number(page_number), limit: Number(page_size) }, function(err, response) {
         if (err) {
         res.send(new errorResult('ERROR', "failed",err));
         } else {
         res.send(new SuccessResponse('OK', response.docs, response, "success") );
         res.end();
         }
         });
         */
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
                    //    console.log(addr +"***********"+  address._id)
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
                                //  console.log(response)
                                console.log(results);
                                res.send(response)
                            }
                        });
                    }
                });
            }

        });
    }
};
module.exports=authenticateRoute;


