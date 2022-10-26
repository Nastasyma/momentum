import langObject from './languageObj.js';
import { tagsInput, language, langs } from './settings.js';

// ------- slider ------- 

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const githubBtnSettings = document.querySelector('input[value="github"]');
const unsplashBtnSettings = document.querySelector('input[value="unsplashApi"]');
const flickrBtnSettings = document.querySelector('input[value="flickrApi"]');
const img = new Image();
let isJump = true;

// получить рандомное число от min до max
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else if (hours >= 18 && hours < 24) {
    return 'evening';
  } else if (hours >= 0 && hours < 6) {
    return 'night';
  }
}
getTimeOfDay();

const timeOfDay = getTimeOfDay();
let slideNumber = getRandomNum(1, 20);
// рандомный background в зависимости от времени суток (источник - github)
function setBg() {
  let bgNum  = String(slideNumber).padStart(2,'0');
    img.src = `https://raw.githubusercontent.com/Nastasyma/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    // console.log('bgNum =', bgNum);
  }
}
// background источник - Unsplash API
async function getUnsplashImg() {  
  let url;
  if (unsplashBtnSettings.checked && tagsInput.value.length !== 0) {
    url =`https://api.unsplash.com/photos/random?orientation=landscape&query=${tagsInput.value}&client_id=b5hAf93wFGCv1AQJ_AMQ9-tf6Zd2QI9h_q4RwXotEj8`;
  } else {
    url =`https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=b5hAf93wFGCv1AQJ_AMQ9-tf6Zd2QI9h_q4RwXotEj8`;
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod !== '403' && data.cod !== '404' && data.cod !== '400') {
    img.src = `${data.urls.regular}`;
    img.onload = () => {
    body.style.backgroundImage = `url(${data.urls.regular})`;
    };
  } 
}
// background источник - Flickr API
async function getFlickrImg() {  
  let url;
  if (flickrBtnSettings.checked && tagsInput.value.length !== 0) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=318c6cfa9de7a2eed7ad2b9c2b30ca3d&tags=${tagsInput.value}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=318c6cfa9de7a2eed7ad2b9c2b30ca3d&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  }
  const res = await fetch(url);
  const data = await res.json();
  let flickrNumber = getRandomNum(1, 99);
  if (data.cod !== '403' && data.cod !== '404' && data.cod !== '400') {
    img.src = `${data.photos.photo[flickrNumber].url_l}`;
    img.onload = () => {
    body.style.backgroundImage = `url(${data.photos.photo[flickrNumber].url_l})`;
    };
  }
}

function setJump() {
  isJump = true;
};

// стрелка вправо листает background по порядку
function getSlideNext(){
  if (!isJump) {
    return;
  }
  isJump = false;

  if (slideNumber < 20) {
    slideNumber = slideNumber + 1;
  } else if (slideNumber === 20) {
    slideNumber = 1;
  }
    if (localStorage.getItem('gallery_settings') === 'unsplashApi') {
    getUnsplashImg();
  } else if (localStorage.getItem('gallery_settings') === 'flickrApi') {
    getFlickrImg();
  } else {
    setBg();
  } 
  // console.log(slideNumber);
  setTimeout(setJump, 2000); // задержка на перелистывание фото
};
// стрелка влево листает background по порядку
function getSlidePrev(){
  if (!isJump) {
    return;
  }
  isJump = false;

  if (slideNumber > 1) {
    slideNumber = slideNumber - 1;
  } else if (slideNumber === 1) {
    slideNumber = 20;
  }
    if (localStorage.getItem('gallery_settings') === 'unsplashApi') {
    getUnsplashImg();
  } else if (localStorage.getItem('gallery_settings') === 'flickrApi') {
    getFlickrImg();
  } else {
    setBg();
  } 
  // console.log(slideNumber);
  setTimeout(setJump, 2000); // задержка на перелистывание фото
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// менять источник фона в меню настроек
githubBtnSettings.addEventListener('click', () => {
    // сбросить введенный тег при смене bg source в настройках
    tagsInput.value = '';
    // если выбран github - сделать input tags неактивным
    tagsInput.setAttribute("disabled", "disabled"); 
    setBg();
});
unsplashBtnSettings.addEventListener('click', () => {
    tagsInput.value = '';
    tagsInput.removeAttribute("disabled", "disabled");
    getUnsplashImg();
});
flickrBtnSettings.addEventListener('click', () => {
    tagsInput.value = '';
    tagsInput.removeAttribute("disabled", "disabled");
    getFlickrImg();
});

// переключить картинки фона в зависимости от введенного тэга 
tagsInput.addEventListener("change", () => {
  if (unsplashBtnSettings.checked) {
    getUnsplashImg();
    localStorage.setItem('tag_value', tagsInput.value);
  }
  if (flickrBtnSettings.checked) {
    getFlickrImg();
    localStorage.setItem('tag_value', tagsInput.value);
  }
});

langs.forEach(el => {
  el.addEventListener('change', () => {
    // переключение языка в настройках меняет язык placeholder tags
    tagsInput.setAttribute('placeholder', langObject[language].placeholderTags);
    localStorage.setItem('tags_placeholder', langObject[language].placeholderTags);
  })
})

// Local Storage для BG source
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('tag_value'))
    tagsInput.value = localStorage.getItem('tag_value');
  if (localStorage.getItem('tags_placeholder')) 
    tagsInput.placeholder = langObject[language].placeholderTags;
  if (localStorage.getItem('gallery_settings')) {
      if (localStorage.getItem('gallery_settings') === 'github') {
      setBg();
    } else if (localStorage.getItem('gallery_settings') === 'unsplashApi') {
      getUnsplashImg();
    } else if (localStorage.getItem('gallery_settings') === 'flickrApi') {
      getFlickrImg();
    } 
  } else {
    setBg();
  }
});

export { getRandomNum };