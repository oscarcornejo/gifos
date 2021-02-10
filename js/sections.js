// SET VARIABLES
const API_KEY = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';
const BASE_PATH = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;

//  SET THEME
let setTheme = localStorage.getItem('themeMode');
setTheme = setTheme ? setTheme : 'lightTheme';

if (setTheme === 'darkTheme') {
  document.body.classList.toggle('darkTheme');
} else {
  document.body.classList.remove('darkTheme');
}

const toggleButton = document.getElementById('toggleDarkMode');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('darkTheme');

  if (setTheme === 'lightTheme') {
    setTheme = 'darkTheme';
  } else {
    setTheme = 'lightTheme';
  }

  localStorage.setItem('themeMode', setTheme);

  // localStorage.removeItem('darkTheme');
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
