/**
 * Scripts to be used for portfolio website
 *
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */


import Email from "./smtp.js";

// Add event listeners on script load
document.getElementById("userSubmit").addEventListener("click", sendEmail);


/**
 * Send an email after validating form data
 * @return none
 */
function sendEmail() {
    var from = document.getElementById("userEmail").value.trim();
    var subject = document.getElementById("userSubject").value.trim();
    var body = document.getElementById("userMessage").value.trim();
    var returnCopy = document.getElementById("userCopy").checked;

    if (validateForm(from, subject, body)) {
        // build email object for SMTP
        var emailObject = {
            SecureToken : _getSecrets(),
            To : 'temtamre@gmail.com',
            From : from,
            Subject : subject,
            Body : body
        }

        // If the sender wants a copy of the email they send, we can CC them
        if (returnCopy) {emailObject[Cc] = from;}

        // send email and alert the user
        Email.send(emailObject)
            .then(response => console.log("response:", response))
            .then(console.log("sent:", emailObject))
            .catch(error => console.error(error));
    };
}


/**
 * Validate form data
 * @param {string} from     seder of the email
 * @param {string} subject  subject line of the email
 * @param {string} message     body text of the email
 * @returns {boolean} true if string is valid, false otherwise
 */
function validateForm(from, subject, message) {
    var error = "";

    // sanitation
    if (!_validateString([from, subject, message])) {
        error = "ERROR: validateString() returned false\n"
    }

    // email validation
    if (from == "") {
        error += "ERROR: email field empty; please enter an email address\n";
    } else if (!_validateEmail(from)) {
        error += "ERROR: email field invalid; please enter a valid email address\n";
    }

    // subject validation (subject is optional; gets autofilled if left empty)
    if (subject == "") {subject = "Sent from 'ttamre.github.io' contact form";}

    // message validation
    if (message == "") {error += "ERROR: message field empty; please add content to your email";}

    // if an error was encountered, clear the fields, alert the user, and return false
    if (error != "") {
        from, subject, message = "";

        console.error(error);
        return false;
    } else {
        return true;
    }
}


/**
 * Validate email format
 * @param {string} email user-provided email
 * @returns {boolean} true if string is in proper email format, false otherwise
 */
function _validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


/**
 * Validate a string or list of strings against a list of naughty strings
 * @param {string} text or @param {list} [text]
 * @returns {boolean} true if the string(s) is safe, false otherwise
 */
function _validateString(text) {
    let badStrings = []
    fetch("./js/invalid.json")
        .then(response => badStrings = response.json())
        .catch(error => console.error(`ERROR: errror fetching JSON file\n${error}`));

    if (typeof text === "object") {
        return !text.any(badStrings.includes);
    } else if (typeof text === "string") {
        return !badStrings.includes(text);
    } else {
        return false;
    }
}


/**
 * @returns {string}
 */
function _getSecrets() {
    let token = "";
    fetch("./js/secrets.json")
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.error(`ERROR: cant fetch token\n${error}`));

    return token;
}
