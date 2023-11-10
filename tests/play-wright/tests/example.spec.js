// @ts-check
const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000/local.html'

test('Has video canvas', async ({ page }) => {
  await page.goto(baseUrl);

  const videoCanvas = page.getByTestId('a'); 

  console.log(videoCanvas);


  // await expect(videoCanvas).toBeInViewport();
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});