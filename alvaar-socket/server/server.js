import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './alva_ar.js';

const app = express();
const server = createServer(app);
const sockets = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.static('public'));

sockets.on('connection', async (socket) => {
  const width = 364;
  const height = 674;
  const alva = await AlvaAR.Initialize(width, height);

  socket.on('frame', async (frame) => {
    const data = await processVideo(alva, frame);

    socket.emit('processed frame', data);
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

function processVideo(alva, frame) {
  const pose = alva.findCameraPose(frame);
  const planePose = alva.findPlane();
  const dots = alva.getFramePoints();

  return {
    pose: pose ? pose : null,
    planePose: planePose ? planePose : null,
    dots: dots
  };
}