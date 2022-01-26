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


// sign in form

let signInForm = document.getElementById('signInform')


console.log(signInForm);
signInForm.onsubmit = (e) => {
    e.preventDefault()

    let email = signInForm.email.value
    let password = signInForm.password.value

    console.log(email, password);

    localUsers = JSON.parse(localStorage.getItem("users"))
    checkAccount("#checkAccount", " ")
    for (let i = 0; i < localUsers.length; i++) {
        if (email == localUsers[i].email && password == localUsers[i].password) {
            open ("./genre.html", "_parent")
            break
        } else {
            checkAccount("#checkAccount", "We cannot find an account with that email address")
        }
    }
}

let checkAccount = (query, content) => {
    document.querySelector(query).innerHTML = content
}