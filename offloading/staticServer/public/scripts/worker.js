import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import getVideoFrames from "https://deno.land/x/get_video_frames@v0.0.10/mod.js"

const senderUrl= "localhost:3000";
let socket;
const width = 480;
const height = 848;

self.onmessage = async (message) => {

    if(message.data === "getFrames"){
        for(let frameIndex = 1; frameIndex <= 1800; frameIndex++){
            const res = await fetch(`/imageData/${frameIndex}.bin`);
            const buffer = await res.arrayBuffer();
            const data = new Uint8ClampedArray(buffer);
            const frame = new ImageData(data, width, height);
        
            const totalSegmentationTime = 0;
            
            const startServerTime = performance.now();

            const request = {
                width: frame.width,
                height: frame.height,
                data: frame.data,
                frameIndex,
                startClientServerTime: Date.now(),
                totalSegmentationTime,
                startServerTime
            };

            socket.emit('frame', request);
        }
           
    }else{

        //const canvas = message.data.canvas;

        //canvas.width = width;
        //canvas.height = height;

        //const ctx = canvas.getContext("2d", { willReadFrequently: true });
        
        socket = io(senderUrl, { reconnection: false });
        
        socket.on('connect',  () => {
            socket.emit('initialize alva', {width, height}, () => {
                self.postMessage("inicializou servidor")
            })    
        });

    }
 
}


