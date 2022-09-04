require('dotenv').config();
const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

const initBrowser = async ()=>{
  return await puppeteer.launch({
    timeout: 90000,
    headless: true,
    args: ['--no-sandbox', "--disable-setuid-sandbox", "--disable-gpu"]
  })
}

// 0.1 = 10%
const configJestSnapshot = {
  failureThreshold: 0.1,
  failureThresholdType: 'percent'
}

const mobile = puppeteer.devices['iPhone X']
const tablet = puppeteer.devices['iPad Pro 11']

const pageGenWeb = async (browser) => {
  const page = await browser.newPage();
  await page.goto(process.env.URL_WEBPAGE, { waitUntil: "domcontentloaded" });
  await page.waitForNavigation();
  return page;
}

const pageGenDevice = async (browser, device) => {
  const page = await browser.newPage();
  await page.emulate(device);
  await page.goto(process.env.URL_WEBPAGE, { waitUntil: "domcontentloaded" });
  await page.waitForNavigation();
  return page
}

const testImage = async (FILE_NAME, page, name) => {
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: `${FILE_NAME}_${name}`,
    ...configJestSnapshot
  });
}

const VISUAL_TESTS = [
  {
    name: 'WEB'
  },
  {
    name: 'MOBILE',
    device: mobile
  },
  {
    name: 'TABLET',
    device: tablet
  }
]

module.exports = {
  initBrowser,
  configJestSnapshot,
  pageGenWeb,
  pageGenDevice,
  testImage,
  VISUAL_TESTS
}