var canvas = document.getElementById('myPaper');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(200,0,0)';
ctx.fillRect (10, 10, 55, 50);
ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
ctx.fillRect (30, 30, 55, 50);

var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
var buffer = ctx.createImageData(image);
var data = canvas.data;
var target = buffer.data

for (i = 0; i < data.length; i += 4) {
	bufpix[i] = data[i];

  var r = data[i];
  var g = data[i+1];
  var b = data[i+2];
  var a = data[i+3];
}