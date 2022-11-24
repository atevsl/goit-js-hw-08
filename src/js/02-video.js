import Player from '@vimeo/player';
let throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.on('timeupdate', throttle(timeSave, 1000));

function timeSave() {
  console.log('сохраняем время');
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', seconds);
  });
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

console.log(
  'localStorage.getItem(videoplayer-current-time)',
  localStorage.getItem('videoplayer-current-time')
);
