import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './alva_ar.js';

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