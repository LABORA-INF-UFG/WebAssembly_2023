import puppeteer from 'puppeteer';

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

async function doExperiment (browser) {
    const page = await browser.newPage();

    // Create a Promise that resolves when the 'end' event is fired
    const downloadComplete = new Promise(resolve => {
        page.exposeFunction('onDownloadComplete', () => {
            console.log('Download complete. Closing the page...');
            sleep(1000)
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

    await page.goto('http://localhost:3000/scripts/inBrowser.html');

    // Wait for the download to complete before returning
    await downloadComplete;
};

(async () => {
    const browser = await puppeteer.launch({headless: false});
    let numberExperiments = 30;
    while(numberExperiments){
        await doExperiment(browser);
        numberExperiments--;
    }
    sleep(2000)
    await browser.close();
})();
