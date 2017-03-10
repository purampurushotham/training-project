/**
 * Created by purushotham on 8/3/17.
 */
var passwordHash = require('password-hash');
var nodemailer = require("nodemailer");
var smtpTransport=require('nodemailer-smtp-transport')
var mongoose=require('mongoose');
var jwt = require('jwt-simple');
var tokens=require('../../models/TokenModel');
var users=require('../../models/userModel');
var addresses=require('../../models/AddressModel')
var tokenEnumObject=require('../../enums/token_enums');
var sendmail = require('sendmail')();
var authenticateRoute = {
    validateUser: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("*****************************");
        console.log(queryParam.email);
        console.log("**********************")
        var query = {email: queryParam.email, isActive: true};
        users.findOne(query).exec(function (err, resultSet) {
            console.log("**************************" + "in validateUser")
            console.log(resultSet);
            if (err) {
                res.send(err);
            }

            else if (resultSet != null) {
                console.log("**************************" + "in validateUser")
                var validatePassword = passwordHash.verify(queryParam.password, resultSet.password);
                console.log(validatePassword);
                if (validatePassword) {
                    console.log("********************************* token")
                    var newToken = new tokens();
                    newToken.token = jwt.encode(query.email, 'xxx');
                    console.log(newToken.token);
                    if (newToken.token) {
                        console.log("************************* token exists");
                        newToken.type = tokenEnumObject.AUTH.code
                        newToken.email = query.email;
                        newToken.startDate = new Date();
                        newToken.updatedDate = new Date();
                        console.log("*************************new token Object");
                        console.log(newToken);
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
                                res.send(data);
                            }
                        });
                    }
                }
                else {
                    res.send({data: { message :"Login failed",status  : 404}});
                    res.end();
                }
            }
            else {
                res.send({data: "Login failed"});
                res.end();
            }
        });
    },
    forgotPassword: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("in forgotpassword");
        console.log(queryParam);
        var query = {email: queryParam.email, isActive: true};
        console.log(query);
        users.findOne(query).exec(function (err, resultSet) {
            console.log("**************************" + "in validateUser")
            console.log(resultSet);
            if (err) {
                res.send(err);
            }
            else if (resultSet != null) {
                console.log("********************Email exists");
                var newToken = new tokens();
                var serverAddress = req.protocol + '://' + req.get('host');
                newToken.token = jwt.encode(query.email, 'xxx');
                console.log(newToken.token);
                if (newToken.token) {
                    console.log("************************* token exists");
                    newToken.type = tokenEnumObject.OTP.code
                    newToken.email = query.email;
                    newToken.startDate = new Date();
                    newToken.updatedDate = new Date();
                    console.log("*************************new token Object");
                    console.log(newToken);
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
            }
            else {
                res.send({data: {message: "user Email Doesn't exists", status: 404}});
                res.end();
            }
        });
    },
    resetPassword: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("in reset password");
        console.log(queryParam)
        var query = {token: queryParam.token}
        console.log(query)
        tokens.findOne(query).exec(function (err, result) {
            console.log("**************************" + "in resetPassword")
            if (err) {
                res.send(err);
            }
            else {
                console.log(result)
                if (result == null) {
                    console.log("**************************" + "in  ")
                    res.send({data: result});
                    res.end();
                }

                else {
                    var re = result.email
                    var newPassword = passwordHash.generate(queryParam.user.password);
                    console.log(newPassword)
                    var quert1 = {email: re}
                    users.findOneAndUpdate({email: re}, {$set: {password: newPassword}}).exec(function (err, confirmed) {
                        console.log("**************************" + "in user collection")
                        if (err) {
                            res.send(err);
                        }
                        else {
                            console.log(confirmed);
                            tokens.findOne({email: re}).remove().exec(function (err, result) {
                                console.log("**************************" + "in removing token")
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    console.log("************************** token is removedd");
                                    res.send({status: 200});
                                    res.end();
                                }

                            });
                        }
                    });
                }
            }
        });
    },
    getProfile: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("in reset password");
        console.log(queryParam);
        users.findById({_id: queryParam.id}).exec(function (err, result) {
            console.log("**************************" + "in getProfile");
            if (err) {
                res.send(err);
            }
            else {
                console.log("**************************document fount getProfile");
                console.log(result);
                var profile = {};
                profile.firstName = result.firstName;
                profile.lastName = result.lastName;
                profile.email = result.email;
                profile.phoneNumber = result.phoneNumber;
                console.log(profile)
                res.send({data: {profile: profile, status: 200}});
                res.end();
            }
        });
    },
    getAddress: function (req, res) {
        console.log("in getAddress");
        console.log(req.query.q);
        var queryParam=req.query.q;
        console.log(queryParam);
        console.log("&*************************Z i getAddress");
        var query = {_id: queryParam}
        users.findOne(query).populate('addresses').exec(function (err, results) {
            console.log("**************************" + "i query executiopn");
            if (err) {
                res.send(err);
            }
            else {
                console.log("**************************got dsata");
                console.log(results.addresses);
                res.send({data :results.addresses}  )
            }
        });
    }
}
module.exports=authenticateRoute;


