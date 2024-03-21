import { workerData, parentPort, Worker } from "worker_threads";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { AlvaAR } from "./alva_ar.js";

const { width, height } = workerData;

const __dirname = dirname(fileURLToPath(import.meta.url));

const alva = await AlvaAR.Initialize(width, height);
const sender = new Worker(__dirname + "/sender.js")

parentPort.on("message", (message) => makeSLAM(message))

function makeSLAM(message) {
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

    const {data: frame} = message;

    sender.postMessage({
        frame,
        ...message,
        data, 
        totalSlamTime: end - start, 
    });
}
