import { workerData, parentPort } from "worker_threads";
import { AlvaAR } from "./alva_ar.js";

const { width, height } = workerData;

const alva = await AlvaAR.Initialize(width, height);

parentPort.postMessage("alva initialized")

parentPort.on("message", (message) =>  makeSlam(message));

function makeSlam(message) {
    const startSlamTime = performance.now();

    const pose = alva.findCameraPose(message);
    const planePose = alva.findPlane();
    const dots = alva.getFramePoints();

    const endSlamTime = performance.now();
    
    const data = {
        pose: pose ? pose : null,
        planePose: planePose ? planePose : null,
        dots: dots,
    };


    parentPort.postMessage({ 
        networkFrameIndex: message.networkFrameIndex,
        totalSlamTime: endSlamTime - startSlamTime,
        data
    });
}
