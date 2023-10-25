// @ts-ignore
import { AlvaAR } from "./alva_ar.js";
import express from "express";
import cors from "cors";
import fs from "fs";

// TODO: Get dimensions dynamically
const width = 364;
const height = 674;
const port = 3001;
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(cors());

const alvaPromise = AlvaAR.Initialize(width, height);

export function log(obj) {
    try {
        fs.appendFileSync("./log.json", JSON.stringify(obj) + '\n');
    }
    catch (error) {
        console.error(error);
    }
}

async function processVideo(frame) {
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
