/**
 * Created by purushotham on 7/3/17.
 */
var Q = require('q');
var passwordHash=require('password-hash');
var apiUtils={
    getHashedPassword : function(password){
        return  passwordHash.generate(password);
    }
    
}