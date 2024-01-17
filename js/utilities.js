/**
 * Scripts to be used for portfolio website
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

/**
 * 
 * @returns 
 */
function validateForm() {
    var email = document.getElementById("userEmail").value;
    var subject = document.getElementById("userSubject").value;
    var message = document.getElementById("userMessage").value;
    var copy = document.getElementById("userCopy").value;
    var error = "";

    if (subject == "") {
        subject = "Sent from ttamre.github.io contact form\n";
    }

    if (email == "") {
        error += "Please enter your email address.\n";
    } else if (!validateEmail(email)) {
        error += "Please enter a valid email address.\n";
    }

    if (message == "") {
        error += "Please enter a message.\n";
    }

    if (error != "") {
        alert(error);
        return false;
    }
    
    var emailData = {from: {email: email, subject: subject}, body: message, returnCopy: copy, errorMessage: error}
}

/**
 * 
 * @param {string} email user-provided email
 * @returns 
 */
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
