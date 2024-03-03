import { Video } from "/scripts/utils.js";

const senderUrl= "localhost:3000";
const eventStart = new Event("start");
const eventEnd = new Event("end");


const initializeServer = async (width, height) => {
    const socket = io(senderUrl, { reconnection: false });

    await new Promise(resolve => {
        socket.io.on("error", (error) => {
            error = new Error("Could not connect to " + senderUrl);
            window.alert("Não foi possível conectar ao servidor");
            console.error(error);
        });
        resolve();
    });

    const reciever = await new Promise((resolve) => socket.on('connect', () => {

        socket.emit('initialize alva', { width, height }, () => {
            const reciever = new Worker("/scripts/reciever.js", {type: 'module'});

            setTimeout(() => resolve(reciever), 3000);
        });
    }));

    return [socket, reciever];
}

async function main(){
    const media = await Video.Initialize('/videos/wasm.mp4');
    const [socket, reciever] = await initializeServer(media.width, media.height);

    let frameIndex = 0;
	let fpsTimer = 0;

    let videoHasEnded = false;


    const saveFrame = () => {
        if(frameIndex === 0) {
            fpsTimer = performance.now();
        }
    
        const startSegmentationTime = performance.now();
        const frame = media.getImageData();
        const endSegmentationTime = performance.now();

        const totalSegmentationTime = endSegmentationTime - startSegmentationTime;

        const startServerTime = performance.now();

        reciever.postMessage({ frame, totalSegmentationTime, startServerTime, frameIndex });
        
        const request = {
            data: frame.data,
            frameIndex,
            startClientServerTime: Date.now()
        };

        socket.emit('frame', request);
        
        //const time = new Date(Date.now());
        //console.log(`frame ${frameIndex} enviado as ${time.toISOString()}`)

        frameIndex++;

        if (!videoHasEnded) {
            media.el.requestVideoFrameCallback(saveFrame);
        }
    }

    if (socket && reciever) {
        media.el.play();
        media.el.loop = false;
        
        media.el.onended = () => {
            videoHasEnded = true
            reciever.postMessage("endVideo");
        };
        
        window.dispatchEvent(eventStart);
        media.el.requestVideoFrameCallback(saveFrame);
    }

}

window.addEventListener('load', main);
