/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const API_KEY = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';
const BASE_PATH = 'https://api.giphy.com/v1/gifs';

// VARS TOGGLE MENU
const menuHamburgesa = document.getElementById('menu-hamburgesa');
const toggleButton = document.getElementById('toggleDarkMode');
const showClose = document.querySelector('.menu-toggle');
const menuReferencia = document.getElementById('menu-links');

// VARS SEARCH
const searchInput = document.getElementById('search-input');
let terminoBusqueda = '';
let nextPage = 0;

// VARS OPEN Suggestions
const openSuggestions = document.getElementById('list-suggestions');
const openSuggestionsHr = document.querySelector('.search-gif-suggestions hr');
const textBottomSearchInput = document.querySelector('.search-gif-text');
const addLupa = document.querySelector('div .search-gif-input');
const suggestionList = document.getElementById('list-suggestions');

// VARS RESULTS
const verMasBtn = document.getElementById('ver-mas-btn');

// VARS Click Info Image
const listaImages = document.getElementById('search-results-api');

// VARS TRENDING
let offsetSelector = 0;
let leftButton = document.getElementById('buttonLeft');
let rightButton = document.getElementById('buttonRight');
const galleryTrending = document.getElementById('gallery-trending');

if (offsetSelector === 0) {
  leftButton.style.visibility = 'hidden';
}

/***************************************************************************/
/* SET THEME */
/***************************************************************************/
let setTheme = localStorage.getItem('themeMode');
setTheme = setTheme ? setTheme : 'lightTheme';

if (setTheme === 'darkTheme') {
  document.body.classList.toggle('darkTheme');
} else {
  document.body.classList.remove('darkTheme');
}

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
/***************************************************************************/
/* FIN SET THEME */
/***************************************************************************/

/***************************************************************************/
/* MENÚ NAVEGACIÓN */
/***************************************************************************/
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
    }
    // else if (menuItem[index].href === 'javascript:void(0)') {
    //   menuItem[index].className = 'active';
    // }
  }
}
/***************************************************************************/
/* FIN MENÚ NAVEGACIÓN */
/***************************************************************************/

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
/***************************************************************************/
/* FIN TOGGLE MENU */
/***************************************************************************/

// Probando evento resize
// window.addEventListener('resize', function () {
//   const menuReferencia = document.getElementById('menu-links');
//   if (window.innerWidth > 991) {
//     menuReferencia.classList.add('showMenu');
//   } else {
//     menuReferencia.classList.remove('showMenu');
//   }
// });

/***************************************************************************/
/* SEARCH */
/***************************************************************************/
searchInput.addEventListener('keyup', (event) => {
  terminoBusqueda = searchInput.value;
  if (event.code !== 'Enter') {
    terminoBusqueda.length > 0 ? getApiSuggestions(terminoBusqueda) : clearSearch();
  }
});

// ENTER EN INPUT
searchInput.addEventListener('keypress', enterKey);
function enterKey(e) {
  // console.log(e.code);
  if (e.code === 'Enter') {
    terminoBusqueda = searchInput.value;
    getSearchApi(terminoBusqueda, nextPage);
  }
}

// GET RESULTADOS POR TÉRMINO DE BÚSQUEDA
const searchBtn = document.getElementById('btn-search');
searchBtn.addEventListener('click', async () => {
  if (terminoBusqueda.length > 0) {
    // nextPage++;
    // TODO: CAMBIAR LUPA POR ICONO X
    // TODO: Limpiar Búsqueda
    await clearSearch(terminoBusqueda, nextPage);
  }
});

/***************************************************************************/
/* FIN SEARCH */
/***************************************************************************/

/***************************************************************************/
/* VER MÁS */
/***************************************************************************/
verMasBtn.addEventListener('click', () => {
  // nextPage++;
  getSearchApi(terminoBusqueda, nextPage);
});

/***************************************************************************/
/* FIN VER MÁS */
/***************************************************************************/

/***************************************************************************/
/* CLICK INFO IMAGE */
/***************************************************************************/
listaImages.addEventListener('click', (e) => {
  console.log(e.target.attributes);
  console.log(e.target.getAttribute('src'));
  console.log(e.target.getAttribute('alt'));
});
/***************************************************************************/
/* FIN CLICK INFO IMAGE */
/***************************************************************************/

/***************************************************************************/
/**********************************  API´S  ********************************/
/***************************************************************************/

/***************************************************************************/
/* SEARCH API */
/***************************************************************************/
const getSearchApi = (termino, offset) => {
  // offset.toString();

  const title = document.getElementById('title-result');
  title.innerHTML = termino;

  // API
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${termino}&limit=12&offset=${offset}&rating=g&lang=en`;

  fetch(API_URL)
    .then((data) => data.json())
    .then((resp) => {
      // console.log(resp.data);
      const result = resp.data;
      // TODO: SUBIR VARIABLES
      const boxResult = document.querySelector('.search-results');
      const element = document.getElementById('search-results-api');
      boxResult.style.display = 'block';
      textBottomSearchInput.style.display = 'none';

      element.innerHTML = '';

      if (result.length > 0) {
        // OPCIÓN 1
        result.map((item) => {
          return (element.innerHTML += `
          <div class="gallery-result-item" id="${item.id}" >
            <img src="${item.images.original.url}" alt="${item.title}" />
          </div>
        `);
        });

        nextPage += 12;
        textBottomSearchInput.style.display = 'block';

        // OPCIÓN 2
        // const miResultado = result.map((item) => {
        //   return `<div class="gallery-result-item" id="${item.id}" onclick="${openImage(item.id)}">
        //           <img src="${item.images.original.url}" alt="${item.title}" />
        //         </div>`;
        // });
        // element.innerHTML = miResultado.join('');

        // Opción 3
        // const miResultado = result.map(renderItem).join('');
        // element.innerHTML = miResultado;
      } else {
        boxResult.style.display = 'none';
        textBottomSearchInput.style.display = 'block';
        element.innerHTML = '<p>Sin Resultados</p>';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// OPCION 3 - miResultado
// const renderItem = (item) => {
//   return `
//      <div class="gallery-result-item" id="${item.id}" onclick="${openImage(item.id)}">
//        <img src="${item.images.original.url}" alt="${item.title}" />
//      </div>
//   `;
// };

/***************************************************************************/
/* Suggestions API */
/***************************************************************************/
const getApiSuggestions = (termino) => {
  newSuggest(termino)
    .then((resp) => {
      const result = resp.data;
      // console.log(result);
      textBottomSearchInput.style.display = 'none';
      // Limpiar Sugerencias
      suggestionList.textContent = '';

      // Abrir Listado de Sugerencias
      openSuggestions.classList.add('open-suggestions');

      // Muestro tag <hr>
      openSuggestionsHr.style.display = 'block';

      // ADD CLASS
      addLupa.classList.add('add-lupa');

      if (result.length > 0) {
        result.map((suggestedTerm) => {
          // console.log('suggestedTerm:: ', suggestedTerm);

          // CREA e INSETAR HTML
          let list = document.createElement('li');
          spanTextSuggestion = document.createElement('span');
          spanTextSuggestion.innerHTML = suggestedTerm.name;
          suggestionList.appendChild(list).appendChild(spanTextSuggestion);

          // CLICK a la Sugerencia
          list.addEventListener('click', function () {
            terminoBusqueda = suggestedTerm.name;
            showSuggestions();
          });
          // iconSearchActive.removeEventListener('click', showSuggestions);
          // iconSearchActive.addEventListener('click', showSuggestions);
        });
      } else {
        // element.innerHTML = '<p>Sin Resultados</p>';
        openSuggestions.classList.remove('open-suggestions');
        openSuggestionsHr.style.display = 'none';
        textBottomSearchInput.style.display = 'block';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

async function newSuggest(term) {
  const API_URL = `https://api.giphy.com/v1/tags/related/${term}?api_key=${API_KEY}&limit=4`;
  let response = await fetch(API_URL);
  let suggestions = await response.json();
  return suggestions;
}

const showSuggestions = () => {
  clearSearch();
  searchInput.value = terminoBusqueda;
  searchInput.focus();
  getSearchApi(searchInput.value, nextPage);
};

/***************************************************************************/
/* FIN Suggestions API */
/***************************************************************************/

/***************************************************************************/
/* TRENDING */
/***************************************************************************/
// var touchstartX = 0;
// var touchstartY = 0;
// var touchendX = 0;
// var touchendY = 0;

// galleryTrending.addEventListener(
//   'touchstart',
//   function (event) {
//     touchstartX = event.screenX;
//     touchstartY = event.screenY;
//   },
//   false
// );

// galleryTrending.addEventListener(
//   'touchend',
//   function (event) {
//     touchendX = event.screenX;
//     touchendY = event.screenY;
//     handleGesure();
//   },
//   false
// );

// function handleGesure() {
//   var swiped = 'swiped: ';
//   if (touchendX < touchstartX) {
//     alert(swiped + 'left!');
//   }
//   if (touchendX > touchstartX) {
//     alert(swiped + 'right!');
//   }
//   if (touchendY < touchstartY) {
//     alert(swiped + 'down!');
//   }
//   if (touchendY > touchstartY) {
//     alert(swiped + 'left!');
//   }
//   if (touchendY == touchstartY) {
//     alert('tap!');
//   }
// }

galleryTrending.addEventListener('touchstart', handleTouchStart, false);
galleryTrending.addEventListener('touchmove', handleTouchMove, false);
galleryTrending.addEventListener('scroll', handleScrollHorizontal, false);

let xDown = null;
let yDown = null;
let sizeHorizontal = 0;

function handleScrollHorizontal(e) {
  sizeHorizontal = e.currentTarget.scrollLeft;
  console.log(sizeHorizontal);
}

function getTouches(e) {
  // console.log(e.touches);
  return e.touches; // browser API
}

function handleTouchStart(e) {
  // console.log(e);
  const firstTouch = getTouches(e)[0];
  // console.log(firstTouch);
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(e) {
  // console.log(e);
  if (!xDown || !yDown) {
    return;
  }

  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // console.log(window.innerWidth);
    // console.log(window.outerWidth);
    // console.log(galleryTrending.clientWidth);

    /*most significant*/
    if (xDiff > 15 && sizeHorizontal === 459) {
      /* left swipe */
      console.log('left swipe', xDiff);
      console.log('size horizontal', sizeHorizontal);
      slideToRight();
    } else if (xDiff < -15 && sizeHorizontal === 0) {
      console.log('right swipe', xDiff);
      console.log('size horizontal', sizeHorizontal);
      slideToLeft();
    }

    // else {
    //   /* right swipe */
    //   console.log('right swipe', xDiff);
    //   // slideToLeft();
    // }
  }
  // else {
  //   if (yDiff > 0) {
  //     /* up swipe */
  //     console.log('up swipe');
  //   } else {
  //     /* down swipe */
  //     console.log('down swipe');
  //   }
  // }
  /* reset values */
  xDown = null;
  yDown = null;

  e.preventDefault();
}

//
const showTrending = (offset) => {
  // trending(3, offsetSelector).then((resp) => {
  if (offset >= 0) {
    trending(3, offset).then((resp) => {
      const result = resp.data;
      // console.log(result);

      galleryTrending.textContent = '';

      if (result.length > 0) {
        result.map((item) => {
          return (galleryTrending.innerHTML += `
          <div class="gallery-item">
            <img class="img-item-share" src="${item.images.preview_gif.url}" alt="${item.title}" />
  
            <div class="gallery-items-share">
              <div class="share-icons">
                <img class="icon-favorite" alt="" />
                <img class="icon-download" alt="" />
                <img class="icon-maximize" alt="" />
              </div>
  
              <div class="share-text">
                <h5>${item.user === undefined ? 'Usuario Desconocido' : item.user.display_name}</h5>
                <h3>${item.title}</h3>
              </div>
            </div>
            </div>
          `);
        });
      }
    });
  }
};

const trending = async (limit, offset) => {
  let urlBase = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`;
  let response = await fetch(urlBase);
  let results = await response.json();
  return results;
};

showTrending(offsetSelector);

const slideToLeft = () => {
  Math.sign(offsetSelector);
  // console.log(Math.sign(offsetSelector));
  // if (offsetSelector > 0)
  // console.log(offsetSelector);

  if (offsetSelector <= 1) {
    leftButton.style.visibility = 'hidden';
  }

  if (Math.sign(offsetSelector) > 0) {
    rightButton.classList.remove('active');
    offsetSelector -= 1;
    showTrending(offsetSelector);
    leftButton.classList.add('active');
  } else {
    offsetSelector = 0;
    leftButton.style.visibility = 'hidden';
  }
};

const slideToRight = () => {
  leftButton.style.visibility = 'visible';
  leftButton.classList.remove('active');
  offsetSelector += 1;
  showTrending(offsetSelector);
  rightButton.classList.add('active');
};

leftButton.addEventListener('click', slideToLeft);
rightButton.addEventListener('click', slideToRight);
/***************************************************************************/
/* FIN TRENDING */
/***************************************************************************/

/***************************************************************************/
/* Clear Search */
/***************************************************************************/
const clearSearch = () => {
  searchInput.value = '';
  openSuggestions.classList.remove('open-suggestions');
  openSuggestionsHr.style.display = 'none';
  textBottomSearchInput.style.display = 'block';
  addLupa.classList.remove('add-lupa');
  nextPage = 0;
};
/***************************************************************************/
/* FIN Clear Search */
/***************************************************************************/

// const openImage = (e) => {
//   e.preventDefault();
// };

// https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20
// https://api.giphy.com/v1/tags/related/?api_key=${API_KEY}&limit=20
// api.giphy.com/v1/gifs/search/tags

// API TRENDING
// const API_URL = `/${BASE_PATH}trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`;
