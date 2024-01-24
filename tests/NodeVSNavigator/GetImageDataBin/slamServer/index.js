import { createServer } from "node:http";
import fs from 'fs';
import { Server } from "socket.io";

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
    let frameIndex = 1

    socket.on("frame", async (frame, callback) => {
        const frameData = new Uint8ClampedArray(frame.data);
        const frameBuffer = Buffer.from(frameData.buffer)
        fs.writeFileSync(`./imageData/${frameIndex}.bin`, frameBuffer);
        frameIndex++;
        callback();
    });
});
