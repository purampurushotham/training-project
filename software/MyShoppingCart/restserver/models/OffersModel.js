/**
 * Created by purushotham on 3/3/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var offersSchema = new Schema({
        Discount : {
            type :String,
            trim :true
        },
        SpecialOffer : {
            type :String,
            trim :true

        },
        FestivalOffer : {
            type :String,
            trim :true
        }
    },
    {collection:'offers', strict: false}

);
var offersModel = mongoose.model("offers",offersSchema)
module.exports = offersModel;