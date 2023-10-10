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
import { AlvaAR } from '../libraries/alva_ar.js';
import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;
const videoPath = 'assets/video.mp4';
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stat = fs.statSync(videoPath);
    const alva = yield AlvaAR.Initialize(300, 300);
    console.log(alva);
    const responseObject = {
        stat
    };
    res.send(JSON.stringify(responseObject));
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
