// Load dynamically
var audio = new Audio();
audio.src = 'song.ogg';
audio.addEventListener('audioAvailable', function() {
  audio.play();
}, false);

// Create new instance
var output = new Audio();
output.setup(1, 44100);

// Write samples using a JS Array
var samples = [0.242, 0.127, 0.0, -0.058, -0.242, ...];
output.writeAudio(samples);

// Tone generation: Pulsing audio
samples = new Float32Array(22050);
for (var i = 0; i < samples.length ; i++) {
  samples[i] = Math.sin( i / 20 );
}
output.writeAudio(samples);