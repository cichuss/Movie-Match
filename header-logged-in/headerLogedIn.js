document.addEventListener("DOMContentLoaded", function() {
    fetch('headerLogedIn.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });
});

