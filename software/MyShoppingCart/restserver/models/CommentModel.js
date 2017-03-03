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
            required : true
        },
        CommentedOn : {
            type :Date,
            required : true

        },
        rating : {
            type :SchemaTypes.Double,
            required : true
        }
    },
    {collection:'comments', strict: false}
);
var commentsModel = mongoose.model("comments",commentsSchema);
module.exports = commentsModel;