interface Frame {
    data: Uint8ClampedArray
    width: number
    height: number
}

type Pose = Float32Array[16]

interface Media {
    el: HTMLVideoElement,
    width: number,
    height: number,
    _canvas: HTMLCanvasElement,
    _ctx: CanvasRenderingContext2D
}

interface AlvaAR {
    wasm: any
    system: any
    intrinsics: Intrinsics
    memCam: any
    memObj: any
    memPts: any
    memIMU: any
    memImg: any
}

interface Intrinsics {
    width: number
    height: number
    fx: number
    fy: number
    cx: number
    cy: number
    k1: number
    k2: number
    p1: number
    p2: number
}