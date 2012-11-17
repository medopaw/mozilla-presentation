var name = "my-cat-with-80s-camera-filter.png",
  storage = navigator.getDeviceStorage("pictures");
  request = storage.addNamed(myImageBlob, name);
request.onsuccess = function() {
  console.log('%d saved', this.result.name);
  // storage.delete(name)
};
request.onerror = function() {
  console.log('Could not save picture, #' + this.result.code);
};

storage.stat().onsuccess = function() {
  console.log(
    '%d bytes available of %d bytes',
    this.result.freeBytes,
    this.result.totalBytes
  )
}