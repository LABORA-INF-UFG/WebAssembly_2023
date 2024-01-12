import puppeteer from 'puppeteer';

async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function doExperiment (browser) {
    const page = await browser.newPage();

    // Create a Promise that resolves when the 'end' event is fired
    const downloadComplete = new Promise(resolve => {
        page.exposeFunction('onDownloadComplete', async () => {
            console.log('Download complete. Closing the page...');
            await sleep(2000)
            page.close();
            resolve();
        });
    });

    // Listen for 'end' event and call our exposed function
    await page.evaluateOnNewDocument(() => {
        window.addEventListener('end', () => {
            window.onDownloadComplete();
        });
    });

    await page.goto('http://localhost:3001/offloading.html');

    // Wait for the download to complete before returning
    await downloadComplete;
};

(async () => {
    const browser = await puppeteer.launch({headless: false});
    let numberExperiments = 5;
    while(numberExperiments){
        await doExperiment(browser);
        numberExperiments--;
    }
    await sleep(1000)
    await browser.close();
})();