// TODO: Check proper error
var request = navigator.mozApps.getSelf();
request.onsuccess = function() {
  console.log(request.result.receipt);
});
request.onerror = function() {
  // Install if app is not installed
  if (!request.result) {
    navigator.mozApps.install('http://example.com/manifest.webapp');
  }
}