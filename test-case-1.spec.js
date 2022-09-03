
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer')

let browser 

beforeAll(async () => {
  browser = await puppeteer.launch({
    timeout: 90000,
    headless: true,
    args: ['--no-sandbox', "--disable-setuid-sandbox", "--disable-gpu"]
  });
}, 100000)

expect.extend({ toMatchImageSnapshot });

describe('sum module',  () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: "domcontentloaded" });
    await page.waitForNavigation();
  const data = await page.content()
  console.log('data', data)
  })
  test('Print 0001', async () => {
    try{
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'local_name1',
      });
    }catch(err){
      console.log('screenshot', err)
    }

  });
  test('Print 0002', async () => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'local_name2',
    });
  });
  test('Print 0003', async () => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'local_name3',
    });
  });
});

afterAll(async () => {
  await browser.close();
})