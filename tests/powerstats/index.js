const process = require('process'); 


const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const os = require('os');
const fs = require('fs');

  
async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

async function measurePowerConsumption() {
    const usageStart = process.cpuUsage(); 

    // Create write stream

    const logStream = fs.createWriteStream('test.txt');

    const password = 'sua_senha'; // replace with your password
    const command = 'powerstat -d 0 1 -R'; // replace with your command

    const powerstat = spawn('sh', ['-c', `echo ${password} | sudo -S ${command}`]);

    

    // Pipe powerstat output to log file
    powerstat.stdout.pipe(logStream);
    powerstat.stderr.pipe(logStream);

    // Open the browser with Puppeteer
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    await page.goto('https://google.com');

    await sleep(10000)
    // Close the browser
    await browser.close();

    // Stop powerstat
    await exec('sudo pkill -SIGINT powerstat');

    // Get CPU info
    const cpus = os.cpus();
    for(let i = 0; i < cpus.length; i++) {
        console.log(`CPU ${i}:`);
        console.log(`User time: ${cpus[i].times.user}`);
        console.log(`Sys time: ${cpus[i].times.sys}`);
    }

    // Calling process.cpuUsage() method 
    const usage = process.cpuUsage(usageStart); 
  
    // Printing returned value 
    console.log(usage); 
}

measurePowerConsumption();
