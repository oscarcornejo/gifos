const API_KEY = 'Ii4G7TeTlLIx8f8fLOK8HKMdwflwMbUK';
const boxCamOff = document.getElementById('box-cam-off');
const boxCam = document.getElementById('box-cam');

const createButton = document.getElementById('btn-comenzar');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const timerClock = document.getElementById('timer');

let mygifos = localStorage.getItem('misGifos');
mygifos = mygifos ? JSON.parse(mygifos) : [];

let stream, recorder, video, formdata;
let timer,
  hours = '00',
  minutes = '00',
  seconds = '00';

async function getStreamAndRecord() {
  boxCamOff.style.display = 'none';
  boxCam.style.display = 'block';
  boxCam.style.zIndex = '2';

  boxCam.innerHTML = `
  <h2>¿Nos das acceso a tu cámara?</h2>
  <p>¡Crea tu GIFO en sólo 3 pasos! por el tiempo en el que estés creando el GIFO.</p>`;

  createButton.classList.add('hidden');
  step1.classList.add('activate');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });

    video = document.createElement('video');

    boxCam.innerHTML = '';
    boxCam.appendChild(video);
    video.srcObject = stream;
    await video.play();

    createButton.classList.remove('hidden');
    step1.classList.remove('activate');
    step2.classList.add('activate');
    createButton.innerText = 'GRABAR';

    return stream;
  } catch (error) {
    console.error(error);
  }
}

function chronometer() {
  seconds++;

  if (seconds < 10) seconds = `0` + seconds;

  if (seconds > 59) {
    seconds = `00`;
    minutes++;

    if (minutes < 10) minutes = `0` + minutes;
  }

  if (minutes > 59) {
    minutes = `00`;
    hours++;

    if (hours < 10) hours = `0` + hours;
  }

  timerClock.textContent = `${hours}:${minutes}:${seconds}`;
}

function addHoverVideo(text, iconType = false) {
  const divHover = document.createElement('div');

  const icon = getIcon(iconType);

  divHover.classList.add('div-hover-create');
  divHover.innerHTML = `
    ${icon}
    <h2>${text}</h2>
  `;

  divHover.style.width = `${video.offsetWidth}px`;
  divHover.style.height = `${video.offsetHeight}px`;

  boxCam.insertBefore(divHover, video);
}

const getIcon = (type) => {
  switch (type) {
    case 'spinner':
      return SPINNER;

    case 'success':
      return SUCCESS;

    default:
      break;
  }
};

const SPINNER = `
<div class="sk-fading-circle">
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div>
`;

const SUCCESS = `
  <div class="icon-success"></div>
`;

function removeHoverVideo() {
  boxCam.firstChild = '';
}

createButton.addEventListener('click', async () => {
  switch (createButton.innerText) {
    case 'COMENZAR':
      stream = await getStreamAndRecord();
      break;

    case 'GRABAR':
      console.log('Grabando Gif', stream);
      timerClock.style.display = 'block';
      recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log('started');
        },
      });

      step2.classList.remove('activate');
      step3.classList.add('activate');

      recorder.startRecording();
      createButton.innerText = 'FINALIZAR';

      timerClock.classList.add('active');
      timer = setInterval(chronometer, 1000);

      break;

    case 'FINALIZAR':
      console.log('stop');
      await recorder.stopRecording();
      await video.pause();
      clearInterval(timer);

      formdata = new FormData();
      formdata.append('file', recorder.getBlob(), 'myGif.gif');

      timerClock.innerText = 'REPETIR CAPTURA';
      timerClock.classList.add('hover');
      createButton.innerText = 'SUBIR GIFO';

      timerClock.addEventListener('click', async () => {
        timerClock.innerText = '';
        step3.classList.remove('activate');
        timerClock.classList.remove('hover');
        createButton.innerText = 'GRABAR';
        stream = await getStreamAndRecord();
      });

      break;

    case 'SUBIR GIFO':
      console.log('Subiendo Gif');
      addHoverVideo('Estamos Subiendo tu Gifo', 'spinner');

      try {
        const response = await subirGif(formdata);
        const gifo = await fetchGifId(response.data.id);

        mygifos.push(gifo.data);
        localStorage.setItem('misGifos', JSON.stringify(mygifos));
      } catch (error) {
        console.error(error);
      }

      // Replace Hover Div
      timerClock.removeEventListener('click', null);
      boxCam.removeChild(boxCam.children[0]);
      addHoverVideo('GIF subido con éxto', 'success');

      // const removeHover = document.querySelector('.div-hover-create');
      // removeHover.style.display = 'none';
      // removeHover.innerHTML = '';
      step3.classList.remove('activate');

      createButton.innerText = 'COMENZAR';
      break;

    default:
      break;
  }
});

async function subirGif(formdata) {
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`, requestOptions).then((response) => response.json());
}

async function fetchGifById(id) {
  return await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`).then((response) => response.json());
}
