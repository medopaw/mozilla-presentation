var request = navigator.mozSms.send(myNumber, "Hello World!");
request.onsuccess = function() {
  var message = request.result;
  console.log(
    message.delivery, // 'sent' or 'received'
    message.read // boolean
  );
}
request.onerror = function(error) {
  console.error('Could not send message: ' + error);
}