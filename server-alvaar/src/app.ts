// @ts-ignore
import { AlvaAR } from '../libraries/alva_ar.js';
import express from 'express'
import fs from 'fs'

const app = express()
app.use(express.json());
const port = 3000
const videoPath = 'assets/video.mp4';

app.get('/', async (req, res) => {
  res.send(JSON.stringify({
    message: "OK",
    status: true
  }))
})

app.post('/video', async (req, res) => {
  const stat = fs.statSync(videoPath);

  // TODO: Get dimensions dynamically
  const width = 364;
  const height = 674;

  const alva: AlvaAR = await AlvaAR.Initialize(width, height);

  // const pose = alva.findCameraPose( frame );

  res.send(JSON.stringify(req.body))
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

