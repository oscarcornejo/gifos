const arrayFavoritos = [];
let favoritos = localStorage.getItem('favGifs');
favoritos = favoritos ? JSON.parse(favoritos) : [];

const favsContainer = document.getElementById('gifs-favs-list');

function getfavoritos() {
  if (favoritos.length) {
    // console.log(favoritos);
    if (favsContainer !== null) {
      favsContainer.innerHTML = '';

      favoritos.forEach((item) => {
        favsContainer.innerHTML += `
        <div class="gallery-favs-item">
            <img id="image-${item.id}" data-user="${item.user}" width="100%" height="100%" class="img-item-share" 
            src="${item.img}" alt="${item.title}" />
        
            <div class="items-share">
                <div class="share-icons">
                    <img id="${item.id}" class="icon-remove" alt="" onclick="addFavorito(this)" />
                    
                    <img class="icon-download" alt="" onclick="handleDownload('${item.img}', '${item.title}');" />
                    
                    <img class="icon-maximize" alt="" 
                    onclick="openModalGifo('favoritos', '${item.id}', '${item.img}', '${item.title}', '${item.user}');" />
                </div>
        
                <div class="share-text">
                    <h5>${item.user === '' ? 'Usuario Desconocido' : item.user}</h5>
                    <h3>${item.title}</h3>
                </div>
            </div>
        </div>
    `;
      });
    }
  } else {
    favsContainer.innerHTML = `
        <div class="sin-result">
            <img class="sin-result-icon" src="../assets/images/icon-fav-sin-contenido.svg" alt="busqueda-sin-resultado"/>
            <p class="sin-result-text">"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</p>
        </div>
    `;
  }
}

getfavoritos();

// if (localStorage.getItem('myGifs') == null) {
//   var myGifsList = [];
// } else {
//   var myGifsList = JSON.parse(localStorage.getItem('myGifs'));
// }

function addFavorito(gifo) {
  const favoriteIcon = document.getElementById(`${gifo.id}`);

  if (getFavorito(gifo)) {
    favoriteIcon.classList.remove('active');
  } else {
    favoriteIcon.classList.add('active');
  }

  let imgID = 'image-' + gifo.id;
  let imSRC = document.getElementById(imgID).src;
  let title = document.getElementById(imgID).alt;
  let user = document.getElementById(imgID).dataset.user;

  const gifInfo = { id: gifo.id, img: imSRC, title, user };

  const favoriteIndex = favoritos.findIndex((fav) => fav.id === gifo.id);
  if (favoriteIndex === -1) {
    favoritos.push(gifInfo);
    getfavoritos();
  } else {
    favoritos.splice(favoriteIndex, 1);
    getfavoritos();
  }

  localStorage.setItem('favGifs', JSON.stringify(favoritos));
}

function getFavorito(gifo) {
  return favoritos.find((fav) => fav.id === gifo.id);
}

async function handleDownload(url, name) {
  let a = document.createElement('a');

  let response = await fetch(url);
  let file = await response.blob();

  a.download = name;
  a.href = window.URL.createObjectURL(file);
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
  a.click();
}
