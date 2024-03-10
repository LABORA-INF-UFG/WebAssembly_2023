import { createServer } from "node:http";
import { Server } from "socket.io";
import { workerData, parentPort } from "worker_threads";
import { AlvaAR } from "./alva_ar.js";

const { width, height } = workerData;

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

const alva = await AlvaAR.Initialize(width, height);

sockets.on("connection", (socket) => {
    const makeSLAM = (message) => {
        // console.log('start make slam - ' + performance.now().toFixed(2))
        
        const start = performance.now();
        // console.log('start - ' + start)
        
        const pose = alva.findCameraPose(message);
        const planePose = alva.findPlane();
        const dots = alva.getFramePoints();
        
        const end = performance.now();
        
        // console.log('end - ' + end)
        
        const data = {
            pose: pose ? pose : null,
            planePose: planePose ? planePose : null,
            dots: dots,
        };
        

        const response = {
            data,
            totalSlamTime: end - start,
            frameIndex: message.frameIndex,
            totalClientServerTime: message.totalClientServerTime,
            startServerClientTime: Date.now()
            
        }
        
        socket.emit('responseFrame', response);
        
        // console.log("processei frame - " + message.frameIndex);
        // console.log('end make slam - ' + performance.now().toFixed(2))
    }
    
    parentPort.on("message", (message) => makeSLAM(message));
});
