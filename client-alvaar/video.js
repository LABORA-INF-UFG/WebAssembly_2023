import { Stats } from "./stats.js";
import { AlvaAR } from './alva_ar.js';
import { ARSimpleView, ARSimpleMap } from "./view.js";
import { Video, onFrame } from "./utils.js";

async function main() {
    document.body.appendChild(Stats.el);
    Stats.add('total');
    Stats.add('video');
    Stats.add('slam');

    const media = await Video.Initialize('./video.mp4');
    const alva = await AlvaAR.Initialize(media.width, media.height);

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

    onFrame(async () => {
        Stats.next();
        Stats.start('total');

        Stats.start('video');
        const frame = media.getImageData();

        ctx.clearRect(0, 0, media.width, media.height);
        ctx.putImageData(frame, 0, 0);
        Stats.stop('video');

        Stats.start('slam');

        // const pose = alva.findCameraPose(frame);
        // console.log(pose)

        let pose = null;

        try {
            if (!frame)
                return;

            const bodyObj = {
                width: frame.width,
                height: frame.height,
                data: Object.values(frame.data)
            }

            console.log(JSON.stringify(bodyObj));

            const response = await fetch("http://localhost:3000/video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyObj),
            });

            const body = await response.json();


            if (!body)
                return;

            pose = new Float32Array(body)

            console.log(pose);
        } catch (e) {
            console.error(e)
        }

        Stats.stop('slam');

        if (pose) {
            camRenderer.updateCameraPose(pose);

            if (doFindPlane) {
                const planePose = alva.findPlane();

                if (planePose) {
                    camRenderer.createObjectWithPose(planePose);
                    doFindPlane = false;
                }
            }
        }
        else {
            camRenderer.lostCamera();

            const dots = alva.getFramePoints();

            for (const p of dots) {
                ctx.fillStyle = 'white';
                ctx.fillRect(p.x, p.y, 2, 2);
            }
        }

        Stats.stop('total');
        Stats.render();

        return true;
    }, 30);
}

window.addEventListener('load', main);