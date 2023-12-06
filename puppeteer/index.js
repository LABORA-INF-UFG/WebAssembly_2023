import puppeteer from 'puppeteer';
async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', defaultViewport: null });
    const page = await browser.newPage();

    await page.exposeFunction('endExperiment', async () => {
        await sleep(2000);
        await browser.close();
    });

    await page.evaluateOnNewDocument(() => {
        window.addEventListener('end', () => {
            window.endExperiment();
        });
    });

    await page.goto('http://localhost:8080/offloading.html');
    // await page.goto('http://localhost:8080/local.html');
})();
