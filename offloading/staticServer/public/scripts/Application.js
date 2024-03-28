import { ARSimpleView, ARSimpleMap } from "/scripts/view.js";
import { getCSV, Queue } from "/scripts/utils.js";


class Application {
    constructor(media, socket){
        this.media = media;
        this.socket = socket;

        this.queue = new Queue();
        this.queueMaxSize = 15;

        this.frameIndex = 0;
        this.totalFrames = 0;
        this.hasEnded = false;

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
        this.startScreenTime = performance.now();

        this.statistics = [
            [
                "slamTime",
                "renderTime",
                "segmentationTime",
                "screenTime",
            ],
        ];

    }
    
    saveFrame() {
       
        if(this.queue.size() < this.queueMaxSize){
            const startSegmentationTime = performance.now();
            const frame = this.media.getImageData();
            const endSegmentationTime = performance.now();  
            const totalSegmentationTime = endSegmentationTime - startSegmentationTime;
    
            const request = {  
                data: frame.data,
                networkFrameIndex: this.frameIndex 
            };
    
            this.socket.emit("frame", request);

            this.queue.enqueue({
                frame: frame.data,
                queueFrameIndex: this.frameIndex,
                width: frame.width, 
                height: frame.height, 
                totalSegmentationTime 
            });

            this.frameIndex++;
     
        }

        if (!this.videoHasEnded) {
            this.media.el.requestVideoFrameCallback(() => this.saveFrame());
        }
    }

    renderFrame(message) {

        const {
            frame,
            queueFrameIndex,
            width,
            height,
            totalSegmentationTime
        } = this.queue.dequeue();
    
        const {
            networkFrameIndex,
            totalSlamTime,
            data
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
    
        const screenTime = performance.now() - this.startScreenTime;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.putImageData(frameImageData, 0, 0);
        this.startScreenTime = performance.now();
    
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
            screenTime,
        ]); 

        this.verifyEndExperiment(networkFrameIndex);
        
    }

    verifyEndExperiment(frameIndex) {
        if (this.videoHasEnded && frameIndex === this.totalFrames - 1) {
            console.log(this.totalFrames)
            const time = (performance.now() - this.fpsTimer) / 1000;
            const fps = (this.statistics.length - 1) / time;
            this.statistics[0].push("fps");
            this.statistics[1].push(fps);
            this.ctx.clearRect(0, 0, this.media.width, this.media.height);
            this.addCubeInterval && clearInterval(this.addCubeInterval);
            getCSV(this.statistics, "offloading"); // Uncomment to save statistics in CSV file
            window.dispatchEvent(new Event("end"));
        }
    }
}
 
export { Application };
