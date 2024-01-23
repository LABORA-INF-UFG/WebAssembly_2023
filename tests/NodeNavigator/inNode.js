import fs from 'fs';
import { createCanvas, Image } from 'canvas';
import { AlvaAR } from './public/scripts/alva_ar.js';

let count = 0;
let totalTime = 0;

async function processFrames() {
    const frameFiles = fs.readdirSync('./public/photos');

    frameFiles.sort((a, b) => {
        let aNumber = parseInt(a);
        let bNumber = parseInt(b);
        
        return aNumber - bNumber;
    });

    const width = 480;
    const height = 848;

    const alva = await AlvaAR.Initialize(width, height)
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    for (const frameFile of frameFiles) {
        const framePath = `./public/photos/${frameFile}`;
        //console.log(frameFiles)
        const image = new Image();
        await new Promise(resolve => {
            image.onload = () => {
                ctx.clearRect(0, 0, width, height)
                ctx.drawImage(image, 0, 0, width, height);
                const frame = ctx.getImageData(0, 0, width, height);
                //console.log(frame)
                const startSlam = performance.now()
    
                const pose =  alva.findCameraPose(frame);
                const planePose = alva.findPlane();
                const dots =  alva.getFramePoints();
    
                const endSlam = performance.now()
                
                totalTime += (endSlam-startSlam)
    
                count++;
                resolve()
            }
            image.src = framePath    

        })    
  }
}

async function main() {
    try {
        await processFrames();

        const timeAverage = totalTime / count;
        const totalFrames = count;
        const csvData = `${timeAverage},${totalFrames}\n`;
        fs.appendFileSync(`./inNodeResults/experimet_results_node.csv`, csvData);        
        
        count = 0;
        totalTime = 0;

    } catch (error) {
        console.error(error);
    }
}
 
async function runExperiments() {
    let numberExperiments = 15;
    fs.appendFileSync(`./inNodeResults/experimet_results_node.csv`, 'Node Average Slam Time,Total Frames\n');        

    while (numberExperiments--) {
        await main();
    }
}

// Run the experiments
runExperiments();

