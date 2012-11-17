var express = require('express'),
	app = express(express.logger());

// Set up express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

app.use(express.bodyParser());

// CORS middle-ware
app.use(function(req, res, next) {
	// the client should pass-through its origin
	var origin = req.headers.origin || '*';
	res.header('access-control-allow-origin', origin);
	res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS')
	res.header('access-control-allow-headers', 'Content-Type');
	next();
});


// Twitter Streamer

var users = [];

var twitter = require('ntwitter');
var twit = new twitter({
	consumer_key: 't6PNvZtHdIBuL1Vq6cByA',
	consumer_secret: 'ykFMv3MXWSmKq2tRIJKbUAsl81ZBhSmMmXFM0F5VC0',
	access_token_key: '14524462-w7YwXh4hnLVw8hoG4IvmxBf9uktFS4ShixmdQ3zrY',
	access_token_secret: 'OfeZOfBmrarIPHTCh6lo6xcW23AAndQ0WfpDpRTuzc'
});

var Streamer = {

	started: false,

	track: 'HTML5, FirefoxOS, JavaScript',

	start: function() {
		this.started = true;

		twit.stream('statuses/filter', {
			'track': this.track
		}, function(stream) {
			Streamer.stream = stream;

			stream.on('data', function(data) {
				if (!data.text) {
					return;
				}

				// Reduce data to useful keys
				var json = JSON.stringify({
					id: data.id_str,
					text: data.text,
					created_at: data.created_at,
					retweets: data.retweet_count,
					user: data.user.screen_name,
					user_name: data.user.name,
					user_img: data.user.profile_image_url
				});

				// Write data to all active event users
				var i = users.length;
				while (i--) {
					var channel = users[i];
					channel.write('event: tweet\n');
					channel.write('data: ' + json + '\n\n');
				}
			});

			stream.on('end', function(response) {
				Streamer.started = false;
				Streamer.stream = null;
			});
			stream.on('destroy', function(response) {
				// Handle a 'silent' disconnection from Twitter
				Streamer.started = false;
				Streamer.stream = null;
			});
		});
	}
};

// Example index
app.get('/', function(req, res) {
	res.render('index');
});


// Events handler

app.get('/events', function(req, res) {

	// Setup event channel
	res.type('text/event-stream');
	res.write('event: hello\n');
	res.write('data: ' + JSON.stringify({track: Streamer.track}) + '\n\n');

	// A new user
	users.push(res);

	console.log('Connected user ' + users.length);

	var onEnd = function() {
		var pos = users.indexOf(res);
		if (pos !== -1) {
			console.log('Removing %d', pos);
			users.splice(pos, 1);
		}
	};

	req.on('close', onEnd); // request closed unexpectedly
	// req.on('end', onEnd); // request ended normally

	if (!Streamer.started) {
		Streamer.start();
	}
});

var port = 8080;

app.listen(port, function() {
	console.log('Listening on ' + port);
});

// WebSocket handler and server

var wsockets = [];

var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({server: app});

wss.on('connection', function(ws) {
	console.log('connection');

	var uid = wsockets.push(ws);
	var broadcast = function(message) {
		wsockets.forEach(function(other_ws) {
			if (other_ws == ws) {
				return;
			}
			other_ws.send(message);
		});
	};

	ws.on('message', function(message) {
		console.log('message', message);
		broadcast(message);
	});
	ws.on('close', function() {
		wsockets.splice(wsockets.indexOf(ws), 1);
		broadcast(JSON.stringify({
			event: 'left',
			count: wsockets.length
		}));
	});

	broadcast(JSON.stringify({
		event: 'joined',
		count: wsockets.length
	}));
});
