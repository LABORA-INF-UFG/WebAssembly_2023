import { Stats } from "./stats.js";
import { ARSimpleView, ARSimpleMap } from "./view.js";
import { Video, onFrame } from "./utils.js";

async function main() {
    document.body.appendChild(Stats.el);
    Stats.add('total');
    Stats.add('video');
    Stats.add('slam');

    const media = await Video.Initialize('./video.mp4');

    const $cam = document.getElementById('renderer-cam');
    const $map = document.getElementById('renderer-map');
    const ctx = document.getElementById('renderer-video').getContext('2d');

    ctx.canvas.width = media.width;
    ctx.canvas.height = media.height;

    const mapRenderer = new ARSimpleMap($map, media.width, media.height);
    const camRenderer = new ARSimpleView($cam, media.width, media.height, mapRenderer);

    let doFindPlane = false;

    $cam.addEventListener('click', (event) => doFindPlane = true);
    $cam.parentElement.style.display = 'block';

    media.el.play();
    media.el.loop = false;
    media.el.onended = (event) => {
        media.el.load();
        media.el.play();
        camRenderer.reset();
    };
    ctx.fillStyle = 'red';

    onFrame(async () => {

        Stats.next();
        Stats.start('total');

        Stats.start('video');
        const frame = media.getImageData();

        ctx.clearRect(0, 0, media.width, media.height);
        ctx.putImageData(frame, 0, 0);
        Stats.stop('video');

        Stats.start('slam');

        let pose = null;
        let planePose = null;
        let dots = [];
        
        try {
            if (!frame)
            return;
        
            const bodyObj = {
                width: frame.width,
                height: frame.height,
                data: Object.values(frame.data)
            }
            
            const response = await fetch("http://localhost:3001/video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyObj),
            });

            const body = await response.json();
            
            if (!body)
            return;

            if(body.pose) {
                pose = new Float32Array(body.pose);
            }

            if(body.planePose) {
                planePose = new Float32Array(body.planePose);
            }

            if(body.dots) {
                dots = body.dots;
            }
        } catch (e) {
            console.error(e)
        }

        Stats.stop('slam');

        if (pose) {
            camRenderer.updateCameraPose(pose);

            if (doFindPlane) {
                if (planePose) {
                    camRenderer.createObjectWithPose(planePose);
                    doFindPlane = false;
                }
            }
        } else {
            camRenderer.lostCamera();
        }
       
        for (const p of dots) {
            ctx.fillStyle = 'white';
            ctx.fillRect(p.x, p.y, 2, 2);
        }
        
        Stats.stop('total');
        Stats.render();

        return true;
    }, 30);
}

window.addEventListener('load', main);