let misGifos = localStorage.getItem('misGifos');
misGifos = misGifos ? JSON.parse(misGifos) : [];

const misGifsContainer = document.getElementById('mis-gifs-list');

function getGifos() {
  if (misGifos.length) {
    if (misGifsContainer !== null) {
      misGifsContainer.innerHTML = '';

      misGifos.forEach((item) => {
        misGifsContainer.innerHTML += `
        <div class="gallery-favs-item">
            <img id="image-${item.id}" data-user="${item.username}" width="100%" height="100%" class="img-item-share" 
            src="${item.images.original_still.url}" alt="${item.title}" />
        
            <div class="items-share">
                <div class="share-icons">
                    <img id="${item.id}" class="icon-remove" alt="" onclick="removeFavorito(this)" />
                    
                    <img class="icon-download" alt="" onclick="handleDownload('${item.images.original.url}', '${item.title}');" />
                    
                    <img class="icon-maximize" alt="" 
                    onclick="openModalGifo('misGifos', '${item.id}', '${item.images.original.url}', '${item.title}', '${item.username}');" />
                </div>
        
                <div class="share-text">
                    <h5>${item.username === '' ? 'Usuario Desconocido' : item.username}</h5>
                    <h3>${item.title === '' ? 'Sin Titulo' : item.title}</h3>
                </div>
            </div>
        </div>
    `;
      });
    }
  } else {
    misGifsContainer.innerHTML = `
        <div class="sin-result">
            <img class="sin-result-icon" src="../assets/images/icon-fav-sin-contenido.svg" alt="busqueda-sin-resultado"/>
            <p class="sin-result-text">"¡Anímate a crear tu primer GIFO!"</p>
        </div>
    `;
  }
}

getGifos();

function removeFavorito(gif) {
  const favoriteIndex = misGifos.findIndex((fav) => fav.id === gif.id);
  misGifos.splice(favoriteIndex, 1);
  getGifos();
  localStorage.setItem('misGifos', JSON.stringify(misGifos));
}

// function addFavorito(gifo) {
//   const favoriteIcon = document.getElementById(`${gifo.id}`);

//   console.log(favoriteIcon);

//   if (getFavorito(gifo)) {
//     favoriteIcon.classList.remove('active');
//   } else {
//     favoriteIcon.classList.add('active');
//   }

//   const newGif = misGifos.filter((item) => item.id === gifo.id);

//   let imSRC = newGif[0].images.original.url;
//   let title = newGif[0].title;
//   let user = newGif[0].username;

//   const gifInfo = { id: newGif[0].id, img: imSRC, title, user };

//   const favoriteIndex = favoritos.findIndex((fav) => fav.id === gifo.id);

//   console.log(favoriteIndex);

//   if (favoriteIndex === -1) {
//     favoritos.push(gifInfo);
//     getGifos();
//   } else {
//     favoritos.splice(favoriteIndex, 1);
//     getGifos();
//   }

//   localStorage.setItem('favGifs', JSON.stringify(favoritos));
// }

// function getFavorito(gif) {
//   return favoritos.find((fav) => fav.id === gif.id);
// }

async function handleDownload(url, name) {
  let a = document.createElement('a');

  let response = await fetch(url);
  let file = await response.blob();

  a.download = name;
  a.href = window.URL.createObjectURL(file);
  a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
  a.click();
}
