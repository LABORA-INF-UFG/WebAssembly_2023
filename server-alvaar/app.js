
import { AlvaAR } from './assets/alva_ar.js';
import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000
const videoPath = './assets/video.mp4';

app.get('/', async (req, res) => {
  const stat = fs.statSync(videoPath);
  const alva = await AlvaAR.Initialize( 300, 300 );

  console.log(alva)

  const responseObject = {
    stat
  }  

  res.send(JSON.stringify(responseObject))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

