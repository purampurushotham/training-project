/**
 * Created by purushotham on 9/3/17.
 */

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var addressSchema=new Schema({
        type:{
          type :String,
            trim : true
        },
        addressLine_1: {
            type: String,
            trim: true
        },
        addressLine_2: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        zipcode: {
            type: String,
            trim: true
        }
    },
    {collections : 'addresses'}
);
addressSchema.plugin(mongoosePaginate)
var addressModel=mongoose.model('addresses',addressSchema);
module.exports=addressModel;




