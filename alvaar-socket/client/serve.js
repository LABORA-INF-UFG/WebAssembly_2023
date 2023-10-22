import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);

app.use(express.static('public'));

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});