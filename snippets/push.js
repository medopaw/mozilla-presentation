var push = navigator.push;
// Ask the user to allow notifications
var request = push.requestURL(waToken, publicKey);
request.onsuccess = function() {
  var url = request.result.url;
  // We got a new push URL, store it on the server.
  jQuery.post('/my-push-urls/', {url: url});
};