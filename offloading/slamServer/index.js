import { createServer } from "node:http";
import { Server } from "socket.io";
import { Worker } from "worker_threads";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;

const server = createServer().listen(port, () =>
    console.log(`Server running on port ${port}`)
);

const sockets = new Server(server, {
    cors: {
        origin: "*",
    },
    maxHttpBufferSize: 20 * 1024 * 1024,
});

sockets.on("connection", (socket) => {
    let worker;

    socket.on("initialize alva", (dimensions, callback) => {
        const { width, height } = dimensions;
        worker = new Worker(__dirname + "/worker.js", {
            workerData: { width, height },
        });

        setTimeout(() => callback(), 3000);
    });

    
    socket.on("frame", (message) => {
        // const time = new Date(Date.now());
        // console.log(`frame ${message.frameIndex} recebido as ${time.toISOString()}`)
        
        message.receivedTime = performance.now();
        
        // console.log('start receive frame - ' + performance.now().toFixed(2))
        worker.postMessage(message);
        // console.log('end receive frame - ' + performance.now().toFixed(2))
    });
});
