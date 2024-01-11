const { workerData, threadId, parentPort } = require('worker_threads')

function work() {
    console.log({
        ...workerData,
        threadId
    })
}

parentPort.once('message', (message) => {
    console.log(message);

    parentPort.postMessage("Oi da main thread")
  })

work();