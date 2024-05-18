// puppeteerScript.js
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';


const browser = await puppeteer.launch({
  headless: false,
  executablePath: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const page = await browser.newPage();
const context = browser.defaultBrowserContext();
await context.overridePermissions(`file://${__dirname}`, ['camera']);
await page.goto(`file://${__dirname}/webcam.html`);

async function captureImage() {
  // Wait for the video element to be available
  await page.waitForSelector('video');

  // Capture a screenshot of the video element
  const image = await page.screenshot({ encoding: 'base64' });
  return image;
}

// close browser function
async function closeBrowser() {
  await browser.close();
}

export { captureImage, closeBrowser };
