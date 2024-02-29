import { createServer } from "node:http";
import { Server } from "socket.io";
import { Worker } from "worker_threads";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;

class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }
    get printQueue() {
        return this.items;
    }
    size() {
        return this.backIndex - this.frontIndex;
    }
    isEmpty() {
        return this.size === 0;
    }
}

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
    const queue = new Queue();

    socket.on("initialize alva", async (dimensions, callback) => {
        const { width, height } = dimensions;
        worker = new Worker(__dirname + "/worker.js", {
            workerData: { width, height },
        });
        callback();
    });
    
    worker.on("message", (message) => {
        socket.emit('responseFrame', message);

        if(!queue.isEmpty()) {
            const frame = queue.dequeue();
            worker.postMessage(frame);
        }
    });

    socket.on("frame", async (frame) => {
        if(queue.isEmpty()) {
            worker.postMessage(frame);
        } else {
            queue.enqueue(frame);
        } 
    });

});
