import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import { exec }from 'child_process';
import { AlvaAR } from './public/scripts/alva_ar.js';

const videoPath = './public/videos/wasm.mp4';
const outputDirectory = './frames';
let count = 0;
let totalTime = 0;


if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

// Function to extract frames from a video using ffmpeg
function extractFrames(videoPath, outputDirectory) {
    return new Promise((resolve, reject) => {
        const command = `ffmpeg -i ${videoPath} -vf fps=30 ${outputDirectory}/frame-%04d.png`;

        exec(command, (error, stdout, stderr) => {
        if (error) {
            reject(`Error extracting frames: ${stderr || error.message}`);
        } else {
            resolve('Frames extracted successfully.');
        }
        });
    });
}

// Function to process each frame and get image data using canvas
async function processFrames() {
    const frameFiles = fs.readdirSync(outputDirectory);
    const firstImage = await loadImage('./frames/frame-0001.png');
    
    const alva = await AlvaAR.Initialize(firstImage.width, firstImage.height)
    const canvas = createCanvas(firstImage.width, firstImage.height);
    const ctx = canvas.getContext('2d');

    for (const frameFile of frameFiles) {
        const framePath = `${outputDirectory}/${frameFile}`;
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

// Main function to execute the process
async function main() {
    try {
        await extractFrames(videoPath, outputDirectory);
        await processFrames();

        const timeAverage = totalTime / count;
        const totalFrames = count;

        const csvData = `${timeAverage},${totalFrames}\n`;
        fs.appendFileSync(`./inNodeResults/experimet_results_node.csv`, csvData);
        // Delete all PNG files in the output directory
        const pngFiles = fs.readdirSync(outputDirectory).filter((file) => file.endsWith('.png'));

        for (const pngFile of pngFiles) {
            const filePath = `${outputDirectory}/${pngFile}`;
            fs.unlinkSync(filePath);
            
        }


    } catch (error) {
        console.error(error);
    }
}

// Run the main function sequentially using async/await
async function runExperiments() {
    let numberExperiments = 3;
    while (numberExperiments) {
        await main();
        numberExperiments--;
        count = 0;
        totalTime = 0;
    }
}

// Run the experiments
runExperiments();

