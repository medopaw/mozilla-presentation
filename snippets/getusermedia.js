var video = document.getElementById('my-video');
// TODO: Find options
navigator.getUserMedia({'video': true}, function(mediaStream) {
  video.src = URL.createObjectURL(mediaStream);
  video.play();
}, function(error) {
  console.error('Video capture error: ', error.code);
});

// Capture
var ctx = myCanvas.getContext('2d');
ctx.drawImage(video, 0, 0);