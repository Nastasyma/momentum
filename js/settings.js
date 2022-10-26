import langObject from './languageObj.js';
import { data, time } from './time.js';

// ------- settings -------

const settingsBTN = document.querySelector('.settings_btn');
const settingsMenu = document.querySelector('.settings_menu');
const background = document.querySelector('.body_opacity_popup');
const greetingContainer = document.querySelector('.greeting-container');
const quotesWrapper = document.querySelector('.quote_wrapper');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');
const logo = document.querySelector('.my_page');
const todo = document.querySelector('.todo_wrapper');
const changeWidgets = document.querySelectorAll('input[name="widget"]');
const langs = document.querySelectorAll('input[name="language"]');
const imgSource = document.querySelectorAll('input[name="gallery"]');
const tagsInput = document.querySelector('.bg_tags');
const enTitle = document.querySelector('.en_title');
const ruTitle = document.querySelector('.ru_title');
const setTitle = document.querySelector('.settings_title');
const langTitle = document.querySelector('.lang_title');
const widgetTitle = document.querySelector('.widget_title');
const timeTitle = document.querySelector('.time_title');
const dateTitle = document.querySelector('.date_title');
const weatherTitle = document.querySelector('.weather_title');
const greetTitle = document.querySelector('.greeting_title');
const quoteTitle = document.querySelector('.quote_title');
const playerTitle = document.querySelector('.player_title');
const logoTitle = document.querySelector('.logo_title');
const todoTitle = document.querySelector('.todo_title');
const galleryTitle = document.querySelector('.gallery_title');

export let language = 'en';

(function () { // вызов settings popup 
  settingsBTN.addEventListener('click', () => {
    // кнопка "настройки" закрывает попап
    if (settingsBTN.classList.contains('settings_btn_active')) { 
      settingsBTN.classList.remove('settings_btn_active');
      settingsMenu.classList.remove('settings_menu_active')
      background.classList.remove('body_opacity_popup_active');
    } else { // кнопка "настройки" открывает попап
      settingsBTN.classList.add('settings_btn_active'); 
      settingsMenu.classList.add('settings_menu_active')
      background.classList.add('body_opacity_popup_active');
    }
  })
  // клик вне зоны попапа закрывает его
  background.addEventListener('click', () => { 
    settingsBTN.classList.remove('settings_btn_active');
    settingsMenu.classList.remove('settings_menu_active')
    background.classList.remove('body_opacity_popup_active');
  })
}());

changeWidgets.forEach(el => { 
  el.addEventListener('change', (e) => {
      if (e.target.checked) { // спрятать элементы по клику на чекбоксы
          document.querySelector(`.${e.target.value}`).style.visibility = "visible";
          document.querySelector(`.${e.target.value}`).style.opacity = "1";
      } else {
          document.querySelector(`.${e.target.value}`).style.visibility = "hidden";
          document.querySelector(`.${e.target.value}`).style.opacity = "0";
      }

      window.addEventListener('beforeunload', () => {
        // сохранить класс visibility элементов в Local Storage
        localStorage.setItem(`${e.target.value}_opacity`, document.querySelector(`.${e.target.value}`).style.visibility);
        // сохранить статус чекбоксов в Local Storage
        localStorage.setItem(`${e.target.value}_settings`, e.target.checked);
      });
    })
});

window.addEventListener('DOMContentLoaded', () => {
  changeWidgets.forEach((element) => { // получить статус чекбоксов из Local Storage
    if (localStorage.getItem(`${element.value}_settings`)) {
    element.checked = JSON.parse(localStorage.getItem(`${element.value}_settings`));
    }
  });

  // получить статус радио кнопок (язык) из Local Storage 
  if (localStorage.getItem('language_settings') === 'ru') { 
    document.querySelector('input[value="ru"]').setAttribute('checked', 'true');
  } else if (localStorage.getItem('language_settings') === 'en') {
    document.querySelector('input[value="en"]').setAttribute('checked', 'true');
  }

  // получить статус радио кнопок (галлерея) из Local Storage 
  if (localStorage.getItem('gallery_settings') === 'github') { 
    document.querySelector('input[value="github"]').setAttribute('checked', 'true');
  } else if (localStorage.getItem('gallery_settings') === 'unsplashApi') {
    document.querySelector('input[value="unsplashApi"]').setAttribute('checked', 'true');
    tagsInput.removeAttribute("disabled", "disabled");
  } else if (localStorage.getItem('gallery_settings') === 'flickrApi') {
    document.querySelector('input[value="flickrApi"]').setAttribute('checked', 'true');
    tagsInput.removeAttribute("disabled", "disabled");
  }

  // получить класс opacity элементов из Local Storage
  time.style.visibility = localStorage.getItem('time_opacity');
  data.style.visibility = localStorage.getItem('date_opacity');
  greetingContainer.style.visibility = localStorage.getItem('greeting-container_opacity');
  quotesWrapper.style.visibility = localStorage.getItem('quote_wrapper_opacity');
  weather.style.visibility = localStorage.getItem('weather_opacity');
  player.style.visibility = localStorage.getItem('player_opacity');
  logo.style.visibility = localStorage.getItem('my_page_opacity');
  todo.style.visibility = localStorage.getItem('todo_wrapper_opacity');
  // получить переменную language из Local Storage
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
  }
  // получить перевод меню настроек из Local Storage
  if (localStorage.getItem('lang_en'))
    enTitle.textContent = localStorage.getItem('lang_en');
  if (localStorage.getItem('lang_ru'))
    ruTitle.textContent = localStorage.getItem('lang_ru');
  if (localStorage.getItem('settings_title')) 
    setTitle.textContent = localStorage.getItem('settings_title');
  if (localStorage.getItem('change_lang_title')) 
    langTitle.textContent = localStorage.getItem('change_lang_title');
  if (localStorage.getItem('widget_title')) 
    widgetTitle.textContent = localStorage.getItem('widget_title');
  if (localStorage.getItem('time_title')) 
    timeTitle.textContent = localStorage.getItem('time_title');
  if (localStorage.getItem('date_title')) 
    dateTitle.textContent = localStorage.getItem('date_title');
  if (localStorage.getItem('weather_title')) 
    weatherTitle.textContent = localStorage.getItem('weather_title');
  if (localStorage.getItem('greeting_title')) 
    greetTitle.textContent = localStorage.getItem('greeting_title');
  if (localStorage.getItem('quote_title')) 
    quoteTitle.textContent = localStorage.getItem('quote_title');
  if (localStorage.getItem('player_title')) 
    playerTitle.textContent = localStorage.getItem('player_title');
  if (localStorage.getItem('logo_title')) 
    logoTitle.textContent = localStorage.getItem('logo_title');
  if (localStorage.getItem('todo_title')) 
    todoTitle.textContent = localStorage.getItem('todo_title');
  if (localStorage.getItem('gallery_title')) 
    galleryTitle.textContent = localStorage.getItem('gallery_title');


});

// изменить язык настроек
langs.forEach(el => {
  el.addEventListener('change', (e) => {
      language = e.target.value;
      localStorage.setItem('language', language);
      // сохранить статус радиокнопок (язык) в Local Storage
      localStorage.setItem(`${e.target.name}_settings`, e.target.value);
      // сохранить перевод меню настроек в Local Storage
      localStorage.setItem('lang_en', langObject[language].langEn);
      localStorage.setItem('lang_ru', langObject[language].langRu);
      localStorage.setItem('settings_title', langObject[language].settings);
      localStorage.setItem('change_lang_title', langObject[language].changeLang);
      localStorage.setItem('widget_title', langObject[language].widget);
      localStorage.setItem('time_title', langObject[language].time);
      localStorage.setItem('date_title', langObject[language].date);
      localStorage.setItem('weather_title', langObject[language].weather);
      localStorage.setItem('greeting_title', langObject[language].greeting);
      localStorage.setItem('quote_title', langObject[language].quoteTitle);
      localStorage.setItem('player_title', langObject[language].player);
      localStorage.setItem('logo_title', langObject[language].logo);
      localStorage.setItem('todo_title', langObject[language].todo);
      localStorage.setItem('gallery_title', langObject[language].gallery);

      getTranslationSettings();
  })
});

// перевести меню настроек
function getTranslationSettings() {   
  enTitle.textContent = langObject[language].langEn;
  ruTitle.textContent = langObject[language].langRu;
  setTitle.textContent = langObject[language].settings;
  langTitle.textContent = langObject[language].changeLang;
  widgetTitle.textContent = langObject[language].widget;
  timeTitle.textContent = langObject[language].time;
  dateTitle.textContent = langObject[language].date;
  weatherTitle.textContent = langObject[language].weather;
  greetTitle.textContent = langObject[language].greeting;
  quoteTitle.textContent = langObject[language].quoteTitle;
  playerTitle.textContent = langObject[language].player;
  logoTitle.textContent = langObject[language].logo;
  todoTitle.textContent = langObject[language].todo;
  galleryTitle.textContent = langObject[language].gallery;
}

imgSource.forEach(el => {
  el.addEventListener('change', (e) => {
    // сохранить статус радиокнопок (галлерея) в Local Storage
    localStorage.setItem(`${e.target.name}_settings`, e.target.value);
  })
});

export { langs, imgSource, tagsInput }