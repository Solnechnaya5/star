const emailLogin = document.getElementById("email-login");
const emailPatternLogin = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const passwordLogin = document.getElementById("password-login");
const emailErrorLogin =document.querySelector('.error__email-login');
const passwordErrorLogin = document.querySelector('.error__pass-login');
const submitLogin = document.getElementById("submit-login");

function checkEmailLogin() {
    if (emailLogin.value.trim() === "") {
        emailErrorLogin.textContent = "Please enter your email address";
        emailErrorLogin.classList.add('show-error');
        return false;
    } else if (!emailPatternLogin.test(emailLogin.value)) {
        emailErrorLogin.textContent = "Please enter a valid email address";
        emailErrorLogin.classList.add('show-error');
        return false;
    } else {
        emailErrorLogin.textContent = "";
        emailErrorLogin.classList.remove('show-error');
    }
    return true;
}
function checkEmailPassword() {
    if (passwordLogin.value.trim() === "") {
        passwordErrorLogin.textContent = "Please enter a password";
        passwordErrorLogin.classList.add('show-error');
        document.querySelector('.user-pass__remember').classList.add('tobottom');
        return false;
    } else {
        passwordErrorLogin.textContent = "";
        passwordErrorLogin.classList.remove('show-error');
    }
    return true;
}


submitLogin.addEventListener("click", () => {
    checkEmailLogin();
    checkEmailPassword();
    if (checkEmailLogin() && checkEmailPassword()) {
        // send a form 
    }

});