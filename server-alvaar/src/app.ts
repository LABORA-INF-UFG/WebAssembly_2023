// @ts-ignore
import { AlvaAR } from "../libraries/alva_ar.js";
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(cors());
const port = 3000;
const videoPath = "../assets/video.mp4";

// TODO: Get dimensions dynamically
const width = 364;
const height = 674;

const alvaPromise = AlvaAR.Initialize(width, height);

app.get("/", async (req, res) => {
    res.json({
        message: "OK",
        status: true,
    });
});

app.post("/video", async (req, res) => {
    const alva = await alvaPromise;
    
    console.log(req.body.width);
    console.log(req.body.height);
    console.log( typeof req.body.data);
    // fs.writeFile("/log.json", req.body.toString(), (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     // ficheiro escrito com sucesso
    // });

    const pose = alva.findCameraPose(req.body);

    res.json(pose);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
