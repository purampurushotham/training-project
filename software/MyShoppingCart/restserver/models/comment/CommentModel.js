/**
 * Created by purushotham on 28/2/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var commentsSchema = new Schema({
        username : {
            type :String,
            trim :true

        },
        CommentedOn : {
            type :Date,
            trim :true


        },
    text : {
            type : String,
        trim : true
    },
        rating : {
            type :SchemaTypes.Double,
            
        }
    },
    {collection:'comments', strict: false}
);
var commentsModel = mongoose.model("comments",commentsSchema);
module.exports = commentsModel;