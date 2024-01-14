import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Worker } from 'worker_threads';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AlvaAR } from './alva_ar.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;

const server = createServer()
  .listen(port, () =>
    console.log(`Server running on port ${port}`)
  );

const sockets = new Server(server, {
  cors: {
    origin: "*"
  },
  maxHttpBufferSize: 20 * 1024 * 1024
});

sockets.on('connection', (socket) => {
  let alva;
  const worker = new Worker(__dirname + '/worker.js');

  socket.on('initialize alva', async (dimensions, callback) => {
    const { width, height } = dimensions;
    alva = await AlvaAR.Initialize(width, height);
    callback();
  });

  socket.on('frame', async (frame, callback) => {
    if (!alva) {
      return callback([undefined, 0]);
    }

    worker.once('message', (message) => callback(message));

    worker.postMessage(frame);
  });
});
