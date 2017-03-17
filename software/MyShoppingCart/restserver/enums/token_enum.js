/**
 * Created by purushotham on 7/3/17.
 */
var tokenEnums={
    "AUTH": {code:"AUTH", value: "Auth"},
    "REGISTRATION": {code:"REGISTRATION", value: "Registration"},
    "OTP": {code:"OTP", value: "Otp"}
};
var tokenEnumObject = {
    values: Object.keys(tokenEnums),
    value: function (code) {
        return tokenEnums[code].code;
    }
};
tokenEnumObject = Object.assign(tokenEnums, tokenEnumObject);
module.exports = tokenEnumObject;
