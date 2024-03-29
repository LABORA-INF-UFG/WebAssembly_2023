import { ARSimpleView, ARSimpleMap } from "/scripts/view.js";
import { getCSV, Queue } from "/scripts/utils.js";


class Application {

    queueMaxSize = 15;
    queue = new Queue();

    frameIndex = 0;
    totalFrames = 0;
    hasEnded = false;

    ctx = document.getElementById("renderer-video").getContext("2d");

    addCube = false;
    addCubeInterval = setInterval(() => {
        this.addCube = true;
    }, 200);

    statistics = [
        [
            "slamTime",
            "renderTime",
            "segmentationTime",
            "screenTime",
        ],
    ];
    
    constructor(media, socket, width, height){
        this.media = media;
        this.socket = socket;        

        this.width = width;
        this.height = height;

        const $cam = document.getElementById("renderer-cam");
        const $map = document.getElementById("renderer-map");

        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        const mapRenderer = new ARSimpleMap($map, width, height);
        this.camRenderer = new ARSimpleView($cam, width, height, mapRenderer);

        $cam.parentElement.style.display = "block";

        this.fpsTimer = performance.now();
        this.startScreenTime = performance.now();

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
            this.width,
            this.height
        );
    
        const startRenderTime = performance.now();
    
        const screenTime = performance.now() - this.startScreenTime;
        this.ctx.clearRect(0, 0, this.width, this.height);
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
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.addCubeInterval && clearInterval(this.addCubeInterval);
            getCSV(this.statistics, "offloading"); // Uncomment to save statistics in CSV file
            window.dispatchEvent(new Event("end"));
        }
    }
}
 
export { Application };
