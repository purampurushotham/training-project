/**
 * Created by purushotham on 28/2/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose)
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var productSchema = new Schema({
        product_id :{
            type : String,
            required : true,
            trim: true
        },
        name :{
            type : String,
            required : true,
            trim: true

        },
        price :{
            type : SchemaTypes.Double,
            required : true,
            trim: true

        },
        type :{
            type : String,
            required : true,
            trim: true

        },
        subType :{
            type : String,
            required : true,
            trim: true

        },
        brand :{
            type : String,
            trim: true

        },
        color :{
            type : String,

            trim: true
        },
        model_Name :{
            type : String,

            trim: true

        },
        battery :{
            type : String,
            trim: true

        },
        rom :{
            type : String,

            trim: true

        },
        ram :{
            type : String,

            trim: true

        },
        pic: {
            data : Buffer,
            contentType : String,
            
        },
        cam: {
            type : Array,
            default : [],

            trim: true

        },
        language :{
            type : String,
            trim : true
        },
        author : {
            type : String,
            trim : true
        },
        offers : {
            type : SchemaTypes.ObjectId,
            ref : "offers"
        },
        rating :{
            type :SchemaTypes.Double,
            required : true,
            trim: true
        },
        comments: [{
            type : SchemaTypes.ObjectId,
            ref: 'comments'
        }]
    }
    /*  {collection:'productsList', strict: false}*/
);
var products = mongoose.model("products",productSchema);
module.exports =products;
