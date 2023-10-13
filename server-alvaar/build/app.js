var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import { AlvaAR } from "../libraries/alva_ar.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(cors());
const port = 3000;
const videoPath = "../assets/video.mp4";
// TODO: Get dimensions dynamically
const width = 364;
const height = 674;
const alvaPromise = AlvaAR.Initialize(width, height);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "OK",
        status: true,
    });
}));
app.post("/video", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alva = yield alvaPromise;
    console.log(req.body.width);
    console.log(req.body.height);
    console.log(typeof req.body.data);
    // fs.writeFile("/log.json", req.body.toString(), (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     // ficheiro escrito com sucesso
    // });
    const pose = alva.findCameraPose(req.body);
    res.json(pose);
}));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
