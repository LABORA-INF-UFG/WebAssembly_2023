import { workerData, parentPort } from 'worker_threads';
import { AlvaAR } from './alva_ar.js';

const { width, height } = workerData;

const alva = await AlvaAR.Initialize(width, height);


parentPort.on('message', async (message) => {
  // console.log(message[0])
  const frameData = {
    data: message
  };

// console.log("aqui")

  const start = performance.now();

  const pose = alva.findCameraPose(frameData);
  const planePose = alva.findPlane();
  const dots = alva.getFramePoints();

  const end = performance.now();

  // console.log(frameData)

  const dat = {
    pose: pose ? pose : null,
    planePose: planePose ? planePose : null,
    dots: dots,
  };

  // console.log(data);

  parentPort.postMessage([dat, end - start]);
})
