document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    myVideo.pause();
  } else {
    myVideo.play();
  }
}, false);