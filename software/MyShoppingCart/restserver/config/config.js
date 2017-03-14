/**
 * Created by purushotham on 14/3/17.
 */
module.exports = function(){
    console.log(process.env.NODE_ENV);
    switch(process.env.NODE_ENV){
        case 'dev':

            return {
                db:{

                    url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/paas_test'
                }
            };

        case 'test':

            return {
                db:{
                    url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/node-test'
                }
            };

        default:
            return {};
    }
};
