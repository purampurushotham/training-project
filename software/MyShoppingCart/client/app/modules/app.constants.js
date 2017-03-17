/**
 * Created by purushotham on 15/3/17.
 */
(function() {
    'use strict';
    angular.module('MSC')
        .constant('Regexes', {
            NAME_PATTERN :/^[a-zA-Z\(\)]+$/,
            PHONE_NO_PATTERN : /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/,
            PASSWORD_PATTERN : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            ZIPCODE_PATTERN : /^\d{5}(?:[-\s]\d{4})?$/

        })
        .constant('validation',{
            USER_NAME_MIN_LENGTH:5,
            USER_NAME_MAX_LENGTH:10

        });
}());