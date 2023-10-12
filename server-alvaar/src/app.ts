// @ts-ignore
import { AlvaAR } from '../libraries/alva_ar.js';
import express from 'express'
import cors from 'cors';

const app = express()
app.use(express.json({limit: "100mb"}));
app.use(cors())
const port = 3000
const videoPath = 'assets/video.mp4';

// TODO: Get dimensions dynamically
const width = 1536;
const height = 445;

const alvaPromise = AlvaAR.Initialize(width, height);

app.get('/', async (req, res) => {
  res.json({
    message: "OK",
    status: true
  })
})

app.post('/video', async (req, res) => {
  // console.log("/video")
  const alva = await alvaPromise;

  const pose = alva.findCameraPose( req.body );
  console.log(pose)

  res.json(pose)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
