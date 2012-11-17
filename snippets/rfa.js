var lastTime = null;
var tick = function(now) {
  now = Date.now()
  if (lastTime) myGameUpdate(now - lastTime); // ms since last tick
  lastTime = now;
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);


// Performance timer with sub-millisecond resolution
var lastTime = null;
var tick = function(now) {
  now = (now && now > 1e12) ? now : Date.now()
  if (lastTime) myGameUpdate(now - lastTime); // ms since last tick
  lastTime = now;
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);