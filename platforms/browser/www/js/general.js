function utoa(str) {

    return window.btoa(str);
}

function saveInClient(key,value) {

    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem(key, value);
    } 
}

function logOut() {

    localStorage.removeItem("nano");
    window.location.href = 'index.html';
}