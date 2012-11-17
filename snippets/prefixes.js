element.requestFullScreen =
  element.requestFullScreen    ||
  element.mozRequestFullScreen ||
  element.webkitRequestFullScreen;

element.requestFullScreen(element.ALLOW_KEYBOARD_INPUT);