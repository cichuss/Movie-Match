function loadMovieData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            //console.log(data);
            const moviesData = data.data['api::movie.movie'];
            const movieTitle = moviesData[5]?.Title ?? 'Film o takim ID nie został znaleziony.';
            const movieDescription = moviesData[5]?.Description ?? 'Film o takim ID nie został znaleziony.';
            document.querySelector('.title').innerHTML = movieTitle;
            document.querySelector('.description').innerHTML = movieDescription;
        }
    };
    xhttp.open("GET", "http://127.0.0.1:8080/export_from_strapi.json", true);
    xhttp.send();
}

function loadUserData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            //console.log(data);
            const userData = data.data['api::app-user.app-user'];
            const userName = userData[1]?.Username ?? 'Film o takim ID nie został znaleziony.';
            document.querySelector('.rounded-button-user-name').innerHTML = userName;
        }
    };
    xhttp.open("GET", "http://127.0.0.1:8080/export_from_strapi.json", true);
    xhttp.send();
}

function checkPassword() {
    var passwordForm = document.querySelector('.login-input-pwd').value;
    var userNameForm = document.querySelector('.login-input-username').value;
    findPasswordByUsername(userNameForm)
        .then(password => {
            console.log(passwordForm);
            console.log(password);
            console.log(userNameForm);
            if (password === passwordForm) {
                redirectToIndex()
            } else {
                document.querySelector('.error-message').innerHTML = "Incorrect username or password";
            }
        })
        .catch(error => {
            document.querySelector('.error-message').innerHTML = "The user doesn't exist";
        });
}

function findPasswordByUsername(username) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                const userData = data.data['api::app-user.app-user'];
                for (const id in userData) {
                    const user = userData[id];
                    if (user.Username === username) {
                        resolve(user.Password);
                        return;
                    }
                }
                reject('The user does not exist.');
            }
        };
        xhttp.open("GET", "http://127.0.0.1:8080/export_from_strapi.json", true);
        xhttp.send();
    });
}


