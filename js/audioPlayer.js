import playList from './playList.js';

// ------- audio player -------

const audio = new Audio();
const play = document.querySelector('.play.player-icon');
const songsList = document.querySelector('.play-list');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
let songNum = 0;
let isPlay = false;
let audioCurrentTime = 0;

/*function toggleBtn() {
  play.classList.toggle('pause');
}
play.addEventListener('click', toggleBtn);*/

// вывести в html список песен 
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');  
  li.classList.add('play-item');
  const span = document.createElement('span');
  span.classList.add('song_title');
  span.textContent = playList[i].title;
  li.appendChild(span); 
  songsList.append(li); 
  }

let playItem = document.querySelectorAll('.play-item');
playItem[0].classList.add('item-active'); // по дефолту активный трек первый

// запуск проигрывания плеера 
function playAudio() {
  audio.src = playList[songNum].src; // найти трек в playList.js
  playItem[songNum].classList.add('item-active'); // добавить стиль активному треку
  songName.innerHTML = playList[songNum].title; // выввести название трека в продвинутый плеер
  audio.currentTime = audioCurrentTime; // запомнить место проигрывания трека

  if (!isPlay) {
    audio.play();  
    isPlay = true; 
    play.classList.add('pause'); // смена иконку с play на pause
    playItem[songNum].classList.add('song_pause');
  } else {
    audio.pause(); 
    audioCurrentTime = audio.currentTime; // проигрывать трек с того же места 
    isPlay = false; 
    play.classList.remove('pause');
    playItem[songNum].classList.remove('song_pause');
  } 
}

play.addEventListener('click', playAudio);

// следующий трек 
function nextSong() { 
  audioCurrentTime = 0; // начинается с 0
  if (isPlay) { 
    playAudio();
  } 

  if (songNum < playList.length-1) {
    songNum = songNum + 1;
    playItem[songNum-1].classList.remove('item-active');   
  } else if (songNum === playList.length-1) {
    playItem[songNum].classList.remove('item-active');    
    songNum = 0;          
  }  
  playAudio();
}
// предыдущий трек
function prevSong() {
  audioCurrentTime = 0; // начинается с 0
  if (isPlay) {
    playAudio();
  }

  if (songNum > 0) {
    songNum = songNum - 1;
    playItem[songNum+1].classList.remove('item-active'); 
  }
  else if (songNum === 0) {
    playItem[songNum].classList.remove('item-active'); 
    songNum = playList.length-1;
  }   
  playAudio(); 
}

playNext.addEventListener('click', nextSong);
playPrev.addEventListener('click', prevSong);

// после окончания трека проигрывается следующий
audio.addEventListener('ended', nextSong);

// клик по названию трека запускает трек
playItem.forEach((item, i) => {
  item.addEventListener('click', () => {

    if (songNum === i) { // если кликать на активный трек
      playAudio();
    }
    if (songNum !== i) { // если кликать на неактивный трек
      audioCurrentTime = 0;
      
      if (isPlay) {
        playAudio();
      }
      if (playItem[songNum].classList.contains('item-active')) {
        playItem[songNum].classList.remove('item-active'); 
      } else {
        playItem[songNum].classList.add('item-active'); 
      }
      songNum = i;
      playAudio();
    } 
  })
});

// ------- advanced player -------

const volumeIcon = document.querySelector('.volume_icon');
const audioVolume = document.getElementById("audioVolume");
const audioProgress = document.getElementById("audioProgress");
let songDuration = document.querySelector('.song_duration_time');
let songCurrentTime = document.querySelector('.song_current_time');
let songName = document.querySelector('.song_name_title');

// заглушение звука, смена иконки 
volumeIcon.addEventListener('click', () => {

  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeIcon.classList.add('mute');
  } else {
    volumeIcon.classList.remove('mute');
  }
});

// громкость музыки, при 0 - мут и смена иконки
audioVolume.addEventListener("input", () => {

  audio.volume = Math.trunc(audioVolume.value) / 100;
  audioVolume.style.background = `linear-gradient(to right, #c76000 0%, #c76000 ${audioVolume.value}%, #c4c4c4 ${audioVolume.value}%, #c4c4c4 100%)`;
  if (audioVolume.value === 0) {
    volumeIcon.classList.add('mute');
  } else { 
    volumeIcon.classList.remove('mute');
  }
});

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

// прогресс-бар
  function updateProgressValue() {
    if (audio.duration) {
      audioCurrentTime = audio.currentTime;
      songDuration.innerHTML = `${playList[songNum].duration}`; // продолжительность трека из плейлиста
      songCurrentTime.innerHTML = formatTime(audio.currentTime); // текущее время трека
      audioProgress.value = 100 * (audio.currentTime / audio.duration); // ползунок двигается
      audioProgress.style.background = `linear-gradient(to right, #c76000 ${audioProgress.value}%, #c4c4c4 ${audioProgress.value}%)`;
      if (audioProgress.value === audio.duration) { // после окончания трека играть следующий
        playNext();
      }
    }
  };

audio.addEventListener("timeupdate", updateProgressValue);

audioProgress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (audioProgress.value * audio.duration) / 100; // при нажатии на прогресс бар, трек играет с этого места
    if (audioProgress.value === audio.duration) {
      playNext();
    }
  }
});