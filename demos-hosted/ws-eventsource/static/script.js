
var Chat = {

	init: function() {
		this.$output = $('#chat-output');

		var host = location.host.replace(/:.*/, '');
		console.log('Connecting to ' + host);
		var ws = new WebSocket('ws://' + host + ':8080');
		ws.onmessage = function (event) {
			var data = JSON.parse(event.data);
			switch (data.event) {
				case 'joined':
					Chat.appendMessage('One more, now we are ' + data.count, 'count');
					break;
				case 'left':
					Chat.appendMessage('One down, ' + data.count + ' remaining', 'count');
					break;
				case 'broadcast':
					Chat.appendMessage(data.text);
					break;

			}
		};
		ws.onclose = function (event) {
			Chat.appendMessage('Connection lost', 'count');
			$('#chat').hide();
		};
		$('#chat-input').on('submit', function(evt) {
			evt.preventDefault();
			var $input = $(this).find('input')
			var value = $input.val();
			if (value) {
				console.log(value);
				ws.send(JSON.stringify({
					event: 'broadcast',
					text: value
				}));
				Chat.appendMessage(value, 'own');
			}
			$input.val('')[0].focus();
		});
	},

	appendMessage: function(message, cls) {
		var $entry = $('<div class="chat-line">').text(message);
		Chat.$output.append($entry);
		if (cls) {
			$entry.addClass(cls);
		}

		// Truncate
		while (Chat.$output.children().size() > 15) {
			Chat.$output.children().last().remove();
		}
	}

};


var Stream = {

	init: function() {
		// Our empty list, to be filled with fresh tweets
		this.$list = $('#tweets');
		this.empty = true;

		// Our event source instance, listening to /events
		var eventSrc = new EventSource('events');

		eventSrc.addEventListener('open', function (event) {
			console.log('Opened /events');
		});

		eventSrc.addEventListener('hello', function (event) {
			var data = JSON.parse(event.data);
			var title = 'Tweets with ' + data.track;
			document.title = title;
			$('#tweets-title').text(title);
		});

		eventSrc.addEventListener('tweet', function (event) {
			var data = JSON.parse(event.data);

			if (Stream.first) {
				Stream.$list.empty();
				first = false;
			}

			// Convert tweet into element
			var $row = $('<div class="row">'),
				$cell = $('<div class="span8 offset2">'),
				$entry = $('<div class="tweet new">').append(
				$('<a class="user">')
					.text('@' + data.user)
					.prop('target', '_blank')
					.prop('href', 'http://twitter.com/' + data.user),
				$('<span>')
					.html(' ' + data.text)
			);
			$row.append($cell.append($entry));

			// Inject element into DOM
			Stream.$list.prepend($row);

			// Smoothly animate with CSS3
			$entry[0].offsetHeight; // force redraw
			$entry.removeClass('new');

			// Truncate
			while (Stream.$list.children().size() > 50) {
				Stream.$list.children().eq(0).remove();
			}
		});
	}

};


Chat.init();
Stream.init();
