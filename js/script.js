const menuMobile = document.querySelector('#menu-mobile');
const overlay = document.querySelector('#overlay');

const show = (elem) => {
    return function() {
        elem.classList.add('visible');
        elem.classList.remove('hidden');
    }
}

const hide = (elem) => {
    return function() {
        elem.classList.add('hidden');
        elem.classList.remove('visible');
    }
}

document.querySelector('#toggle-mobile').addEventListener('click', show(overlay));
document.querySelector('#toggle-mobile').addEventListener('click', show(menuMobile));

document.querySelector('#hide-menu').addEventListener('click', hide(overlay));
document.querySelector('#hide-menu').addEventListener('click', hide(menuMobile));