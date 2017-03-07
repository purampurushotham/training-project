/*
/!**
 * Created by purushotham on 6/3/17.
 *!/
var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var TokenSchema=new Schema({
    type{AUTH/REGISTRATION/OTP}, email, startDate, updatedDate, id
    user : {
        type : Schema.Types.ObjectId, 
        ref : 'users' 
    },

},
    {collection : 'tokens'}
);*/
var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var tokenSchema = new Schema({
        token : {
        type:String,
        required : true
    },
    type:{
        type:String
    },
    startDate:{
        type : Date
    },
    updatedDate : {
        type : Date
    },
    email: {
        type : String,
        ref  :'users',
        required : true
    }
},
    {collection: "tokens"}
);
var tokenModel=mongoose.model('tokens',tokenSchema);
module.exports=tokenModel;