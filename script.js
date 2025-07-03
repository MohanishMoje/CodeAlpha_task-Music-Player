const audio = document.getElementById('audio');
const playPauseIcon = document.getElementById('playPauseIcon');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const current = document.getElementById('current');
const duration = document.getElementById('duration');

const songs = [
  { title: "Dont talk", file: "music/dont-talk-315229.mp3" },
  { title: "Jungle waves", file: "music/jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3" },
  { title: "kugelsicher by tremoxbeatz", file: "music/kugelsicher-by-tremoxbeatz-302838.mp3" }
];

let currentIndex = 0;


function loadSong(index) {
  audio.src = songs[index].file;
  title.textContent = songs[index].title;
  playPauseIcon.src = "icons/circle-play-solid.svg";
  playPauseIcon.alt = "Play";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseIcon.src = "icons/pause-solid.svg";
    playPauseIcon.alt = "Pause";
  } else {
    audio.pause();
    playPauseIcon.src = "icons/circle-play-solid.svg";
    playPauseIcon.alt = "Play";
  }
}


function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playPauseIcon.src = "icons/pause-solid.svg";
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playPauseIcon.src = "icons/pause-solid.svg";
}


function toggleRepeat() {
  audio.loop = !audio.loop;
  alert(`Repeat is now ${audio.loop ? "ON" : "OFF"}`);
}

function toggleShuffle() {
  currentIndex = Math.floor(Math.random() * songs.length);
  loadSong(currentIndex);
  audio.play();
  playPauseIcon.src = "icons/pause-solid.svg";
}


audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});


progress.addEventListener('input', () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});


audio.addEventListener("ended", () => {
  playPauseIcon.src = "icons/circle-play-solid.svg";
  playPauseIcon.alt = "Play";
});


function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}


loadSong(currentIndex);