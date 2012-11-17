
// Un-prefix


var Drop = {

	init: function() {
		Drop.input = $('#upload')[0];

		$(Drop.input).on('change', Drop.process);

		$('#action-store').on('click', Drop.store);

		Drop.storage = null;
		if (navigator.getDeviceStorage) {
			Drop.storage = navigator.getDeviceStorage('pictures');
			$(document.body).addClass('has-storage');
		}
	},

	process: function() {
		var file = Drop.input.files[0] || null;
		if (!file) {
			return;
		}

		Drop.file = file;

		var reader = new FileReader();
		reader.onload = function(evt) {
			// Or as style
			$(document.body).css(
				'backgroundImage',
				'url(' + evt.target.result + ')'
			).addClass('state-loaded');
		}
		reader.readAsDataURL(file);

		/* Another way ...
		// Load image into canvas to convert into data URL
		var blob = URL.createObjectURL(file),
			img = new Image();
		img.onload = function() {
			// Draw image on canvas
			var canvas = document.createElement('canvas');
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			var context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);

			// Convert image into data URL
			$(document.body).css(
				'backgroundImage',
				'url(' + canvas.toDataURL(file.type) + ')'
			).addClass('state-loaded');

			// Free memory
			URL.revokeObjectURL(blob);
		};
		img.src = blob;
		*/
	},

	store: function() {
		var name = Drop.file.name,
			storage = navigator.getDeviceStorage('pictures');

		var request = storage.addNamed(Drop.file, name);
		request.onsuccess = function() {
			alert(name + ' saved!');
			// storage.delete(name);
		};
		request.onerror = function() {
			alert('Error: ' + this.result);
		};
	}

};

Drop.init();