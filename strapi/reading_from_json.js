

function loadMovieData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            //console.log(data);
            const moviesData = data.data['api::movie.movie'];
            const movieTitle = moviesData[5]?.Title ?? 'Film o takim ID nie został znaleziony.';
            document.querySelector('.home-text2').innerHTML = movieTitle;
        }
    };
    xhttp.open("GET", "http://127.0.0.1:8080/export_from_strapi.json", true);
    xhttp.send();
}




