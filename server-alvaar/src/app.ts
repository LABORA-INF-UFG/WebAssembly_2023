// @ts-ignore
import { AlvaAR } from "../libraries/alva_ar.js";
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(cors());
const port = 3000;

// TODO: Get dimensions dynamically
const width = 364;
const height = 674;

const alvaPromise = AlvaAR.Initialize(width, height);

function log(obj: any, callback: any) {
    try {
        fs.writeFile(
            "./log.json",
            JSON.stringify(obj),
            callback
        );
    } catch (error) {
        console.error(error)
    }
}

app.get("/", async (req, res) => {
    res.json({
        message: "OK",
        status: true,
    });
});

async function processVideo(frame: any) {
    const alva = await alvaPromise;

    const pose = alva.findCameraPose(frame); 
    const planePose = alva.findPlane(); 
    const dots = alva.getFramePoints(); 
    

    return {
        pose: pose == null? null: Object.values(pose),
        planePose: planePose == null? null: Object.values(planePose),
        dots: dots == null ? null : dots
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
