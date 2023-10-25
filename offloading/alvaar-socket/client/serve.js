import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const port = 5000;

app.use(express.static('public'));

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});