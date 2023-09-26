const container = document.getElementById("music-container");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const image = document.getElementById("cover");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 2;

//Initially load song details

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  image.src = `/images/${song}.jpg`;
  audio.src = `/music/${song}.mp3`;
}

function playIt() {
  container.classList.add("play");
  play.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

function pauseIt() {
  container.classList.remove("play");
  play.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}

function playSong() {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pauseIt();
  } else {
    playIt();
  }
}

play.addEventListener("click", playSong);

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

function prevSong() {
  if (songIndex > 0) {
    songIndex--;
    loadSong(songs[songIndex]);
    playIt();
  } else {
    songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playIt();
  }
}

function nextSong() {
  if (songs.length - 1 === songIndex) {
    songIndex = 0;
    loadSong(songs[songIndex]);
    playIt();
  } else {
    songIndex++;
    loadSong(songs[songIndex]);
    playIt();
  }
}

audio.addEventListener("timeupdate", updateBar);

function updateBar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  if (duration === currentTime) {
    playSong();
  }
}

progressContainer.addEventListener("click", setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
