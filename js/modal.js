/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const listaImages = document.getElementById('search-results-api');

const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const contenido = document.getElementById('contenido');

let positionGif = 0;
let positionGifTrending = 0;
let typeGif = '';

/***************************************************************************/
/* MODAL */
/***************************************************************************/

// listaImages.addEventListener('click', (e) => {
//   console.log(e.target.attributes);
//   console.log(e.target.getAttribute('src'));
//   console.log(e.target.getAttribute('alt'));
// });

// listaImages.addEventListener('click', (e) => {
//   modal.style.display = 'block';
//   const contenido = document.getElementById('contenido');
//   const imgGif = e.target.getAttribute('src');

//   contenido.innerHTML = `
//     <div>
//       <img src="${imgGif}" />
//     </div>
//   `;
// });

span.addEventListener('click', () => {
  modal.style.display = 'none';
});

function openModalGifo(type, id, img, title, user) {
  modal.style.display = 'block';
  typeGif = type;
  // const linkImg = img.split('?')[0];

  let gifsActuales = '';
  let gifsActualesParse = null;

  if (type === 'search') {
    gifsActuales = sessionStorage.getItem('gifs');
    gifsActualesParse = JSON.parse(gifsActuales);
    positionGif = gifsActualesParse.map((x) => x.id).indexOf(id);
    // const newGif = gifsActualesParse[positionGif];
  } else if (type === 'trending') {
    gifsActuales = localStorage.getItem('trendings');
    gifsActualesParse = JSON.parse(gifsActuales);
    positionGifTrending = gifsActualesParse.map((x) => x.id).indexOf(id);
  } else if (type === 'favoritos') {
    gifsActuales = localStorage.getItem('favGifs');
    gifsActualesParse = JSON.parse(gifsActuales);
    positionGif = gifsActualesParse.map((x) => x.id).indexOf(id);
  }

  // const objectFound = gifsActualesParse[positionGif];
  // const newGif = gifsActualesParse.filter((item) => item.id === id);

  contenido.innerHTML = `
    <div class="wrapper-content">
      <div onclick="getGifLeft()">
        <span class="btn-left-slider"></span>
      </div>
      
      <div>
        <div class="box-img"><img src="${img}" /></div>
        <div class="box-details">
          <div class="textos">
            <h5>${user === 'undefined' || user === undefined ? 'Usuario Desconocido' : user}</h5>
            <h3>${title}</h3>
          </div>

          <div>
            <div class="box-share-icons">
                <img class="icon-favorite" alt="" />
                <img id="downloadGif" class="icon-download" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div onclick="getGifRight()">
        <span class="btn-right-slider"></span>
      </div>
    </div>
  `;

  downloadGif.addEventListener('click', () => {
    handleDownload(img, title);
  });
}

function getGifLeft() {
  let gifsActuales = '';

  if (typeGif === 'search') {
    gifsActuales = sessionStorage.getItem('gifs');
  } else if (typeGif === 'trending') {
    gifsActuales = localStorage.getItem('trendings');
  } else if (typeGif === 'favoritos') {
    gifsActuales = localStorage.getItem('favGifs');
  }

  const gifsActualesParse = JSON.parse(gifsActuales);

  if (positionGif > 0) {
    positionGif -= 1;

    const newGif = gifsActualesParse[positionGif];
    let img = '';

    if (typeGif === 'search') {
      img = newGif?.images?.original?.url;
    } else if (typeGif === 'favoritos') {
      img = newGif.img;
    }
    const title = newGif.title;

    contenido.innerHTML = `
    <div class="wrapper-content">
    <div onclick="getGifLeft()">
      <span class="btn-left-slider"></span>
    </div>

    <div>
      <div class="box-img"><img src="${img}" /></div>
      <div class="box-details">
        <div class="textos">
          <h5>${newGif.username === '' || newGif.username === undefined ? 'Usuario Desconocido' : newGif.username}</h5>
          <h3>${title}</h3>
        </div>

        <div>
          <div class="box-share-icons">
              <img class="icon-favorite" alt="" />
              <img id="downloadGif" class="icon-download" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div onclick="getGifRight()">
      <span class="btn-right-slider"></span>
    </div>
  </div>
    `;

    downloadGif.addEventListener('click', () => {
      handleDownload(img, title);
    });
  } else if (positionGifTrending > 0) {
    positionGifTrending -= 1;

    const newGif = gifsActualesParse[positionGifTrending];
    const img = newGif?.images?.original?.url;
    const title = newGif.title;

    contenido.innerHTML = `
    <div class="wrapper-content">
      <div onclick="getGifLeft()">
        <span class="btn-left-slider"></span>
      </div>

      <div>
        <div class="box-img"><img src="${img}" /></div>
        <div class="box-details">
          <div class="textos">
            <h5>${newGif.username === '' || newGif.username === undefined ? 'Usuario Desconocido' : newGif.username}</h5>
            <h3>${title}</h3>
          </div>

          <div>
            <div class="box-share-icons">
                <img class="icon-favorite" alt="" />
                <img id="downloadGif" class="icon-download" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div onclick="getGifRight()">
        <span class="btn-right-slider"></span>
      </div>
    </div>
    `;

    downloadGif.addEventListener('click', () => {
      handleDownload(img, title);
    });
  }
}

function getGifRight() {
  let gifsActuales = '';

  if (typeGif === 'search') {
    gifsActuales = sessionStorage.getItem('gifs');
  } else if (typeGif === 'trending') {
    gifsActuales = localStorage.getItem('trendings');
  } else if (typeGif === 'favoritos') {
    gifsActuales = localStorage.getItem('favGifs');
  }

  const gifsActualesParse = JSON.parse(gifsActuales);

  if ((typeGif === 'search' || typeGif === 'favoritos') && positionGif < gifsActualesParse.length - 1) {
    positionGif += 1;

    const newGif = gifsActualesParse[positionGif];
    let img = '';

    if (typeGif === 'search') {
      img = newGif?.images?.original?.url;
    } else if (typeGif === 'favoritos') {
      img = newGif.img;
    }

    const title = newGif.title;

    console.log(newGif);

    contenido.innerHTML = `
    <div class="wrapper-content">
    <div onclick="getGifLeft()">
      <span class="btn-left-slider"></span>
    </div>

    <div>
      <div class="box-img"><img src="${img}" /></div>
      <div class="box-details">
        <div class="textos">
          <h5>${newGif.username === '' || newGif.username === undefined ? 'Usuario Desconocido' : newGif.username}</h5>
          <h3>${title}</h3>
        </div>

        <div>
          <div class="box-share-icons">
              <img class="icon-favorite" alt="" />
              <img id="downloadGif" class="icon-download" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div onclick="getGifRight()">
      <span class="btn-right-slider"></span>
    </div>
  </div>
    `;

    downloadGif.addEventListener('click', () => {
      handleDownload(img, title);
    });
  } else if (typeGif === 'trending' && positionGifTrending < gifsActualesParse.length - 1) {
    positionGifTrending += 1;

    const newGif = gifsActualesParse[positionGifTrending];
    const img = newGif?.images?.original?.url;
    const title = newGif.title;

    contenido.innerHTML = `
    <div class="wrapper-content">
    <div onclick="getGifLeft()">
      <span class="btn-left-slider"></span>
    </div>

    <div>
      <div class="box-img"><img src="${img}" /></div>
      <div class="box-details">
        <div class="textos">
          <h5>${newGif.username === '' || newGif.username === undefined ? 'Usuario Desconocido' : newGif.username}</h5>
          <h3>${title}</h3>
        </div>

        <div>
          <div class="box-share-icons">
              <img class="icon-favorite" alt="" />
              <img id="downloadGif" class="icon-download" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div onclick="getGifRight()">
      <span class="btn-right-slider"></span>
    </div>
  </div>
    `;

    downloadGif.addEventListener('click', () => {
      handleDownload(img, title);
    });
  }
}
