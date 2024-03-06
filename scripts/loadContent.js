
document.addEventListener('DOMContentLoaded', init);

function init() {
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
            console.error('Wystąpił błąd podczas wczytywania zawartości:', error);
        });
}
