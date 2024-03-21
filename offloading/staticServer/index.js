import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 8080;

const app = express();
app.use((req, res, next) => {
  // Add headers here
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.static(__dirname + '/public'));
app.use(cors())

app.listen(port, () => {
  console.log(`Serving static files on port ${port}`)
})
