// Read form element
let ALL_INPUT_VALID;

const form = document.getElementById('form');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const birthdate = document.getElementById('birthdate');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const newsletter = document.getElementById('newsletter');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
        ALL_INPUT_VALID = false;
    }
}

// Check phone is valid
function checkPhone(input) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Phone is not valid');
        ALL_INPUT_VALID = false;
    }
}

// Check password is strong enough
function checkPassword(input) {
  const re = /^[A-Za-z]\w{7,14}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
   } else {
        showError(input, 'Password is not strong enough');
        ALL_INPUT_VALID = false;
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
            ALL_INPUT_VALID = false;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        ALL_INPUT_VALID = false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        ALL_INPUT_VALID = false;
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
    if (!checkRequired([email, firstName, lastName, password, birthdate, phone, message, newsletter])) {
        checkLength(firstName, 3, 20);
        checkLength(lastName, 3, 20);
        checkEmail(email);
        checkPhone(phone);
        checkPassword(password);
    }
}

// Make testcall
window.onload = () => {
    console.log(`Make test call to the server ...`);
    getWelcome().then(
        result => {
            console.log(`Response from server: ${result}`);
        },
        error => {
            console.log(error)
        });
}

// Event listeners
form.addEventListener('submit', function (e) {
    ALL_INPUT_VALID = true;
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
    //Send data
    if (ALL_INPUT_VALID) {
        let formData = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            birthdate: birthdate.value,
            phone: phone.value,
            message: message.value,
            newsletter: newsletter.checked
        }
        console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

        //Variant 2
        sendForm2(formData).then(
            result => {
                console.log(`Response from server: ${result}`);
                window.location.href = './confirmation.html';
            }).catch(err => {
            console.log(`Error occurred: ${err}`)
        });
    } else {
        console.log("At least one validation failed. No data sent to contact-server.");
    }

});