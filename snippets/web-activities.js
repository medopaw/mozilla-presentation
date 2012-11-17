// Declarative registration
"activities": {
  "share": {
    "filters": {
      "type": ["image/png", "image/gif"]
    },
    "href": "foo.html",
    "disposition": "window"
  }
}


// Launch an activity: Pick an image
var act = new Activity({
  name: "pick",
  data: { type: "image/png", multiple: false }
});
act.onsuccess = function() {
  processMyImage(a.result);
});
act.onerror = function() {
  alert("Oops: " + this.result.error.name);
});

// Register to handle an activity:
// Pick a png image and return what the user had picked
var req = navigator.registerActivityHandler({
  name: "pick",
  disposition: "inline",
  filters: { type: "image/png", "image/gif" },
  returnValue: true
});
req.onerror = function() { alert("failed to register activity"); }

navigator.setMessageHandler('activity', function(act) {
  showMyImageSelector(function(img) {
    if (!image) {
      act.postError("NoImage");
      return;
    }
    act.postResult({ type: "image/png", url: image });
  });
});