interface Frame {
    data: any
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