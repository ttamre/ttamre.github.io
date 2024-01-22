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

    console.log(`received: from ${from}, subject ${subject}, body ${body}, returnCopy ${returnCopy}`);

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
        Email.send(emailObject).then(
            console.log("sent:", emailObject)
        ).then(alert("Message sent!"));
    };
}


/**
 * Validate form data
 * @param {string} from     seder of the email
 * @param {string} subject  subject line of the email
 * @param {string} body     body text of the email
 * @returns {boolean} true if string is valid, false otherwise
 */
function validateForm(from, subject, message) {
    var error = "";

    // sanitation
    if (!_validateString([from, subject, body])) {
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
        alert(error);
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
    fetch("./js/invalid.json")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(`ERROR: errror fetching JSON file\n${error}`));

    if (typeof text === "list") {
        return text.every(data.includes);
    } else if (typeof text === "string") {
        return data.includes(text);
    } else {
        return false;
    }
}


/**
 * @returns {string} 
 */
function _getSecrets() {
    fetch("./js/secrets.json")
        .then(response => response.json())
        .catch(error => console.log(`ERROR: error fetching token\n${error}`))
    
    if (response) {
        return response["smtp"]["token"];
    } else {
        return "";
    }
}
