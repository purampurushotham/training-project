/*
/!**
 * Created by purushotham on 28/2/17.
 *!/

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
*/
