/**
 * Created by purushotham on 15/3/17.
 */

var apiUtils = {
    getServerUrl: function( req ) {
        return req.protocol + '://' + req.get('host');//get server url
    },
};
module.exports = apiUtils;
