import { ARSimpleView, ARSimpleMap } from "/scripts/view.js";
import { getCSV } from "/scripts/utils.js";
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

const recieverUrl = "localhost:3001";
const width = 480;
const height = 848;


const InitializeAll = async () => {
    const canvas = document.createElement('canvas');
    const offscreen = canvas.transferControlToOffscreen();
    
    const worker = new Worker('/scripts/worker.js',  {type: "module"})
    worker.postMessage({ canvas: offscreen }, [offscreen]);

    const socket = await new Promise((resolve) => {
        worker.onmessage = (message) => {
            const socket = io(recieverUrl, { reconnection: false });
    
            socket.on("connect", () => {

                resolve(socket);
            })
        }
    })
    
    await new Promise(resolve => {
        socket.io.on("error", (error) => {
            error = new Error("Could not connect to " + senderUrl);
            window.alert("Não foi possível conectar ao servidor");
            console.error(error);
        });
        resolve();
    });

    return [socket, worker];
};

async function main() {
    let totalFrames = 0; 

    let statistics = [
        [
            "slamTime",
            "networkTime",
            "renderTime",
            "segmentationTime",
            "totalClientServerTime",
            "totalServerClientTime",
        ],
    ];

    const $cam = document.getElementById("renderer-cam");
    const $map = document.getElementById("renderer-map");
    const ctx = document.getElementById("renderer-video").getContext("2d");

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const mapRenderer = new ARSimpleMap($map, width, height);
    const camRenderer = new ARSimpleView($cam, width, height, mapRenderer);
    $cam.parentElement.style.display = "block";

    let addCube = false;
    let fpsTimer = 0;
    let addCubeInterval = null;

    const receiveFrame = (message) => {
        message.totalServerClientTime = Date.now() - message.startServerClientTime;
        delete message.startServerClientTime;

        const {
            frame,
            width,
            height,
            totalSegmentationTime,
            startServerTime,
            frameIndex,
            data,
            totalSlamTime,
            totalServerClientTime,
            totalClientServerTime,
        } = message;

        // console.log('frameIndex - ' + frameIndex);
        // console.log('frameIndex2 - ' + frameIndex2);

        // console.log(queue.size());
        // console.log( frameIndex === frameIndex2);
        //console.log(totalSlamTime);

        const endServerTime = performance.now();
        const totalServerTime = endServerTime - startServerTime;
        const totalNetworkTime = totalServerClientTime + totalClientServerTime;

        let pose = null;
        let planePose = null;
        let dots = [];

        if (data) {
            if (data.pose) {
                pose = new Float32Array(data.pose);
            }

            if (data.planePose) {
                planePose = new Float32Array(data.planePose);
            }

            if (data.dots) {
                dots = data.dots;
            }
        }

        const frameImageData = new ImageData(
            new Uint8ClampedArray(frame),
            width,
            height
        );

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
            ctx.fillStyle = "white";
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


        if (message.frameIndex  === totalFrames) {
            const time = (performance.now() - fpsTimer) / 1000;
            const fps = (statistics.length - 1) / time;
            statistics[0].push("fps");
            statistics[1].push(fps);
            ctx.clearRect(0, 0, width, height);
            addCubeInterval && clearInterval(addCubeInterval);
            getCSV(statistics, "offloading"); // Uncomment to save statistics in CSV file
            window.dispatchEvent(eventEnd);
        }
    };

    const ininitializePromisse = InitializeAll();
    const [socket, worker] =  await ininitializePromisse;

    if (socket && worker) {

        socket.on('responseFrame', (message) => receiveFrame(message));

        //Quando acabar o video faça ...
        worker.onmessage = (message) => {
            totalFrames = message;

        }

        addCubeInterval = setInterval(() => {
            addCube = true;
        }, 200);
        
        worker.postMessage("getFrames");

    }
}

window.addEventListener("load", main);
