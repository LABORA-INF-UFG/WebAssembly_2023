import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './alva_ar.js';

const app = express();
const server = createServer(app);
const sockets = new Server(server);


app.use(express.static('public'));

sockets.on('connection', async (socket) => {
  const width = 364;
  const height = 674;

  const alva = await AlvaAR.Initialize(width, height);
  
  function processVideo(frame) {

    const pose = alva.findCameraPose(frame); 
    const planePose =  alva.findPlane();
    const dots =  alva.getFramePoints(); 
    
    return {
      pose: pose,
      planePose :planePose,
      dots: dots
    };

  }
  
  console.log("id: " + socket.id);
  socket.on('frame', async (frame) => {
      
    const data = await processVideo(frame);
    
      socket.emit('processed frame', data);
  });
  
}); 


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});