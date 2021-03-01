/***************************************************************************/
/* SET VARIABLES */
/***************************************************************************/
const API_KEY_TRENDING = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';
let offsetSelector = 0;
let leftButton = document.getElementById('buttonLeft');
let rightButton = document.getElementById('buttonRight');
const galleryTrending = document.getElementById('gallery-trending');

if (offsetSelector === 0) {
  leftButton.style.visibility = 'hidden';
}

/***************************************************************************/
/* TRENDING API */
/***************************************************************************/
const getApiTrending = (offset) => {
  if (offset >= 0) {
    trending(3, offset).then((resp) => {
      const result = resp.data;

      galleryTrending.textContent = '';

      if (result.length > 0) {
        result.forEach((item, index) => {
          const img = item.images.original.url;
          const title = item.title;
          const user = item.user?.display_name;
          const id = item.id;

          galleryTrending.innerHTML += `
            <div class="gallery-item">
              <img id="image-${item.id}" data-user="${item.username}" width="100%" height="100%" class="img-item-share" 
              src="${item.images.preview_gif.url}" alt="${item.title}" />
    
              <div class="gallery-items-share">
                <div class="share-icons">
                  <img id="${item.id}" class="icon-favorite" alt="" onclick="addFavorito(this)" />
                 
                  <img class="icon-download" alt="" onclick="handleDownload('${img}', '${title}');" />
                  
                  <img class="icon-maximize" alt="" 
                  onclick="openModalGifo('trending', '${id}', '${img}', '${title}', '${user}');" />
                </div>
    
                <div class="share-text">
                  <h5>${item.user === undefined ? 'Usuario Desconocido' : item.user.display_name}</h5>
                  <h3>${item.title}</h3>
                </div>
              </div>
              </div>
            `;

          const favoriteIcon = galleryTrending.children[index].childNodes[3].children[0].children[0];
          // console.log(favoriteIcon);

          if (getFavorito(item)) {
            favoriteIcon.classList.add('active');
          }
        });

        localStorage.setItem(`trendings`, JSON.stringify(result));
      }
    });
  }
};

const trending = async (limit, offset) => {
  let urlBase = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY_TRENDING}&limit=${limit}&offset=${offset}`;
  let response = await fetch(urlBase);
  let results = await response.json();
  return results;
};

getApiTrending(offsetSelector);

// SWIPE
galleryTrending.addEventListener('touchstart', handleTouchStart, false);
galleryTrending.addEventListener('touchmove', handleTouchMove, false);
galleryTrending.addEventListener('scroll', handleScrollHorizontal, false);

let xDown = null;
let yDown = null;
let sizeHorizontal = 0;

function handleScrollHorizontal(e) {
  sizeHorizontal = e.currentTarget.scrollLeft;
}

function getTouches(e) {
  return e.touches; // browser API
}

function handleTouchStart(e) {
  const firstTouch = getTouches(e)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(e) {
  // e.preventDefault();
  if (!xDown || !yDown) {
    return;
  }

  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  // console.log(sizeHorizontal);

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 15 && sizeHorizontal > 400) {
      /* left swipe */
      // console.log('left swipe', xDiff);
      // console.log('size horizontal', sizeHorizontal);
      slideToRight();
    } else if (xDiff < -15 && sizeHorizontal === 0) {
      //   /* right swipe */
      // console.log('right swipe', xDiff);
      // console.log('size horizontal', sizeHorizontal);
      slideToLeft();
    }
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

const slideToLeft = () => {
  if (offsetSelector <= 1) {
    leftButton.style.visibility = 'hidden';
  }

  if (Math.sign(offsetSelector) > 0) {
    rightButton.classList.remove('active');
    offsetSelector -= 1;
    getApiTrending(offsetSelector);
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
  getApiTrending(offsetSelector);
  rightButton.classList.add('active');
};

leftButton.addEventListener('click', slideToLeft);
rightButton.addEventListener('click', slideToRight);
