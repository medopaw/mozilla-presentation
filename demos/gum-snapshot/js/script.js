
// Un-prefix
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || null;

var Gum = {

	init: function() {
		if (!navigator.getUserMedia) {
			alert('Requires navigator.getUserMedia!');
			return;
		}

		this.video = $('#stream')[0];
		this.preview = $('#preview')[0];

		// Ask for local MediaStream from camera
		navigator.getUserMedia({'video': true}, function(mediaStream) {
			$(document.body).addClass('state-started');

			Gum.video.onplay = function() {
				Gum.fitCanvas();
			}

		  Gum.video.src = URL.createObjectURL(mediaStream);
		  Gum.video.width = Gum.video.videoWidth;
			Gum.video.height = Gum.video.videoHeight;
			Gum.video.play();

		  Gum.fitCanvas();

		}, function(error) {
		  console.error('Video capture error: ', error.code);
		});

		$(document.body).on('click', function() {
			// Take a Snapshot!
			Gum.snapshot();
		});

		$(window).on('resize', Gum.fitCanvas);
		Gum.fitCanvas();
	},

	snapshot: function() {
		var canvas = Gum.preview;

		// Resize to video input
		canvas.width = Gum.video.videoWidth;
		canvas.height = Gum.video.videoHeight;

		// Draw video to canvas
		var ctx = canvas.getContext('2d');
		ctx.drawImage(Gum.video, 0, 0);

		// Save snapshot, do something with it
		// var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

		$(document.body).addClass('state-preview');
		setTimeout(function() {
			$(document.body).removeClass('state-preview');
		}, 1000);
	},

	fitCanvas: function() {
		var inner = [Gum.video.videoWidth, Gum.video.videoHeight],
			outer = [window.innerWidth, window.innerHeight],
			from = inner[0] / inner[1],
			to = outer[0] / outer[1];

		if (!inner) {
			return;
		}

		var style = {
			width: 'auto',
			height: 'auto'
		};

		if (from > to) {
			style.width = outer[0];
			style.height = style.width * from;
		} else {
			style.height = outer[1];
			style.width = style.height * from;
		}

		$(Gum.video).css(style);
		$(Gum.preview).css(style);
	}

};

Gum.init();