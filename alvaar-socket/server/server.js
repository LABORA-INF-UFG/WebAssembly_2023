import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './alva_ar.js';

const server = createServer().listen(3000);

const sockets = new Server(server, {
  cors: {
    origin: "*"
  }
});

sockets.on('connection', async (socket) => {
  const width = 364;
  const height = 674;
  const alva = await AlvaAR.Initialize(width, height);

  socket.on('frame', async (frame) => {
    const data = await processVideo(alva, frame);

    socket.emit('processed frame', data);
  });

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