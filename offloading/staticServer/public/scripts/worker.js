import { ARSimpleView, ARSimpleMap } from "/scripts/view.js";
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
// const recieverUrl= "localhost:3001";
const receiverUrl = "192.168.10.2:3001";

let statistics = [[
    'slamTime',
    'networkTime',
    'renderTime',
    'segmentationTime',
    'totalClientServerTime',
    'totalServerClientTime'
]];

let addCube = false;
let totalFrames = 0;
const addCubeInterval = setInterval(() => {
    addCube = true;
}, 200);

let camRenderer = null;
let mapRenderer = null;
let ctx = null;
let socket = null;

const receiveFrame = (message) => {

    message.totalServerClientTime = Date.now() - message.startServerClientTime;
    delete message.startServerClientTime;

    const {
        frame,
        width,
        height,
        totalSegmentationTime,
        frameIndex,
        data,
        totalSlamTime,
        totalServerClientTime,
        totalClientServerTime
    } = message;

    const totalNetworkTime = totalServerClientTime + totalClientServerTime;

    let pose = null;
    let planePose = null;
    let dots = [];

    if (data) {
        if (data.pose) {
            pose = new Float32Array(data.pose)
        }

        if (data.planePose) {
            planePose = new Float32Array(data.planePose)
        }

        if (data.dots) {
            dots = data.dots
        }
    }

    const frameImageData = new ImageData(new Uint8ClampedArray(frame), width, height);

    const startRenderTime = performance.now();

    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(frameImageData, 0, 0);

    if (pose) {
        camRenderer.updateCameraPose(pose);

        if (addCube && planePose) {
            camRenderer.createObjectWithPose(planePose);
            addCube = false;
        }
    }

    for (const dot of dots) {
        ctx.fillStyle = 'white';
        ctx.fillRect(dot.x, dot.y, 2, 2);
    }

    const endRenderTime = performance.now();

    const totalRenderTime = endRenderTime - startRenderTime;

    statistics.push([
        totalSlamTime,
        totalNetworkTime,
        totalRenderTime,
        totalSegmentationTime,
        totalClientServerTime,
        totalServerClientTime,
    ]);

    if (message.frameIndex === totalFrames - 1) {

        console.log("entrou");
        self.postMessage(statistics);

        ctx.clearRect(0, 0, width, height);
        addCubeInterval && clearInterval(addCubeInterval);
    }
}

self.onmessage = (message) => {

    if (message.data.messageId === "canvas-3d-map") {
        const mapCanvas3d = message.data.canvas;
        mapCanvas3d.style = { width: mapCanvas3d.width, height: mapCanvas3d.height };

        mapRenderer = new ARSimpleMap(
            mapCanvas3d,
            mapCanvas3d.width,
            mapCanvas3d.height,
            message.data.devicePixelRatio
        );


    } else if (message.data.messageId === "canvas-3d-video") {
        const videoCanvas3d = message.data.canvas;
        videoCanvas3d.style = { width: videoCanvas3d.width, height: videoCanvas3d.height };
        camRenderer = new ARSimpleView(
            videoCanvas3d,
            videoCanvas3d.width,
            videoCanvas3d.height,
            message.data.devicePixelRatio,
            mapRenderer
        );

    } else if (message.data.messageId === "renderer-video") {
        const videoCanvas = message.data.canvas;
        videoCanvas.style = { width: videoCanvas.width + "px", height: videoCanvas.height + "px" };
        ctx = videoCanvas.getContext('2d');


    } else if (message.data.messageId === "connect to server") {
        socket = io(receiverUrl, { reconnection: false });
        socket.on('connect', () => {

            socket.on("responseFrame", (message) => {
                receiveFrame(message);
            });

            self.postMessage("worker connected to server")

        })

    } else if (message.data.messageId === "ended video") {
        totalFrames = message.data.totalFrames;
    }
}



