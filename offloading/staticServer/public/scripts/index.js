import { Video, getCSV } from "/scripts/utils.js";
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const senderUrl= "localhost:3000";
//const senderUrl= "192.168.10.2:3000";

const eventStart = new Event("start");
const eventEnd = new Event("end");

const initializeAll = async (width, height) => {
    const socket = io(senderUrl, { reconnection: false });
    
    await new Promise(resolve => {
        socket.io.on("error", (error) => {
            error = new Error("Could not connect to " + senderUrl);
            window.alert("Não foi possível conectar ao servidor");
            console.error(error);
        });
        resolve();
    });

    const worker =  await new Promise(resolve => {
        socket.on('connect', () => {
            socket.emit('initialize alva', {width, height}, () => {

                const $cam = document.getElementById('renderer-cam');
                $cam.parentElement.style.display = 'block';

                const videoCanvas3d = document.getElementById('canvas-3d-video').transferControlToOffscreen();
                videoCanvas3d.height = height;
                videoCanvas3d.width = width;

                const mapCanvas3d = document.getElementById('canvas-3d-map').transferControlToOffscreen();
                mapCanvas3d.height = height;
                mapCanvas3d.width = width;
                
                const videoCanvas = document.getElementById('renderer-video').transferControlToOffscreen();
                videoCanvas.height = height;
                videoCanvas.width = width;

                const worker = new Worker('/scripts/worker.js', {type: 'module'});        
                
                worker.postMessage({canvas: mapCanvas3d, messageId:"canvas-3d-map", devicePixelRatio: window.devicePixelRatio}, [mapCanvas3d]);
                worker.postMessage({canvas: videoCanvas3d, messageId:"canvas-3d-video", devicePixelRatio: window.devicePixelRatio}, [videoCanvas3d]);
                worker.postMessage({canvas: videoCanvas, messageId:"renderer-video"}, [videoCanvas]);
                worker.postMessage({messageId:"connect to server"});

                worker.onmessage = (message) => {
                    resolve(worker);
                }
            })
        })
    });

    return [socket, worker];
}

async function main(){
    const media = await Video.Initialize('/videos/wasm.mp4');
    let videoHasEnded = false;

    const initializeAllPromisse = initializeAll(media.width, media.height);
    const [socket, worker] = await initializeAllPromisse;
    
    let frameIndex = 1;
    let fpsTimer = 0;

    const saveFrame = () => {
        if(frameIndex === 0) {
            fpsTimer = performance.now();
        }

        const startSegmentationTime = performance.now();
        const frame = media.getImageData();
        const endSegmentationTime = performance.now();

        const totalSegmentationTime = endSegmentationTime - startSegmentationTime;
  
        const request = {
            width: frame.width,
            height: frame.height,
            data: frame.data,
            frameIndex,
            startClientServerTime: Date.now(),
            totalSegmentationTime,
        };

        socket.emit('frame', request);        
        frameIndex++;

        if (!videoHasEnded) {
            media.el.requestVideoFrameCallback(saveFrame);
        }
    }

    if (socket && worker) {
        media.el.play();
        media.el.loop = false;
        
        worker.onmessage = (statistics) => {
            const time = (performance.now() - fpsTimer) / 1000;
            const fps = (statistics.data.length -  1) / time;
            statistics.data[0].push('fps');
            statistics.data[1].push(fps);

            getCSV(statistics.data, "offloading"); 
            window.dispatchEvent(eventEnd);
        };

        media.el.onended = () => {
            const totalFrames = frameIndex;
            console.log("Ultimo frame: "+ totalFrames)
            videoHasEnded = true;

            worker.postMessage({messageId:"ended video", totalFrames: totalFrames})
        };

        window.dispatchEvent(eventStart);
        media.el.requestVideoFrameCallback(saveFrame);
    }
}

window.addEventListener('load', main);
