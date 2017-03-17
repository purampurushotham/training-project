/*
/!**
 * Created by purushotham on 6/3/17.
 * */
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
        type : Date,
        default : Date.now()
    },
    updatedDate : {
        type : Date,
        default : Date.now()
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