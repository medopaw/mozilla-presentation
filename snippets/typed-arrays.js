// a buffer with 16 bytes
var buffer = new ArrayBuffer(16);
// a view treating the data as 32-bit signed integers
var int32View = new Int32Array(buffer);
// Access the fields in the array just like a normal array
for (var i=0; i < int32View.length; i++) {
  int32View[i] = i*2;
}

worker.postMessage = worker.webkitPostMessage || worker.postMessage;

var bigData = new ArrayBuffer(1);
// // New argument: postMessage(message, targetOrigin, transferables);
worker.postMessage({other: 'data', data: bigData}, [bigData]);
if (bigData.byteLength) {
  console.error('Transferables are not supported in your browser!');
} else {
  // Buffer got reset, transferables are supported.
}