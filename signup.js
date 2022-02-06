// show password function

function showPass() {
    document.getElementById('exampleInputPassword1').type = "text"
    let showButton = document.getElementById('exampleCheck1')
    let typePassword = document.getElementById('exampleInputPassword1')
    let cfPassword = document.getElementById('exampleInputPassword2')

    if (showButton.checked) {
        typePassword.type = "text"
        cfPassword.type = "text"
    } else {
        typePassword.type = "password"
        cfPassword.type = "password"
    }
}

// sign up form

let signUpForm = document.getElementById('signUpform')

let users = []
let userFormLocal = JSON.parse(localStorage.getItem("users"))
if (userFormLocal) {
    users = userFormLocal
}

signUpForm.onsubmit = (e) => {
    e.preventDefault()
    let email = signUpForm.email.value
    let password  = signUpForm.password.value
    let cfPassword = signUpForm.confirmPassword.value

    setTextErr("#emailErr", "")
    setTextErr("#passwordErr", "")
    setTextErr("#confirmPasswordErr", "")
    console.log(email, password, cfPassword);
    
    let validate = true

    if (!email) {
        setTextErr("#emailErr", "Email is required")
        validate = false
    }
    for (let i = 0; i < users.length; i++) {
        if (email == users[i].email) {
            setTextErr("#emailErr", "This email is already associated with an account")
            validate = false
        }
    }
    if (!password) {
        setTextErr("#passwordErr", "Password is required")
        validate = false
    }
    if (!cfPassword) {
        setTextErr("#confirmPasswordErr", "Confirm password is required")
        validate = false
    }
    if (password.length < 6) {
        setTextErr("#passwordErr", "Password must be at least 6 characters")
        validate = false
    } else {
        if (cfPassword != password) {
            setTextErr("#confirmPasswordErr", "Password does not match")
            validate = false
        }
    }
    if (validate) {
        let user = {
            email: email,
            password: password,
        }
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))
        open ("./genre.html", "_parent")
    }
}

let setTextErr = (query, content) => {
    document.querySelector(query).innerHTML = content
}

