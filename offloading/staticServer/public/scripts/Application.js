import { ARSimpleView, ARSimpleMap } from "/scripts/view.js";
import { getCSV } from "/scripts/utils.js";


class Application {
    constructor(media, socket){
        this.media = media;
        this.socket = socket;

        const $cam = document.getElementById("renderer-cam");
        const $map = document.getElementById("renderer-map");
        this.ctx = document.getElementById("renderer-video").getContext("2d");

        this.ctx.canvas.width = this.media.width;
        this.ctx.canvas.height = this.media.height;

        const mapRenderer = new ARSimpleMap($map, this.media.width, this.media.height);
        this.camRenderer = new ARSimpleView($cam, this.media.width, this.media.height, mapRenderer);

        $cam.parentElement.style.display = "block";

        this.addCube = false;
        this.addCubeInterval = setInterval(() => {
            this.addCube = true;
        }, 200);

        this.fpsTimer = performance.now();
        this.statistics = [
            [
                "slamTime",
                "renderTime",
                "segmentationTime",
                "totalClientServerTime",
                "totalServerClientTime",
                "screenTime",
            ],
        ];

    }
    
    saveFrame() {
        
        const startSegmentationTime = performance.now();
        const frame = this.media.getImageData();
        const endSegmentationTime = performance.now();
    
        const totalSegmentationTime = endSegmentationTime - startSegmentationTime;
    
        const request = {
            width: frame.width,
            height: frame.height,
            data: frame.data,
            frameIndex: this.media.frameIndex,
            startClientServerTime: Date.now(),
            totalSegmentationTime,
        };
    
        this.socket.emit("frame", request);
    
        this.media.frameIndex++;
    
        if (!this.media.videoHasEnded) {
            this.media.el.requestVideoFrameCallback(() => this.saveFrame());
        }
    }

    renderFrame(message) {
        message.totalServerClientTime = Date.now() - message.startServerClientTime;
        delete message.startServerClientTime;
    
        const {
            frame,
            width,
            height,
            totalSegmentationTime,
            data,
            totalSlamTime,
            totalServerClientTime,
            totalClientServerTime,
        } = message;
    
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
    
        const screenTime = performance.now() - this.media.startScreenTime;
        this.ctx.clearRect(0, 0, this.media.width, this.media.height);
        this.ctx.putImageData(frameImageData, 0, 0);
        this.media.startScreenTime = performance.now();
    
        if (pose) {
            this.camRenderer.updateCameraPose(pose);
    
            if (this.addCube && planePose) {
                this.camRenderer.createObjectWithPose(planePose);
                this.addCube = false;
            }
        }
    
        for (const dot of dots) {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(dot.x, dot.y, 2, 2);
        }
    
        const endRenderTime = performance.now();
    
        const totalRenderTime = endRenderTime - startRenderTime;
    
        this.statistics.push([
            totalSlamTime,
            totalRenderTime,
            totalSegmentationTime,
            totalClientServerTime,
            totalServerClientTime,
            screenTime,
        ]); 

        if (this.media.videoHasEnded && message.frameIndex === this.media.totalFrames - 1) {
            const time = (performance.now() - this.fpsTimer) / 1000;
            const fps = (this.statistics.length - 1) / time;
            this.statistics[0].push("fps");
            this.statistics[1].push(fps);
            this.ctx.clearRect(0, 0, this.media.width, this.media.height);
            this.addCubeInterval && clearInterval(this.addCubeInterval);
            getCSV(this.statistics, "offloading"); // Uncomment to save statistics in CSV file
            window.dispatchEvent(eventEnd);
        }
    }
}
 
export { Application };
