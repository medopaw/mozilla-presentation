var data = new FormData();

// Automatic string conversion for everything
data.append('username', 'digitarald');
data.append('accountnum', 123456);.
data.append('userfile', myFileInput.files[0]);

var req = new XMLHttpRequest();
req.open('POST', '/submit-form');
req.send(data);

// From Element
var data = new FormData(myFormElement);