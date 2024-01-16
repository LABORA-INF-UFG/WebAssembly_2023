import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Worker } from 'worker_threads';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

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
  let worker;

  socket.on('initialize alva', async (dimensions, callback) => {
    const { width, height } = dimensions;
    worker = new Worker(__dirname + '/worker.js', {
      workerData: { width, height }
    });
    callback();
  });

  socket.on('frame', async (frame, callback) => {

    const threadStart = performance.now()

    worker.once('message', (message) => {
      const threadEnd = performance.now();
      const slamTime = message[1];

      const threadTime = (threadEnd - threadStart - slamTime).toFixed(2);

      console.log(`threadTime: ${threadTime}ms`);
      // console.log(`slamTime: ${slamTime}ms`);

      callback(message)
    });

    // const memory = new SharedArrayBuffer(1024 * 1024 * 100)
    const arr = new Uint8ClampedArray(frame.data);

    // for(let i = 0; i < frame.data.byteLength; i++) {
    //   arr[i] = frame.data[i]

    // }
    // console.log(...b)

    // worker.postMessage(b, [b.buffer]);
    worker.postMessage(arr)
  });
});
