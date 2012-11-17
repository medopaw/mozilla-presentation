document.requestFullScreen();
// Fullscreen on one element
document.getElementById('my-game-canvas').requestFullScreen();


if (document.fullScreenEnabled) {
  // TODO: orientation change event?
  if (window.screen.lockOrientation('landscape-primary')) {
    console.log('orientation was locked');
  }

  navigator.pointer.lock(document.body, function() {
    console.log('Pointer lock worked');
  }, function() {
    console.error('No pointer lock');
  };
}

document.addEventListener('mousemove', function(e) {
  console.log('Mouse moved by x: %d and y: %d px',
    e.movementX || 0,
    e.movementY || 0
  )
}, false);


// CSS: :fullscreen (:-moz-full-screen)