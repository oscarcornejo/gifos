/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const API_KEY = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';
const BASE_PATH = 'https://api.giphy.com/v1/gifs';

// TOGGLE MENU
const toggleButton = document.getElementById('toggleDarkMode');

// SEARCH
const searchInput = document.getElementById('search-input');
let terminoBusqueda = '';
let nextPage = 0;

// OPEN Suggestions
const openSuggestions = document.getElementById('list-suggestions');
const openSuggestionsHr = document.querySelector('.search-gif-suggestions hr');
const textBottomSearchInput = document.querySelector('.search-gif-text');

// RESULTS
const verMasBtn = document.getElementById('ver-mas-btn');

// Click Info Image
const listaImages = document.getElementById('search-results-api');

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
/* TOGGLE MENU */
/***************************************************************************/
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
searchInput.addEventListener('keyup', () => {
  terminoBusqueda = searchInput.value;
  console.log(terminoBusqueda);
  terminoBusqueda.length > 0 ? getApiSuggestions(terminoBusqueda) : clearSearch();
});

// GET RESULTADOS POR TÉRMINO DE BÚSQUEDA
const searchBtn = document.getElementById('btn-search');
searchBtn.addEventListener('click', async () => {
  if (terminoBusqueda.length > 0) {
    // nextPage++;
    await getSearchApi(terminoBusqueda, nextPage);
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
  offset.toString();

  const title = document.getElementById('title-result');
  title.innerHTML = termino;

  // API
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${termino}&limit=12&offset=${offset}&rating=g&lang=en`;

  fetch(API_URL)
    .then((data) => data.json())
    .then((resp) => {
      console.log(resp.data);
      const result = resp.data;
      const boxResult = document.querySelector('.search-results');
      boxResult.style.display = 'block';
      textBottomSearchInput.style.display = 'none';

      const element = document.getElementById('search-results-api');

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
      textBottomSearchInput.style.display = 'none';
      const suggestionList = document.getElementById('list-suggestions');
      suggestionList.textContent = '';
      const result = resp.data;
      console.log(result);

      openSuggestions.classList.add('open-suggestions');
      openSuggestionsHr.style.display = 'block';

      if (result.length > 0) {
        // result.map((item) => {
        //   return (openSuggestions.innerHTML += `
        //   <li>
        //     <span>${item.name}</span>
        //   </li>
        // `);
        // });

        result.map((suggestedTerm) => {
          let list = document.createElement('li');
          spanTextSuggestion = document.createElement('span');
          spanTextSuggestion.innerHTML = suggestedTerm.name;
          suggestionList.appendChild(list).appendChild(spanTextSuggestion);
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
};

/***************************************************************************/
/* FIN Suggestions API */
/***************************************************************************/

/***************************************************************************/
/* Clear Search */
/***************************************************************************/
const clearSearch = () => {
  searchInput.value = '';
  openSuggestions.classList.remove('open-suggestions');
  openSuggestionsHr.style.display = 'none';
  textBottomSearchInput.style.display = 'block';
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
