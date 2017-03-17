/**
 * Created by purushotham on 14/3/17.
 */
var nodemailer = require("nodemailer");
var smtpTransport=require('nodemailer-smtp-transport');
var mongoose=require('mongoose');
var Q=require('q')
var path=require('path')
var emailTemplates = require('email-templates');
var templatesDir =  path.resolve(__dirname, '..', '../emailTemplates');
var extConfigLoc =path.join(__dirname,'../../config/config.json');
var config = require(extConfigLoc);
var appConfig = JSON.parse(JSON.stringify(config));
var sendMail = {
    sendMail: function (templateName,query) {
        var deffered = Q.defer();
        var sender = appConfig.mail.auth;
        var transport = nodemailer.createTransport(smtpTransport({
            service: "gmail ",  // sets automatically host, port and connection security settings
            auth: {
                user: sender.email,
                pass: sender.password
            }
        }));
        emailTemplates(templatesDir, function (err, template) {
            if (err) {
                console.log(err);
            }
            // Send a single email
            template(templateName, query, function (err, html, text) {
                if (err) {
                    console.log(err);
                }
                else {
                    transport.sendMail({  //email options
                        from: sender.email, // sender address.  Must be the same as authenticated user if using Gmail.
                        to: "puram.purushotham@india.semanticbits.com", // receiver
                        subject: query.subject, // subject
                        text: text,
                        html : html
                    }, function (error, response) {  //callback
                        if (error) {
                            deffered.reject(error)
                        } else {
                            deffered.resolve();
                        }
                        transport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                    });
                    return deffered.promise
                }
            });
        });
        return deffered.promise
    }
};
module.exports=sendMail;
