// SET VARIABLES
const API_KEY = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';
const BASE_PATH = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;

const menuReferencia = document.getElementById('menu-links');
const toggleButton = document.getElementById('toggleDarkMode');

//  SET THEME
let setTheme = localStorage.getItem('themeMode');
setTheme = setTheme ? setTheme : 'lightTheme';

if (setTheme === 'darkTheme') {
  document.body.classList.toggle('darkTheme');
  toggleButton.innerHTML = `Modo Diurno`;
} else {
  document.body.classList.remove('darkTheme');
  toggleButton.innerHTML = `Modo Nocturno`;
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('darkTheme');
  if (setTheme === 'lightTheme') {
    setTheme = 'darkTheme';
    toggleButton.innerHTML = `Modo Diurno`;
  } else {
    setTheme = 'lightTheme';
    toggleButton.innerHTML = `Modo Nocturno`;
  }
  localStorage.setItem('themeMode', setTheme);
});

// Toggle Menu
function toggleMenu() {
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

setNavigation();

function setNavigation() {
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
    } else if (menuItem[index].href === 'javascript:void(0)') {
      menuItem[index].className = 'active';
    }
  }

  // var btns = menuReferencia.querySelectorAll('li a');

  // btns.forEach((element, i) => {
  //   console.log(element);

  //   // if (element.childNodes[0].nodeValue === 'Favoritos') {
  //   //   element.classList.add('active');
  //   // } else if (element.childNodes[0].nodeValue === 'Mis GIFOS') {
  //   //   element.classList.add('active');
  //   // } else {
  //   //   element.classList.remove('active');
  //   // }

  //   const pathName = path.split('/')[1].split('.')[0];
  //   const liTagName = element.childNodes[0].nodeValue.toLowerCase();

  //   console.log('pathName: ', pathName);
  //   console.log('liTagName::', liTagName);

  //   // if (href === 'javascript:void(0)') {
  //   //   element.classList.add('active');
  //   // } else

  //   if (pathName === liTagName) {
  //     element.classList.add('active');
  //   } else if (pathName === 'mis-gifos') {
  //     element.classList.add('active');
  //   } else {
  //     element.classList.remove('active');
  //   }

  //   element.addEventListener('click', function (e) {
  //     console.log('className:: ', e.target.textContent);
  //     console.log('className:: ', e.target.className);

  //     console.log('pathName: ', pathName);
  //     console.log('liTagName::', liTagName);

  //     if (e.target.className === 'active') {
  //       element.classList.remove('active');
  //     }

  //     var href = element.getAttribute('href');
  //     console.log(href);
  //     console.log(path);
  //     console.log(path.substring(0, href.length));

  //     // else if (path.substring(0, href.length) === href) {
  //     //   element.classList.add('active');
  //     // }

  //     if (pathName === liTagName) {
  //       element.classList.add('active');
  //     } else if (pathName === 'mis-gifos') {
  //       element.classList.add('active');
  //     } else {
  //       element.classList.remove('active');
  //     }
  //   });
  // });

  // for (var i = 0; i < btns.length; i++) {
  //   console.log(btns[i]);
  //   btns[i].addEventListener('click', function () {
  //     var current = document.getElementsByClassName('active');
  //     if (current.length > 0) {
  //       current[0].className = current[0].className.replace(' active', '');
  //     }
  //     this.className += ' active';
  //   });
  // }
}
