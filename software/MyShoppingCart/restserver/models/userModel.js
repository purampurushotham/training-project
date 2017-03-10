/**
 * Created by purushotham on 6/3/17.
 */
var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var UserSchema = new Schema({
        firstName:{
            type:String,
            trim:true,
            required: true
        },
        lastName:{
            type:String,
            required: true,
            trim:true
        },
        email:{
            type: String,
            trim:true,
            required: true
        },
        phoneNumber:{
            type:String,
            required: true
        },
        password:{
            type: String,
            required: true,
            trim:true

        },
        startDate : {
            type : Date,
            trim :true
        },
        updatedDate : {
            type : Date,
            trim : true
        },
        isActive : {
            type : Boolean,
            trim : true
        },
        addresses :[{
            type : SchemaTypes.ObjectId,
            ref : "addresses"
        }],
    },
    {collection : 'users'}
);
var userModel = mongoose.model('users', UserSchema);
module.exports=userModel;

