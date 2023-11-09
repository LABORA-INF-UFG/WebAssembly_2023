import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { AlvaAR } from './alva_ar.js';

const port = 3000;

const server = createServer((req, res) => {
  if (req.url === "/close") {
    sockets.close();
    server.close();
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end('OK\n');
    return;
  }

}).listen(port, () =>
  console.log(`slam server running at http://localhost:${port}`)
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

  socket.on('frame', (frame, callback) => {
    if (!alva) {
      return callback(undefined);
    }

    const data = processVideo(alva, frame);
    return callback(data);
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