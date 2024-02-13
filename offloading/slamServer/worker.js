import { workerData, parentPort } from "worker_threads";
import { AlvaAR } from "./alva_ar.js";

const { width, height } = workerData;

const alva = await AlvaAR.Initialize(width, height);

parentPort.on("message", async (message) => {
    const start = performance.now();

    const pose = alva.findCameraPose(message);
    const planePose = alva.findPlane();
    const dots = alva.getFramePoints();
    const end = performance.now();

    const data = {
        pose: pose ? pose : null,
        planePose: planePose ? planePose : null,
        dots: dots,
    };

    parentPort.postMessage([data, end - start]);
});
