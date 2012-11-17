  window.addEventListener('deviceorientation',function(event){
	  // gamma is the left-to-right tilt in degrees, where right is positive
	  var tiltLR = event.gamma;
	  // beta is the front-to-back tilt in degrees, where front is positive
	  var tiltFB = event.beta;
	  // alpha is the compass direction the device is facing in degrees
	  var dir = event.alpha

    // call our orientation event handler
    myRotateSth(tiltLR, tiltFB, dir);
  },false);