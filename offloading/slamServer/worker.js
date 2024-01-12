const { workerData, parentPort } = require('worker_threads')

const { alva } = workerData;

parentPort.once('message', (message) => {
    const frame = message;

    const start = performance.now();

    const pose = alva.findCameraPose(frame);
    const planePose = alva.findPlane();
    const dots = alva.getFramePoints();

    const end = performance.now();

    const data = {
        pose: pose ? pose : null,
        planePose: planePose ? planePose : null,
        dots: dots,
      };

    parentPort.postMessage([data, end - start]);
})
