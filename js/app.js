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

// Probando evento resize
// window.addEventListener('resize', function () {
//   const menuReferencia = document.getElementById('menu-links');
//   if (window.innerWidth > 991) {
//     menuReferencia.classList.add('showMenu');
//   } else {
//     menuReferencia.classList.remove('showMenu');
//   }
// });

/********************* *********************/

// SEARCH
const searchInput = document.getElementById('search-input');
let terminoBusqueda = '';

searchInput.addEventListener('keyup', () => {
  terminoBusqueda = searchInput.value;
  console.log(searchInput.value.length)
  console.log(terminoBusqueda.length)

  if(terminoBusqueda.length > 2) {
    getApiSuggestions(terminoBusqueda)
  }

});

// GET RESULTADOS POR TÉRMINO DE BÚSQUEDA
const searchBtn = document.getElementById('btn-search');
searchBtn.addEventListener('click', async () => {
  if (terminoBusqueda.length > 2) {
    await getApi(terminoBusqueda, 25);
  }
});

// VER MÁS
let verMas = 10;

// SIGUIENTE PÁGINA
let nextPage = 1;

const verMasBtn = document.getElementById('ver-mas-btn');

verMasBtn.addEventListener('click', () => {
  verMas += 5;
  nextPage++;
  getApi(terminoBusqueda, verMas, nextPage);
});

/********************* *********************/

const getApi = (termino, items, nextPage) => {
  const title = document.getElementById('title-result');
  title.innerHTML = termino;

  // API
  const API_URL = `${BASE_PATH}&q=${termino}&limit=${items}&offset=${nextPage}&rating=g&lang=en`;

  fetch(API_URL)
    .then((data) => data.json())
    .then((resp) => {
      console.log(resp.data);
      const result = resp.data;
      const boxResult = document.querySelector('.search-results');
      boxResult.style.display = 'block';

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
        element.innerHTML = '<p>Sin Resultados</p>';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getApiSuggestions = (termino) => {


  // API
  const API_URL = `${BASE_PATH}&q=${termino}&limit=${items}&offset=${nextPage}&rating=g&lang=en`;

  fetch(API_URL)
    .then((data) => data.json())
    .then((resp) => {
      console.log(resp.data);
      const result = resp.data;
      const boxResult = document.querySelector('.search-results');
      boxResult.style.display = 'block';

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
//           <div class="gallery-result-item" id="${item.id}" onclick="${openImage(item.id)}">
//             <img src="${item.images.original.url}" alt="${item.title}" />
//           </div>
//         `;
// };
const listaImages = document.getElementById('search-results-api');

listaImages.addEventListener('click', (e) => {
  console.log(e.target.attributes);
  console.log(e.target.getAttribute('src'));
  console.log(e.target.getAttribute('alt'));
});

// const openImage = (e) => {
//   e.preventDefault();
// };

// https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20
// https://api.giphy.com/v1/tags/related/?api_key=${API_KEY}&limit=20
// api.giphy.com/v1/gifs/search/tags
