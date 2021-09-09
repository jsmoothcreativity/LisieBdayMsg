const menu = document.querySelector('#menu');
const openMenu = document.querySelector('#openMenu');


openMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
});


