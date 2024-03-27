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
    let slam;

    socket.on("initialize alva", (dimensions, callback) => {
        const { width, height } = dimensions;
        slam = new Worker(__dirname + "/slam.js", {
            workerData: { width, height },
        });

        worker.once("message", () => {
                
                worker.on("message", (message) => {
                    
                    message.startServerClientTime = Date.now();

                    socket.emit("responseFrame", message);
                })
                
                callback();
            
        });
    });

    socket.on("frame", (message) => {
        message.totalClientServerTime = Date.now() - message.startClientServerTime;
        delete message.startClientServerTime;

        worker.postMessage(message);
    });

});
