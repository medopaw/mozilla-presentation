navigator.geolocation.getCurrentPosition(function(position) {
  var coords = position.coords;
  myMapUpdate(
    coords.latitude, coords.longitude, // (double in decimal degrees)
    coords.altitude, // (double in meters)
    coords.heading, // (double, degrees clockwise from true north)
    coords.speed // (double in meters/second)
  );
}, function(error) {
  if (error.code == 1) { // Permission denied
    myGracefulFallback();
  }
}, {maximumAge: 75000});