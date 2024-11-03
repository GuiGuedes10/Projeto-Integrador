// Execute after the DOM has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Selectors for login and signup buttons
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");
    var body = document.querySelector("body");

    // Toggle between login and signup screens
    btnSignin.addEventListener("click", function () {
        body.className = "sign-in-js"; 
    });

    btnSignup.addEventListener("click", function () {
        body.className = "sign-up-js";
    });

    // Function for user registration
});

