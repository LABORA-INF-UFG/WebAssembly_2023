import puppeteer from 'puppeteer';

async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });

    // Expose a handler to the page
    await page.exposeFunction('onCustomEvent', async ({ type }) => {
        if(type === "end") {
            // await page.screenshot({ path: 'screenshot.png' })
            await sleep(1000);
            await browser.close();
        }
    });

    // listen for events of type 'status' and
    // pass 'type' and 'detail' attributes to our exposed function
    await page.evaluateOnNewDocument(() => {
        window.addEventListener('start', ({ type }) => {
            window.onCustomEvent({ type });
        });
    });

    await page.evaluateOnNewDocument(() => {
        window.addEventListener('end', ({ type }) => {
            window.onCustomEvent({ type });
        });
    });

    await page.goto('http://192.168.10.2:3000/offloading.html');
})();