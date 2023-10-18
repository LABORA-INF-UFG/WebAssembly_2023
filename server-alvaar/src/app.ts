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

type PlanePose = Float32Array // Size: 16

interface Dot {
    x: number
    y: number
}

type Dots = Dot[]

type Pose = Float32Array // Size: 16

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


// TODO: Get dimensions dynamically
const width = 364;
const height = 674;
const port = 3000;
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(cors());

const alvaPromise = AlvaAR.Initialize(width, height);

export function log(obj: any) {
    try {
        fs.appendFileSync("./log.json", JSON.stringify(obj) + '\n');
    }
    catch (error) {
        console.error(error);
    }
}

async function processVideo(frame: Frame) {
    const alva = await alvaPromise;

    const pose = alva.findCameraPose(frame); 
    let planePose = null;

    if(pose) {
        planePose = alva.findPlane(); 
    }

    const dots = alva.getFramePoints(); 
    
    return {
        pose: pose ? Object.values(pose) : null,
        planePose: planePose ? Object.values(planePose) : null,
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
