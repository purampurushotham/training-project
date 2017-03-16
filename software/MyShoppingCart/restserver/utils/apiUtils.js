/**
 * Created by purushotham on 15/3/17.
 */
var passwordHash = require('password-hash');
var jwt = require('jwt-simple');
var apiUtils = {
    getServerUrl: function( req ) {
        return req.protocol + '://' + req.get('host');//get server url
    },
    generatePassword : function(pass){
        return passwordHash.generate(pass)
    },
    generateToken : function(email){
        return jwt.encode(email,'xxx');
    },
    verifyPassword : function (password,hashedPassword) {
        return passwordHash.verify(password,hashedPassword)
    }
};
module.exports = apiUtils;
