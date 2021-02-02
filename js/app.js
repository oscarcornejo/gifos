//  SET THEME
let setTheme;
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.toggle('darkTheme');
  setTheme = true;
} else {
  setTheme = false;
}

const toggleButton = document.getElementById('toggleDarkMode');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('darkTheme');
  // localStorage.removeItem('darkMode');
  localStorage.setItem('darkMode', !setTheme);
  setTheme = !setTheme;
});

// Toggle Menu
function toggleMenu() {
  const menuReferencia = document.getElementById('menu-links');
  const showClose = document.querySelector('.menu-toggle');
  menuReferencia.classList.toggle('showMenu');
  showClose.classList.toggle('show-close');
}

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

// Probando evento resize
// window.addEventListener('resize', function () {
//   const menuReferencia = document.getElementById('menu-links');
//   if (window.innerWidth > 991) {
//     menuReferencia.classList.add('showMenu');
//   } else {
//     menuReferencia.classList.remove('showMenu');
//   }
// });
