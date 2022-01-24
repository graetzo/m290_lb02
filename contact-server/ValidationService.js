// Validate form input elements
const validateLib = require('./ValidationLib');

function validateFormData(data) {
    // Check required fields
    let result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("password", data.password);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("birthdate", data.birthdate);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("phone", data.phone);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("message", data.message);
    if (result.isNotValid) { return result; }

    //check phone
    result = validateLib.checkPhone("phone", data.phone);
    if (result.isNotValid) { return result; }

    //check password
    result = validateLib.checkPassword("password", data.password);
    if (result.isNotValid) { return result; }

    //check length
    result = validateLib.checkLength("firstName", data.firstName, 3, 25);
    if (result.isNotValid) { return result; }

    result = validateLib.checkLength("email", data.email, 3, 20);
    if (result.isNotValid) { return result; }

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) { return result; }

    //all inputs are valid and isNotValid=false
    return false;
}

module.exports = {
    validateContact: validateFormData
}