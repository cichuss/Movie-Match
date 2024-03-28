function redirectToLandingPage() {
    window.location.href = '../landing-page/landing-page.html';
}

function redirectToLogin() {
    window.location.href = '../login-page/login.html';
}

function redirectToLiked(loadData) {
    function combinedCallback() {
        loadPosters();
        if(typeof loadData ==='function' && loadData() != null){
            loadData();
        }
    }
    loadContent('../liked-movies-page/liked.html', 'home-container', combinedCallback);
}

function redirectToIndex() {
    window.location.href = '../home-page/index.html';
}
function redirectToHome() {
    loadContent('../home-page/home.html', 'home-container', loadMovieData);
}

function redirectToShake() {
    loadContent('../shake-page/shake.html', 'home-container', loadMovieData);
}

function redirectToConnect() {
    loadContent('../connect-page/connect.html', 'home-container', loadConnectMovieData);
}
function redirectToRegister() {
    window.location.href = '../register-page/register.html';
}


