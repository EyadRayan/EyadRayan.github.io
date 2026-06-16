const button = document.getElementById("submit");
const password = document.getElementById("pass");
const cnfrmpass = document.getElementById("cnfrmpass");
const email = document.getElementById("email")
const username = document.getElementById("username")
const form = document.getElementById("user_input")

form.addEventListener('submit', (e) => {
    const errorElement = document.getElementById("error")
    const passwords = document.getElementById("pass") && document.getElementById("cnfrmpass");

    let messages = []

    if (email.value === '' || email.value == null) {
        messages.push('Email is required')
    }

    if (username.value === '' || username.value == null) {
        messages.push('Username is required')
    }

    if (password.value == '' || password.value == null) {
        messages.push('Password is required')
    } else if (passwords.value.length < 6 || passwords.value.length > 20) {
        messages.push('Password must be 6 to 20 characters')
    }

    if (password.value !== cnfrmpass.value) {
        messages.push(`Passwords do not match`)
    }

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    }


})
