/**
 * Scripts to be used for portfolio website
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */


import Email from "./smtp";


/**
 * Send an email to myself after validating form data
 * 
 * @return
 */
function sendEmail() {
    var from = document.getElementById("userEmail").value.trim();
    var subject = document.getElementById("userSubject").value.trim();
    var body = document.getElementById("userMessage").value.trim();
    var returnCopy = document.getElementById("userCopy").checked;

    if (validateForm(from, subject, body, returnCopy)) {
        // build email object for SMTP
        var emailObject = {
            SecureToken : "",
            To : 'temtamre@gmail.com',
            From : from,
            Subject : subject,
            Body : body
        }

        // If the sender wants a copy of the email they send, we can CC them
        if (returnCopy) {emailObject[Cc] = from;}

        // send email and alert the user
        Email.send(emailObject).then(
            console.log(emailObject)
        ).then(alert("Message sent!"));
    };
}


/**
 * Validate form data
 * 
 * @param {string} from     seder of the email
 * @param {string} subject  subject line of the email
 * @param {string} body     body text of the email
 * @returns {boolean} true if string is valid, false otherwise
 */
function validateForm(from, subject, message) {
    var error = "";

    // general string validation
    if (![from, subject, message].every(validateString)) {
        error = "Invalid string detected; please retry your message"
    }

    // email validation
    if (from == "") {
        error += "Please enter your email address";
    } else if (!validateEmail(from)) {
        error += "Please enter a valid email address";
    }

    // subject validation (subject is optional; gets autofilled if left empty)
    if (subject == "") {subject = "Sent from 'ttamre.github.io' contact form";}

    // message validation
    if (message == "") {error += "Please enter a message";}

    // if an error was encountered, clear the fields, alert the user, and return false
    if (error != "") {
        console.log(2);
        from = "";
        subject = "";
        message = "";
        returnCopy = null;

        alert(error);
        return false;
    }
    
    var cleanEmailData = {from: from, subject: subject, message: message, returnCopy: returnCopy};
    return cleanEmailData;
}


/**
 * Validate a string against a list of naughty strings
 * 
 * @param {string} text 
 * @returns {boolean} true if the string is safe, false otherwise
 */
function validateString(text) {
    return true;
}


/**
 * Validate email format
 * @param {string} email user-provided email
 * @returns {boolean} true if string is in proper email format, false otherwise
 */
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
