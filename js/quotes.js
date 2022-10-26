import langObject from './languageObj.js';
import { language, langs } from './settings.js';
import { getRandomNum } from './bgSlider.js';

// ------- quotes -------

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let randomQuote;

// получить данные из json файла, вывести рандомно цитату по номеру от 1 до 20 при загрузке страницы
async function getQuotes() {  
  const quotes = langObject[language].quote;
  const res = await fetch(quotes);
  const data = await res.json(); 
  randomQuote = getRandomNum(0, data.length-1);
  // console.log('quote.json length =',data.length);
  quote.textContent = data[randomQuote].text;
  author.textContent = data[randomQuote].author;  
  // console.log('quote =', randomQuote)
}
getQuotes();

// вывести рандомно цитату по номеру от 1 до 20 при клике на кнопку 
changeQuote.addEventListener('click', () => {
  getQuotes();
});

// переключение языка в настройках меняет язык цитаты
langs.forEach(el => {
  el.addEventListener('change', (e) => {
    getQuotes();
  })
})

window.addEventListener('DOMContentLoaded', getQuotes);