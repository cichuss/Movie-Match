function registerUser(username, password, email) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            const userData = data.data['api::app-user.app-user'];

            for (const id in userData) {
                const user = userData[id];
                if (user.Username === username) {
                    console.error('The username is already taken.');
                    return;
                }
            }
            const newUserId = Object.keys(userData).length + 1;
            const newUser = {
                "id": newUserId,
                "Username": username,
                "Password": password,
                "Email": email,
                "createdAt": "2024-03-21T09:54:46.382Z",
                "updatedAt": "2024-03-24T14:46:57.841Z",
                "publishedAt": "2024-03-21T09:54:58.260Z",
                "createdBy": null,
                "updatedBy": null
            };
            userData[newUserId] = newUser;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../strapi/export_from_strapi.json", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log('The user was successfully registered.');
                    redirectToIndex();
                }
            };
            xhr.send(JSON.stringify(data));
        }
    };
    xhttp.open("GET", "../strapi/export_from_strapi.json", true);
    xhttp.send();
}

function register() {
    var userNameForm = document.querySelector('.login-input-username').value;
    var passwordForm = document.querySelector('.login-input-pwd').value;
    var confirmPassword = document.querySelector('.login-input-confirm-pwd').value;
    var email = document.querySelector('.login-input-email').value;

    console.log(userNameForm);
    console.log(passwordForm);
    console.log(confirmPassword);
    console.log(email);
    if (passwordForm===confirmPassword) {
        registerUser(userNameForm, passwordForm, email);
    } else {
        document.querySelector('.error-message').innerHTML = "The passwords do not match.";
    }
}