// my_task.js will run in its background threads
var worker = new Worker('my_task.js');
worker.addEventListener('message', function(event) {
  console.log('Worker send a message back: ' + event.data);
}, false);

// Start the worker.
worker.postMessage(JSON.stringify(myWorkerData));