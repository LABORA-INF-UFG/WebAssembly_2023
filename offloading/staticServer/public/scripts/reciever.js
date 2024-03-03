import { ARSimpleView, ARSimpleMap } from "/scripts/view.js";
import { getCSV, Queue } from "/scripts/utils.js";
const recieverUrl =  "localhost:3001";

//const socket = io(recieverUrl, { reconnection: false });
const queue = new Queue();

self.onmessage = (message) => {
    queue.enqueue(message);
}

const width = 480;
const height = 848;

const $cam = document.getElementById('renderer-cam');
const $map = document.getElementById('renderer-map');
const ctx = document.getElementById('renderer-video').getContext('2d');

ctx.canvas.width = width;
ctx.canvas.height = height;

const mapRenderer = new ARSimpleMap($map, width, height);
const camRenderer = new ARSimpleView($cam, width, height, mapRenderer);
$cam.parentElement.style.display = 'block';

let videoHasEnded = false;
let addCube = false;

addCubeInterval = setInterval(() => {
    addCube = true;
}, 200);

let statistics = 
			[
				[ 
					'slamTime', 
					'networkTime',
					'renderTime', 
					'segmentationTime',
					'totalClientServerTime',
					'totalServerClientTime'
				]
			];

const receiveFrame = (message) => {
	if (message === "endVideo"){
        videoHasEnded = true;
        return;
    }		
    
    message.totalServerClientTime = Date.now() - message.startServerClientTime;
    delete message.startServerClientTime;

    const item = queue.dequeue();

    if(!item) {
        console.log("fila vazia")
        return;
    }

    const {data, totalSlamTime, totalServerClientTime, totalClientServerTime } = message;
    const frameIndex2 = message.frameIndex;

    const { frame, totalSegmentationTime, startServerTime, frameIndex } = item;
    
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
            pose = new Float32Array(data.pose)
        }

        if (data.planePose) {
            planePose = new Float32Array(data.planePose)
        }

        if (data.dots) {
            dots = data.dots
        }
    }

    const startRenderTime = performance.now();

    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(frame, 0, 0);

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

    if(queue.isEmpty() && videoHasEnded){
        //const time = (performance.now() - fpsTimer) / 1000;
        const fps = 0
        //const fps = (statistics.length -  1) / time;
        statistics[0].push('fps');
        statistics[1].push(fps);
        ctx.clearRect(0, 0, width, height);
        addCubeInterval && clearInterval(addCubeInterval);
        getCSV(statistics, "offloading"); // Uncomment to save statistics in CSV file 
        window.dispatchEvent(eventEnd);
    }
}

socket.on('responseFrame', (message) => receiveFrame(message));