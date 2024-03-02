document.addEventListener("DOMContentLoaded", function() {
    fetch('../menu/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu').innerHTML = data;
        });
});