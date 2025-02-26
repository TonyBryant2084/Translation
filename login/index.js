const container = document.getElementsByClassName('container')[0];
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');

signUp.onclick = function () {
    container.classList.add('active');
}
signIn.onclick = function () {
    container.classList.remove('active');
    window.location.assign('https://github.com/catiky/translate-travel');
}