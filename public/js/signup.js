document.addEventListener("DOMContentLoaded", () => {

    // variables for DOM elements
    const signUpform = document.getElementById('signUpForm')
    const orgInputValue = document.getElementById('org-input')
    const emailInputValue = document.getElementById('email-input')
    const passInputValue = document.getElementById('pass-input')

    // Event listener for sign up form

    signUpform.addEventListener('submit', (event) => {
        event.preventDefault();

        let userData = {
            org: orgInputValue.value.trim(),
            email: emailInputValue.value.trim(),
            password: passInputValue.value.trim(),
        };

        console.log(userData);

        if (!userData.org || !userData.email || !userData.password) {
            return;
        }

        signUpUser(userData.org, userData.email, userData.password);
        orgInputValue.value = "";
        emailInputValue.value = "";
        passInputValue.value = "";

    });

    // Need to set up SignUpUser Function
    signUpUser = (orgName, email, password) => {

    }


});