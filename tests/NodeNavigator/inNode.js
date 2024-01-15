import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import { AlvaAR } from './public/scripts/alva_ar.js';


let count = 0;
let totalTime = 0;

// Function to process each frame and get image data using canvas
async function processFrames() {
    const frameFiles = fs.readdirSync('./public/photos');

    frameFiles.sort((a, b) => {
        let aNumber = parseInt(a);
        let bNumber = parseInt(b);
        
        return aNumber - bNumber;
    });

    const firstImage = await loadImage('./public/photos/1.png');
    
    const alva = await AlvaAR.Initialize(firstImage.width, firstImage.height)
    const canvas = createCanvas(firstImage.width, firstImage.height);
    const ctx = canvas.getContext('2d');

    for (const frameFile of frameFiles) {
        const framePath = `./public/photos/${frameFile}`;
        const image = await loadImage(framePath);
        ctx.drawImage(image, 0, 0);
        // Use getImageData to get pixel data
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let startSlam, endSlam
                    
        await new Promise (resolve =>  {
            startSlam = performance.now()

            const pose =  alva.findCameraPose(frame);
            const planePose = alva.findPlane();
            const dots =  alva.getFramePoints();

            endSlam = performance.now()

            count++;

            resolve()
        })
                                
        totalTime += (endSlam-startSlam)
       
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

// Run the main function sequentially using async/await
async function runExperiments() {
    let numberExperiments = 30;
    fs.appendFileSync(`./inNodeResults/experimet_results_node.csv`, 'Node Average Slam Time,Total Frames\n');        

    while (numberExperiments--) {
        await main();
    }
}

// Run the experiments
runExperiments();

