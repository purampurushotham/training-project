/**
 * Created by purushotham on 15/3/17.
 */

//Result model for API
var SuccessResponse = function(status, data, pagination, message ) {
    this.status = status;
    this.data = data;
    if(pagination) {
        this.pagination = {};
        console.log(pagination)
        this.pagination.total = pagination.total;
        /*this.pagination.page = pagination.page;
        this.pagination.pages = pagination.pages;
        this.pagination.limit = pagination.limit;*/
    }
    this.messages = message;
};

module.exports = SuccessResponse;
