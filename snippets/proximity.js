window.addEventListener('userproximity', function(evt) {
	console.log(evt.near ? 'Hello' : 'Come closer!');
}, true);