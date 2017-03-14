/**
 * Created by purushotham on 14/3/17.
 */
var nodemailer = require("nodemailer");
var smtpTransport=require('nodemailer-smtp-transport');
var mongoose=require('mongoose');
var Q=require('q')
var path=require('path')
var extConfigLoc =path.join(__dirname,'../../config/config.json');
console.log(extConfigLoc)
var config = require(extConfigLoc);
var appConfig = JSON.parse(JSON.stringify(config));
var sendMail ={
    sendMail: function(query){
        var deffered = Q.defer();
        var mailConfig=appConfig.mail;
        var sender=appConfig.mail.auth;
        var transport = nodemailer.createTransport(smtpTransport({
            service: "gmail ",  // sets automatically host, port and connection security settings
            auth: {
                user: sender.email,
                pass: sender.password
            }
        }));
        transport.sendMail({  //email options
            from: sender.email, // sender address.  Must be the same as authenticated user if using Gmail.
            to: "puram.purushotham@india.semanticbits.com", // receiver
            subject: mailConfig.addUserSubject, // subject
            text: "HI"+" "+query.firstName+ " "+query.lastName+"please follow this link for account activation" + " "+
            query.serverAddress+"/#!/confirmregistration/"+query.token //body
        }, function(error, response){  //callback
            if(error){
                console.log(error);
                deffered.reject(error)
            }else{
                console.log("Message sent: " + response.message);
                deffered.resolve();
            }
            transport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        });
        return deffered.promise
    }
};
module.exports=sendMail;
