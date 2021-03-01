/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const BASE_PATH = 'https://api.giphy.com/v1/gifs';
const API_KEY = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';

let terminoBusqueda = '';
let pageOffset = 0;
const pageLimit = 12;

// VARS SEARCH
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('btn-search');
const boxResultSearch = document.querySelector('.search-results');
const searchResultsApi = document.getElementById('search-results-api');
const titleResult = document.getElementById('title-result');
const verMasBoxBoton = document.getElementById('ver-mas-box-boton');

// VARS OPEN SUGGESTIONS
const openSuggestions = document.getElementById('list-suggestions');
const openSuggestionsHr = document.querySelector('.search-gif-suggestions hr');
const textBottomSearchInput = document.querySelector('.search-gif-text');
const addLupa = document.querySelector('div .search-gif-input');
const suggestionList = document.getElementById('list-suggestions');

// VARS RESULTS
const verMasBtn = document.getElementById('ver-mas-btn');
const gifsActuales = sessionStorage.removeItem('gifs');

// Trendins Texts
const trendings = document.getElementById('trendings-term');

/***************************************************************************/
/* SEARCH */
/***************************************************************************/
searchInput.addEventListener('keyup', (event) => {
  terminoBusqueda = searchInput.value;
  if (event.code !== 'Enter') {
    if (terminoBusqueda) {
      searchBtn.classList.add('close-boton-search');
    }
    terminoBusqueda.length > 0 ? getApiSuggestions(terminoBusqueda) : clearSearch();
  }
});

// TECLA ENTER PARA SEARCH INPUT
searchInput.addEventListener('keypress', enterKey);
function enterKey(e) {
  if (e.code === 'Enter') {
    terminoBusqueda = searchInput.value;
    getSearchApi(terminoBusqueda, pageOffset);
  }
}

// CLICK EN ÍCONO INPUT SEARCH: LIMPIAR BÚSQUEDA / OBTENER RESULTADOS POR TÉRMINO DE BÚSQUEDA
searchBtn.addEventListener('click', async () => {
  if (terminoBusqueda.length > 0 && searchBtn.classList.contains('close-boton-search')) {
    await clearSearch(terminoBusqueda, pageOffset);
  } else {
    getSearchApi(terminoBusqueda, pageOffset);
  }
});

/***************************************************************************/
/* TRENDINGS TEXTS */
/***************************************************************************/

const getTrendings = () => {
  const urlApi = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}&limit=6`;

  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      const result = data.data;
      if (result.length > 0) {
        result.forEach((item, index) => {
          trendings.innerHTML += `<p>${item}, ${' '}</p> `;
        });
      } else {
        trendings.innerHTML = '';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
getTrendings();

/***************************************************************************/
/* VER MÁS RESULTADOS */
/***************************************************************************/
verMasBtn.addEventListener('click', () => {
  pageOffset = pageOffset + pageLimit;
  getSearchApi(terminoBusqueda, pageOffset);
});

/**************************************************************************************************************/
/*****************************************************  API´S  ************************************************/
/**************************************************************************************************************/

/***************************************************************************/
/* SEARCH API */
/***************************************************************************/
const getSearchApi = (termino, offset) => {
  titleResult.innerHTML = termino;

  fetchSearchApi(termino, offset)
    .then((resp) => {
      const result = resp.data;
      // searchResultsApi.innerHTML = '';

      if (result.length > 0) {
        boxResultSearch.style.display = 'block';
        verMasBoxBoton.style.display = 'block';
        textBottomSearchInput.style.display = 'block';

        result.forEach((item, index) => {
          const img = item.images.original.url;
          const title = item.title;
          const user = item.user?.display_name;

          searchResultsApi.innerHTML += `
            <div class="gallery-result-item" >
              <img id="image-${item.id}" data-user="${item.username}" src="${item.images.original.url}" 
              alt="${item.title}"  />

              <div class="overlay">
                <div class="share-icons">
                  <img id="${item.id}" width="100%" height="100%" class="icon-favorite" alt="" onclick='addFavorito(this)' />
                  
                  <img class="icon-download" alt="" onclick="handleDownload('${img}', '${title}');" />

                  <img class="icon-maximize" alt="" 
                  onclick="openModalGifo('search', '${item.id}', '${img}', '${title}', '${user}');" />
                </div>
    
                <div class="share-text">
                  <h5>${item.user === undefined ? 'Usuario Desconocido' : item.user.display_name}</h5>
                  <h3>${item.title}</h3>
                </div>
              </div>
            </div>
          `;

          const favoriteIcon = searchResultsApi.children[index].childNodes[3].children[0].children[0];
          // console.log(favoriteIcon);

          if (getFavorito(item)) {
            favoriteIcon.classList.add('active');
          }
        });

        pageOffset += 12;
        sessionStorage.setItem(`gifs`, JSON.stringify(result));
      } else {
        // boxResultSearch.style.display = 'none';
        boxResultSearch.style.display = 'block';
        verMasBoxBoton.style.display = 'none';
        textBottomSearchInput.style.display = 'block';
        searchResultsApi.innerHTML = `
          <div class="sin-result">
            <img class="sin-result-icon" src="../assets/images/icon-busqueda-sin-resultado.svg" alt="busqueda-sin-resultado"/>
            <p class="sin-result-text">Intenta con otra búsqueda.</p>
          </div>
       `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearchApi = async (termino, offset) => {
  try {
    const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${termino}&limit=12&offset=${offset}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/***************************************************************************/
/* SUGGESTIONS API */
/***************************************************************************/
const getApiSuggestions = (termino) => {
  newSuggest(termino)
    .then((resp) => {
      const result = resp.data;

      // Limpiar Sugerencias
      suggestionList.textContent = '';

      if (result.length > 0) {
        // Oculta texto
        textBottomSearchInput.style.display = 'none';

        // Abrir Listado de Sugerencias
        openSuggestions.classList.add('open-suggestions');

        // Muestro tag <hr>
        openSuggestionsHr.style.display = 'block';

        // ADD CLASS
        addLupa.classList.add('add-lupa');

        result.map((suggestedTerm) => {
          // CREAR/INSERTAR HTML
          let list = document.createElement('li');
          spanTextSuggestion = document.createElement('span');
          spanTextSuggestion.innerHTML = suggestedTerm.name;
          suggestionList.appendChild(list).appendChild(spanTextSuggestion);

          // CLICK EN LA SUGERENCIA
          list.addEventListener('click', function () {
            terminoBusqueda = suggestedTerm.name;
            showSuggestions();
            getSearchApi(terminoBusqueda, pageOffset);
          });
        });
      } else {
        // element.innerHTML = '<p>Sin Resultados</p>';
        textBottomSearchInput.style.display = 'block';
        openSuggestions.classList.remove('open-suggestions');
        openSuggestionsHr.style.display = 'none';
        addLupa.classList.remove('add-lupa');
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
};

/***************************************************************************/
/* Clear Search */
/***************************************************************************/
const clearSearch = () => {
  searchInput.value = '';
  searchResultsApi.innerHTML = '';
  titleResult.innerHTML = '';
  verMasBoxBoton.style.display = 'none';
  boxResultSearch.style.display = 'none';
  openSuggestions.classList.remove('open-suggestions');
  openSuggestionsHr.style.display = 'none';
  textBottomSearchInput.style.display = 'block';
  addLupa.classList.remove('add-lupa');
  searchBtn.classList.remove('close-boton-search');
  sessionStorage.removeItem('gifs');
  // sessionStorage.clear();
};

// HELPERS

async function handleDownload(url, name) {
  let a = document.createElement('a');

  let response = await fetch(url);
  let file = await response.blob();

  a.download = name;
  a.href = window.URL.createObjectURL(file);
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
  a.click();
}
