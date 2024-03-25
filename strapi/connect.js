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
            redirectToLiked(printUsername);
        })
        .catch(error => {
            document.querySelector('.error-message').innerHTML = "The user doesn't exist";
        });
}
function printUsername() {
    document.querySelector('.connect-text').innerHTML = "Connected to user: Magda";
}
function loadConnectMovieData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            const moviesData = data.data['api::movie.movie'];
            const photoId1 = moviesData[3]?.photoUrl?? 1;
            console.log(photoId1);
            displayPhoto(data, photoId1, '.connect-poster01 img');
            console.log(photoId1);
            const photoId2 = moviesData[4]?.photoUrl?? 1;
            displayPhoto(data, photoId2, '.connect-poster04 img');
            const photoId3 = moviesData[5]?.photoUrl?? 1;
            displayPhoto(data, photoId3, '.connect-poster05 img');
            const photoId4 = moviesData[6]?.photoUrl?? 1;
            displayPhoto(data, photoId4, '.connect-poster08 img');
        }
    };
    xhttp.open("GET", "../strapi/export_from_strapi.json", true);
    xhttp.send();
}
function displayPhoto(data, photoId, selector){
    const photoData = data.data['plugin::upload.file'];
    const moviePhoto = photoData[photoId];
    console.log(moviePhoto);
    if (moviePhoto) {
        const posterImage = document.querySelector(selector);
        posterImage.src = `../img/posters/${moviePhoto.name}`;
    } else {
        console.error('No photo found for movie ID:', photoId);
    }
}
