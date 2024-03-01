import { workerData, parentPort } from "worker_threads";
import { AlvaAR } from "./alva_ar.js";

const { width, height } = workerData;

const alva = await AlvaAR.Initialize(width, height);

/**
 * 
const slamLoop = setInterval(async () => {
    const message = queue.dequeue();
    
    if(!message) return;
    
}, 1);
*/

parentPort.on("message", (message) => {
    // queue.enqueue(message);
    makeSLAM(message)
})

function makeSLAM(message) {
    // console.log('start make slam - ' + performance.now().toFixed(2))

    const start = performance.now();
    // console.log('start - ' + start)

    const pose = alva.findCameraPose(message);
    const planePose = alva.findPlane();
    const dots = alva.getFramePoints();
    const end = performance.now();

    // console.log('end - ' + end)

    const data = {
        pose: pose ? pose : null,
        planePose: planePose ? planePose : null,
        dots: dots,
    };

    parentPort.postMessage([data, end - start, message.frameIndex]);
    // console.log("processei frame - " + message.frameIndex);
    // console.log('end make slam - ' + performance.now().toFixed(2))
}
