window.addEventListener('DOMContentLoaded', init);
function init() {
    loadContent('../home-page/home.html', 'home-container');
    loadContent('../menu/menu.html', 'menu');
    loadContent('../header/header.html', 'header', loadUserData);
    loadContent('../footer/footer.html', 'footer');
}

function loadContent(url, targetId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}


