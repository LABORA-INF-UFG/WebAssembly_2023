import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './public/scripts/alva_ar.js';
import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors())

const server = createServer(app)
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

  socket.on('initialize alva', async (dimensions) => {
    const { width, height } = dimensions;
    alva = await AlvaAR.Initialize(width, height);
  });

  socket.on('frame', async (frame, callback) => {
    const start = performance.now();

    if (!alva) {
      const end = performance.now();
      return callback([undefined, end - start]);
    }

    const data = processVideo(alva, frame);

    const end = performance.now();

    callback([data, end - start]);
  });


});

function processVideo(alva, frame) {

  const pose = alva.findCameraPose(frame);
  const planePose = alva.findPlane();
  const dots = alva.getFramePoints();

  return {
    pose: pose ? pose : null,
    planePose: planePose ? planePose : null,
    dots: dots,
  };
}