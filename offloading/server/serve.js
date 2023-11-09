import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './public/scripts/alva_ar.js';
import express from 'express';
import cors from 'cors';

const port = 3000;

const app = express();
app.use(express.static('public'));
app.use(cors())

const server = createServer(app).listen(port);

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
      return callback(undefined, start - end);
    }

    const data = processVideo(alva, frame);
    
    const end = performance.now();

    const slamTime = end - start;

    data.slamTime = slamTime;
    
    callback(data, slamTime);
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