// @ts-ignore
import { AlvaAR } from "../libraries/alva_ar.js";
import express from "express";
import cors from "cors";
import fs from "fs";

interface Frame {
    data: Uint8ClampedArray
    width: number
    height: number
}

type PlanePose = Float32Array[16]

interface Dot {
    x: number
    y: number
}

type Dots = Dot[]

type Pose = Float32Array[16]

interface Media {
    el: HTMLVideoElement,
    width: number,
    height: number,
    _canvas: HTMLCanvasElement,
    _ctx: CanvasRenderingContext2D
}

interface AlvaAR {
    wasm: any
    system: any
    intrinsics: Intrinsics
    memCam: any
    memObj: any
    memPts: any
    memIMU: any
    memImg: any
}

interface Intrinsics {
    width: number
    height: number
    fx: number
    fy: number
    cx: number
    cy: number
    k1: number
    k2: number
    p1: number
    p2: number
}

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(cors());
const port = 3000;

// TODO: Get dimensions dynamically
const width = 364;
const height = 674;

const alvaPromise = AlvaAR.Initialize(width, height);

function log(obj: any, callback: any = () => {}) {
    try {
        fs.writeFile("./log.json", JSON.stringify(obj), callback);
    }
    catch (error) {
        console.error(error);
    }
}

async function processVideo(frame: Frame) {
    const alva = await alvaPromise;

    const pose = alva.findCameraPose(frame); 
    let planePose = null;

    log("a");


    if(pose) {
        log("Call findPlane");
        planePose = alva.findPlane(); 
    }

    const dots = alva.getFramePoints(); 
    
    return {
        pose: !pose ? null : Object.values(pose),
        planePose: !planePose ? null : Object.values(planePose),
        dots
    }

}

app.post("/video", async (req, res) => {
    const { width, height, data } = req.body;

    const frame = {
        width,
        height,
        data: new Uint8ClampedArray(data)
    }

    const response = await processVideo(frame);
    res.json(response);
    
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
