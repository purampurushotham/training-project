/**
 * Created by purushotham on 8/3/17.
 */
var passwordHash = require('password-hash');
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
        var query = {email: queryParam.email};
        users.findOne(query).exec(function (err, resultSet) {
            console.log("**************************" + "in validateUser")
            console.log(resultSet);
            if (err) {
                res.send(err);
            }

            else if(resultSet != null) {
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
                                data.id=resultSet._id;
                                res.send(data);
                            }
                        });
                    }
                }
                else {
                    res.send({data: "Login failed"});
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
        var query = {email: queryParam.email,isActive : true};
        console.log(query);
        users.findOne(query).exec(function (err, resultSet) {
            console.log("**************************" + "in validateUser")
            console.log(resultSet);
            if (err) {
                res.send(err);
            }
            else if(resultSet !=null) {
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
                            sendmail({
                                from: 'no-reply@myShoppingCart.com',
                                to: 'puram.purushotham@india.semanticbits.com',
                                subject: 'Password Reset',
                                html: "A request has been reciereceived to change the password. Clink on below link to set a new password."+
                                serverAddress+"/#!/forgotpassword/"+newToken.token
                            }, function(err, reply) {
                                console.log(err && err.stack);
                                console.log("************************* in send mail");
                                console.log(reply);
                            });
                            console.log("*************************");
                            //console.log(result)


                        }
                    });
                }
            }
            else{
                res.send({data:{message : "user Email Doesn't exists",status:404 }});
                res.end();
            }
        });
    },
    resetPassword : function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("in reset password");
        console.log(queryParam)
        var query={token : queryParam.token}
        console.log(query)
        tokens.findOne(query).exec(function (err, result) {
            console.log("**************************"+"in resetPassword")
            if (err) {
                res.send(err);
            }
            else {
                console.log(result)
                if(result == null){
                    console.log("**************************"+"in  ")
                    res.send({data : result});
                    res.end();
                }

                else {
                    var re=result.email
                    var newPassword=passwordHash.generate(queryParam.user.password);
                    console.log(newPassword)
                    var quert1={email :re}
                    users.findOneAndUpdate({email :re},{$set : {password : newPassword}}).exec(function (err, confirmed) {
                        console.log("**************************"+"in user collection")
                        if (err) {
                            res.send(err);
                        }
                        else{
                            console.log(confirmed);
                            tokens.findOne({email :re}).remove().exec(function (err, result) {
                                console.log("**************************"+"in removing token")
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    console.log("************************** token is removedd");
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
    getProfile: function (req, res) {
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("in reset password");
        console.log(queryParam);
        users.findById({_id : queryParam.id}).exec(function (err, result) {
            console.log("**************************"+"in getProfile");
            if (err) {
                res.send(err);
            }
            else {
                console.log("**************************document fount getProfile");
                console.log(queryParam.id)
               /* addresses.findOne({user_id: '58c1341b594d3b0e21a306ad' }).exec(function (err,address) {
                    console.log("**************************"+"in getProfile")
                    console.log(address)
                    if (err) {
                        res.send(err);
                    }
                    else if(address!=null){
                        var addresses={};
                        console.log("***************************************");
                        addresses=address;
                        console.log(addresses)
                    }
                });
            */
                var profile={};
                profile.firstName=result.firstName;
                profile.lastName=result.lastName;
                profile.email=result.email;
                profile.phoneNumber=result.phoneNumber;
                res.send({data : {profile : profile,address: addresses,status : 200}});
                res.end();
            }
        });
    }
}
module.exports=authenticateRoute;
