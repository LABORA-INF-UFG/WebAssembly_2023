import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 8080;

const app = express();
app.use(express.static(__dirname + '/imageData'));
app.use(express.static(__dirname + '/public'));
app.use(cors())

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/test.html');
})

app.listen(port, () => {
  console.log(`Serving static files on port ${port}`)
})
