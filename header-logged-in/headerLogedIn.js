document.addEventListener("DOMContentLoaded", function() {
    fetch('../header-logged-in/headerLogedIn.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });
});

