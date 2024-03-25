function findUserByUsername(username) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                const userData = data.data['api::app-user.app-user'];
                for (const id in userData) {
                    const user = userData[id];
                    if (user.Username === username) {
                        resolve(user);
                        return;
                    }
                }
                reject('The user does not exist.');
            }
        };
        xhttp.open("GET", "../strapi/export_from_strapi.json", true);
        xhttp.send();
    });
}

function connectToUser() {
    var userNameForm = document.querySelector('.connect-username').value;
    findUserByUsername(userNameForm)
        .then(user => {
            console.log(userNameForm);
            redirectToLiked();
        })
        .catch(error => {
            document.querySelector('.error-message').innerHTML = "The user doesn't exist";
        });
}