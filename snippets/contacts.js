var record = {givenName: 'Harald', familyName: 'Kirschner'},
  contact = new mozContact();
contact.init(record);
var request = navigator.mozContacts.save(contact);
request.onsuccess = function() {
  // .result is mozContact with id
  console.log('Saved contact #' + request.result.id);
};
request.onerror = function(error) {
  console.error('Could not save contact: ' + error);
};


var request = navigator.mozContacts.find({});
request.onsuccess = function () {
  console.log(request.result.length + ' mozContacts');
  listMyContacts(request.result);
}
// Find contact by id:
// find({filterBy: ["id"], filterOp: "equals", filterValue: myId})