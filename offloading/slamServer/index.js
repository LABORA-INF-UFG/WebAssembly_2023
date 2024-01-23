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
  maxHttpBufferSize: 2 * 1024 * 1024
});

sockets.on('connection', (socket) => {
  let alva;

  socket.on('initialize alva', async (dimensions) => {
    const { width, height } = dimensions;
    alva = await AlvaAR.Initialize(width, height);
  });

  socket.on('frame', async (frame, callback) => { 
    if (!alva) {
      return callback([undefined, 0]);
    }
    
    const start = performance.now();

    const pose = alva.findCameraPose(frame);
    const planePose = alva.findPlane();
    const dots = alva.getFramePoints();
    
    const end = performance.now();

    const data = {
      pose: pose ? pose : null,
      planePose: planePose ? planePose : null,
      dots: dots,
    };

    callback([data, end - start]);
  });
});