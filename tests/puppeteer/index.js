import puppeteer from 'puppeteer';
async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    // await page.setViewport({ width: 1080, height: 1024 });

    await page.exposeFunction('endExperiment', async () => {
        await sleep(1000);
        await browser.close();
    });

    await page.evaluateOnNewDocument(() => {
        window.addEventListener('end', () => {
            window.endExperiment();
        });
    });



    await page.goto('http://192.168.10.2:3000/offloading.html');
})();