/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const menuHamburgesa = document.getElementById('menu-hamburgesa');
const showClose = document.querySelector('.menu-toggle');
const menuReferencia = document.getElementById('menu-links');
const iconCrear = document.getElementById('icon-crear-gif');

iconCrear.setAttribute('class', 'icon-crear-gif-img');

console.log(location.history);

/***************************************************************************/
/* MENÚ NAVEGACIÓN */
/***************************************************************************/

const setNavigation = () => {
  // var path = window.location.pathname;
  // path = path.replace(/\/$/, '');
  // path = decodeURIComponent(path);

  const currentLocation = location.href;
  const menuItem = document.querySelectorAll('li a');
  const menuLength = menuItem.length;

  for (let index = 0; index < menuLength; index++) {
    // console.log(menuItem[index]);
    // console.log(menuItem[index].href);
    if (menuItem[index].href === currentLocation) {
      menuItem[index].className = 'active';
    }
    // else if (menuItem[index].href === 'javascript:void(0)') {
    //   menuItem[index].className = 'active';
    // }
  }
};

setNavigation();

/***************************************************************************/
/* TOGGLE MENU */
/***************************************************************************/
function toggleMenu() {
  menuReferencia.classList.toggle('showMenu');
  showClose.classList.toggle('show-close');
}

menuHamburgesa.addEventListener('click', toggleMenu);

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector('header').classList.add('sticky');
  } else {
    document.querySelector('header').classList.remove('sticky');
  }
}
