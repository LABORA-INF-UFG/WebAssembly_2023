// @ts-ignore
import { AlvaAR } from '../libraries/alva_ar.js';
import express from 'express'
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors())
const port = 3000
const videoPath = 'assets/video.mp4';

// TODO: Get dimensions dynamically
const width = 364;
const height = 674;

let alva: AlvaAR | null = null;

app.get('/', async (req, res) => {
  res.json({
    message: "OK",
    status: true
  })
})

app.post('/initialize', async (req, res) => {
  alva = await AlvaAR.Initialize(width, height);

  res.send("AlvaAR initialized")
})

app.post('/video', async (req, res) => {
  console.log(req.body)

  res.json(req.body)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
