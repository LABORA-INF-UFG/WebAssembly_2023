import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';

const port = 3000

const app = express();
app.use(express.static('public'));
app.use(cors())

const server = createServer(app)
  .listen(port, () =>
    console.log(`Server running on port ${port}`)
  );