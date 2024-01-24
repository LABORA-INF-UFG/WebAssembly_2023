import { workerData, parentPort } from 'worker_threads';
import { AlvaAR } from './alva_ar.js';

const { width, height } = workerData;

const alva = await AlvaAR.Initialize(width, height);


parentPort.on('message', async (message) => {
  // console.log(`threadArrive: ${start}ms`);
  
  
  // console.log(message[1023])
  // const frameData = {
  //   width,
  //   height,
  //   data: message
  // };
  
  // console.log("aqui")
  
  const start = performance.now();

  const pose = alva.findCameraPose(message);
  const planePose = alva.findPlane();
  const dots = alva.getFramePoints();

  const end = performance.now();
  
  // console.log(frameData)
  
  // const dat = {
  //   pose: pose ? pose : null,
  //   planePose: planePose ? planePose : null,
  //   dots: dots,
  // };
  
  // console.log(data);
  
  // console.log(`threadSend: ${end}ms`);

  // const poseBuffer = new Float32Array(pose)

  // console.log(pose)
  parentPort.postMessage(end - start);
})
