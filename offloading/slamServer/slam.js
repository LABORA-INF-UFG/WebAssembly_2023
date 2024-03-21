import { workerData, parentPort, Worker } from "worker_threads";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { AlvaAR } from "./alva_ar.js";
import { createCanvas, Image } from 'canvas';
import { Blob } from 'node:buffer';

const { width, height } = workerData;

const __dirname = dirname(fileURLToPath(import.meta.url));

const alva = await AlvaAR.Initialize(width, height);
const sender = new Worker(__dirname + "/sender.js")
const canvas = createCanvas(width, height)

async function dataUrlToImageData(dataUrl) {
    if (dataUrl === undefined || dataUrl === null) {
        return;
    }

    const context = canvas.getContext('2d');
    const image = new Image();

    return new Promise(resolve => {
        image.onload = () => {
            context.drawImage(image, 0, 0, width, height);
            const imageData = context.getImageData(0, 0, width, height);
            resolve(imageData);
        }

        image.src = dataUrl;
    })
}

function imageDataToDataUrl(imageData) {
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
}

async function blobToImageData(blob) {
    const canvas = createCanvas(width, height)

    const url = URL.createObjectURL(blob);         // create an Object URL
    const img = new Image();                       // create a temp. image object
    let context = null;

    return new Promise(resolve => {
        img.onload = () => { // handle async image loading
            console.log('aqui')
            URL.revokeObjectURL(img.src); // free memory held by Object URL
            context = canvas.getContext("2d")
            context.drawImage(img, 0, 0); // draw image onto canvas (lazy method™)
            const imageData = context.getImageData(0, 0, width, height);
            resolve(imageData);
        };

        img.src = url;
    })

}

parentPort.on("message", (message) => makeSLAM(message))

async function makeSLAM(message) {
    // const blob = new Blob(message.blob, {type: 'image/png'});
    // const a = await blobToImageData(blob);

    const { dataUrl } = message;
    const b = await dataUrlToImageData(dataUrl);

    const start = performance.now();
    const pose = alva.findCameraPose(b);
    const planePose = alva.findPlane();
    const dots = alva.getFramePoints();
    const end = performance.now();


    const data = {
        pose: pose ? pose : null,
        planePose: planePose ? planePose : null,
        dots: dots,
    };

    const { data: frame } = message;

    sender.postMessage({
        frame,
        dataUrl,
        ...message,
        data,
        totalSlamTime: end - start,
    });
}
