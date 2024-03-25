

function loadMovieData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            const moviesData = data.data['api::movie.movie'];
            movieID = getRandomMovieId(moviesData);
            const movieTitle = moviesData[movieID]?.Title ?? 'No movies';
            document.querySelector('.title').innerHTML = movieTitle;
            const movieDescription = moviesData[movieID]?.Description?? "There is no more movies"
            document.querySelector('.description').innerHTML = movieDescription;
            const photoID = moviesData[movieID]?.photoUrl?? 1;
            console.log(movieTitle);
            console.log(movieID);
            displayFoto(data, photoID);
        }
    };
    xhttp.open("GET", "../strapi/export_from_strapi.json", true);
    xhttp.send();
}

function loadUserData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            const userData = data.data['api::app-user.app-user'];
            const userName = userData[1]?.Username ?? 'Film o takim ID nie został znaleziony.';
            document.querySelector('.rounded-button-user-name').innerHTML = userName;
        }
    };
    xhttp.open("GET", "../strapi/export_from_strapi.json", true);
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
        xhttp.open("GET", "../strapi/export_from_strapi.json", true);
        xhttp.send();
    });
}

function getRandomMovieId(moviesData){
    const movieIds = Object.keys(moviesData); // Tworzymy tablicę z kluczami/ID filmów
    const randomIndex = Math.floor(Math.random() * movieIds.length); // Generujemy losowy indeks
    return  movieIds[randomIndex]; // Pobieramy losowe ID filmu
}

function displayFoto(data, photoID){
    const photoData = data.data['plugin::upload.file'];
    const moviePhoto = photoData[photoID];
    if (moviePhoto) {
        const posterImage = document.querySelector('.home-poster img');
        posterImage.src = `../img/posters/${moviePhoto.name}`;
    } else {
        console.error('No photo found for movie ID:', movieID);
    }
}




