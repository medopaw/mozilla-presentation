Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: http://example.com

// Business as usual
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.another-server.com/public-data.json');
xhr.onload = function(e) {
  var data = JSON.parse(this.response);
}
xhr.send();