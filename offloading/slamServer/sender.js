import { createServer } from "node:http";
import { Server } from "socket.io";
import { parentPort } from "worker_threads";

const port = 3001;

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
    
    parentPort.on("message", (message) => {
        message.startServerClientTime = Date.now();
        socket.emit('responseFrame', message)
    })

});
