
import { AlvaAR } from './assets/alva_ar.js';
import express from 'express'
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const alva = await AlvaAR.Initialize( 300, 300 );

  console.log(alva)
  console.log(Object.keys(alva))

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

