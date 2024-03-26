function saveFrame(media, socket) {
    const startSegmentationTime = performance.now();
    const frame = media.getImageData();
    const endSegmentationTime = performance.now();

    const totalSegmentationTime = endSegmentationTime - startSegmentationTime;

    const request = {
        width: frame.width,
        height: frame.height,
        data: frame.data,
        frameIndex: media.frameIndex,
        startClientServerTime: Date.now(),
        totalSegmentationTime,
    };

    socket.emit("frame", request);

    media.frameIndex++;

    if (!media.videoHasEnded) {
        media.el.requestVideoFrameCallback(() => saveFrame(media, socket));
    }
}

function renderFrame(message, ctx, camRenderer, media) {
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

    const screenTime = performance.now() - media.startScreenTime;
    ctx.clearRect(0, 0, media.width, media.height);
    ctx.putImageData(frameImageData, 0, 0);
    media.startScreenTime = performance.now();

    if (pose) {
        camRenderer.updateCameraPose(pose);

        if (document.addCube && planePose) {
            camRenderer.createObjectWithPose(planePose);
            document.addCube = false;
        }
    }

    for (const dot of dots) {
        ctx.fillStyle = "white";
        ctx.fillRect(dot.x, dot.y, 2, 2);
    }

    const endRenderTime = performance.now();

    const totalRenderTime = endRenderTime - startRenderTime;

    return [
        totalSlamTime,
        totalRenderTime,
        totalSegmentationTime,
        totalClientServerTime,
        totalServerClientTime,
        screenTime,
    ];
}

export { saveFrame, renderFrame };
