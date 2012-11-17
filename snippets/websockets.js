var ws = new WebSocket('ws://echo.websocket.org/');
ws.onopen = function (evt) {
  ws.send('Rock it with Websockets!');
};
ws.onmessage = function (evt) {
  console.log('Got message: ' + evt.data);
};
ws.onclose = function(evt) {
  console.log('Disconnected');
};