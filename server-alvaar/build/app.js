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
import fs from "fs";
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(cors());
const port = 3000;
// TODO: Get dimensions dynamically
const width = 364;
const height = 674;
const alvaPromise = AlvaAR.Initialize(width, height);
function log(obj, callback) {
    try {
        fs.writeFile("./log.json", JSON.stringify(obj), callback);
    }
    catch (error) {
        console.error(error);
    }
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "OK",
        status: true,
    });
}));
app.post("/video", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alva = yield alvaPromise;
    const { width, height, data } = req.body;
    const frame = {
        width,
        height,
        data: new Uint8ClampedArray(data)
    };
    const pose = alva.findCameraPose(frame);
    console.log(pose);
    res.json(pose);
}));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
