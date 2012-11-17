var url = 'streams/events';
var eventSrc = new EventSource(url);
eventSrc.addEventListener('open', function (event) {
  console.log(event.type + ': ' + event.data);
});
eventSrc.addEventListener('article', function (event) {
  var article = JSON.parse(event.data);
  console.log('New article: ' + article.title);
});

event: message
data: Anything goes here

event: article
data: {"title":"New Stuff!","url": "http://…","time":138567945679}