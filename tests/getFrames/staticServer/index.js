import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3001;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors())

app.listen(port, () => {
  console.log(`Serving static files on port ${port}`)
})
