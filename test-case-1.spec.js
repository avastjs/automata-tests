
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer')

let browser 

beforeAll(async () => {
  browser = await puppeteer.launch();
})

expect.extend({ toMatchImageSnapshot });

describe('sum module',  () => {
  test('Print 0001', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: "domcontentloaded" });
    await page.waitForNavigation();
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'local_name',
    });
  });
  test('Print 0002', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: "domcontentloaded" });
    await page.waitForNavigation();
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'local_name',
    });
  });
});

afterAll(async () => {
  await browser.close();
})
