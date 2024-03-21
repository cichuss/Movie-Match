function loginUser(identifier, password) {

    axios.post('http://localhost:1337/api/auth/local', {
        identifier: identifier,
        password: password,
    })
        .then(response => {
            console.log('Well done!');
            console.log('User profile', response.data.user.username);
            console.log('User token', response.data.jwt);
            SetNickname(response.data.user.username);
            //redirectToIndex();
        })
        .catch(error => {
            console.log(identifier)
            console.log('An error occurred:', error.response);
        });
}


// function GetUsers(){
//     fetch('http://localhost:1337/api/app-users')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             GetNickname(data);
//         })
//         .catch(error => {
//             console.error('Wystąpił błąd:', error);
//         });
// }
// GetUsers();
// function  GetNickname(data){
//     let firstUserNickName = data.data[1].attributes.Username;
//     console.log(firstUserNickName);
//     document.querySelector('.rounded-button-user-name').innerHTML = firstUserNickName;
// }

function SetNickname(UserName) {
    console.log(UserName);
    document.querySelector('.rounded-button-user-name').innerHTML = UserName;
}

//SetNickname("Karol");


function login(){
    const usernameInput = document.querySelector('.login-input-username');
    const passwordInput = document.querySelector('.login-input-pwd');
    console.log(usernameInput.value)
    loginUser(usernameInput.value, passwordInput.value)

}


function displayUser(user) {
    console.log(user);
}

function checkForUserByUserName(UserName){
    const UserReq = new Request(`http://localhost:1337/api/app-users?filters[Username][$eq]=${UserName}`);
    fetch(UserReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(displayUser)
    //.catch(showMissingArticleMsg);
}

