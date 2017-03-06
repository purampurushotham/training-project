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
