import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './alva_ar.js';

const server = createServer().listen(3000);

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
    if (!alva) {
      return;
    }

    const start = performance.now(); 

    const data = await processVideo(alva, frame);
    
    const end = performance.now();

    const slamTime = end - start;

    data.slamTime = slamTime;
    
    callback(data, frame.indexFrame);
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
    slamTime: null
  };
}