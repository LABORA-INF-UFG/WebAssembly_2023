const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const os = require('os');
const fs = require('fs');

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

async function measurePowerConsumption() {
    // Create write stream
    const logStream = fs.createWriteStream('test.txt');

    // Start powerstat
    const powerstat = spawn('powerstat', ['-d', '0', '1']);

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
    powerstat.kill('SIGINT');

    // Get CPU info
    const cpus = os.cpus();
    for(let i = 0; i < cpus.length; i++) {
        console.log(`CPU ${i}:`);
        console.log(`User time: ${cpus[i].times.user}`);
        console.log(`Sys time: ${cpus[i].times.sys}`);
    }
}

measurePowerConsumption();
