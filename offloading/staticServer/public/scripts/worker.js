import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import getVideoFrames from "https://deno.land/x/get_video_frames@v0.0.10/mod.js"

const senderUrl= "localhost:3000";
let frameIndex = 1;
const width = 480;
const height = 848;

self.onmessage = async (message) => {

    if(message.data === "getFrames"){
        const image = new Image();
        const framePath = `photos/${totalFrames}.png`;
        image.src = framePath;

        await new Promise((resolve) => {
            image.onload = () => {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(image, 0, 0, width, height);
                const frame = ctx.getImageData(
                    0,
                    0,
                    width,
                    height
                );

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
                
                frameCount++;

                resolve();
            };
        });

    }else{

        const canvas = message.data.canvas;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        
        const socket = io(senderUrl, { reconnection: false });
        
        socket.on('connect',  () => {
            socket.emit('initialize alva', {width, height}, () => {
                self.postMessage("inicializou servidor")
            })    
        });

    }
 
}


