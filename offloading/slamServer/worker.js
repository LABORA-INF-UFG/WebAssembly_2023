import { workerData, parentPort } from 'worker_threads';
import { AlvaAR } from './alva_ar.js';


parentPort.on('message', async (message) => {
  const frame = message;
  const alva = await AlvaAR.Initialize(frame.width, frame.height);

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
