window.addEventListener('DOMContentLoaded', init);
function init() {
    loadContent('../home-page/home.html', 'home-container');
    loadContent('../menu/menu.html', 'menu');
    loadContent('../header/header.html', 'header');
    loadContent('../footer/footer.html', 'footer');
}

function loadContent(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}
