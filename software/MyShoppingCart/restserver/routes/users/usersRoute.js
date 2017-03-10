/**
 * Created by purushotham on 6/3/17.
 */
var passwordHash = require('password-hash');
var nodemailer = require("nodemailer");
var smtpTransport=require('nodemailer-smtp-transport')
var mongoose=require('mongoose');
var jwt = require('jwt-simple');
var tokens=require('../../models/TokenModel');
var users=require('../../models/userModel');
var tokenEnumObject=require('../../enums/token_enums');
var sendmail = require('sendmail')();
var usersRoute = {
    getExistedEmail : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("*****************************");
        console.log(queryParam);
        var regularExpression = "/^"+queryParam.keyword+"/i";
        var regex = new RegExp(queryParam.keyword,"i");
        console.log(regularExpression);
        console.log(regex);
        var query={email: { $regex: regex }};
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
    createUserNew : function(req, res) {
        console.log("in adddddddddddddddd");
        // console.log(req);
        // console.log('params ', req.param('q'));
        var queryParam =  req.body.q;
        console.log(queryParam);
        var query ={};
        //  query.firstName="puram"
        query=queryParam;
        query.password=hashingPassword(query.password);
        function hashingPassword(password){
            var hashedPassword =passwordHash.generate(password);
            return hashedPassword;
        }
        //console.log("**************************"+"in addd user")
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
                console.log("************************* calling generate Token")
                //console.log(result)
                generateToken(query.firstName,query.lastName);
                res.send("Success");
                res.end();
            }
        });
        function generateToken(firstName,lastName){
            var serverAddress = req.protocol + '://' + req.get('host');
            console.log(firstName,lastName)
            console.log("************************* in generateToken");
            var newToken=new tokens();
            newToken.token=jwt.encode(query.email,'xxx');
            console.log(newToken.token);
            if(newToken.token) {
                console.log("************************* token exists");
                newToken.type=tokenEnumObject.REGISTRATION.code
                newToken.email = query.email;
                newToken.startDate=new Date();
                newToken.updatedDate=new Date();
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
                       /* sendmail({
                            from: 'no-reply@myShoppingCart.com',
                            to: 'puram.purushotham@india.semanticbits.com',
                            subject: 'Registration Scuccessful',
                            html: "HI"+" "+firstName+ " "+lastName+"please follow this link for account activation" + " "+
                            serverAddress+"/#!/confirmregistration/"+newToken.token
                        }, function(err, reply) {
                            console.log(err && err.stack);
                            console.log("************************* in send mail");
                            console.log(reply);
                        });
                        console.log("*************************");
                        //console.log(result)

*/
                    }
                })
            }
        }
    },
    confirmUser : function(req,res){
        var queryParam = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        console.log("***************** in confirm User");
        var query={token : queryParam.token}
        tokens.findOne(query).exec(function (err, result) {
            console.log("**************************"+"in getExistedEmail")
            if (err) {
                res.send(err);
            }
            else {
                console.log(result)
                if(result == null){
                    console.log("**************************"+"in confirmUser")
                    res.send({data : result})
                    res.end();
                }
                else {

                    var re=result.email

                    var quert1={email :re}
                    users.findOneAndUpdate({email :re},{$set : {isActive : true}}).exec(function (err, confirmed) {
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
    }

};
module.exports=usersRoute;