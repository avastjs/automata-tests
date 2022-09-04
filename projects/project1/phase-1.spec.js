const { VISUAL_TESTS, pageGenWeb, pageGenDevice, testImage, initBrowser } = require('../../setup');
const path = require('path');

let browser
const FILE_NAME = path.basename(__filename).slice(0, -8)

for (let i = 0; i < VISUAL_TESTS.length; i++) {
  const VISUAL_TEST = VISUAL_TESTS[i]
  describe(`${FILE_NAME}_VISUAL_${VISUAL_TEST.name}`, () => {
    let page;

    beforeEach(async () => {
      if (!VISUAL_TEST.device) {
        page = await pageGenWeb(browser);
      } else {
        page = await pageGenDevice(browser, VISUAL_TEST.device);
      }
    })

    test(VISUAL_TEST.name, async () => {
      await testImage(FILE_NAME, page, VISUAL_TEST.name)
    });
  });
}

describe(`${FILE_NAME}_E2E`, () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(process.env.URL_WEBPAGE, { waitUntil: "domcontentloaded" });
    await page.waitForNavigation();
  })

  test('test-1', async () => {
    const html = await page.$eval('body', e => e.innerHTML);
    expect(html).toBeTruthy();
  });
});

beforeAll(async () => {
  browser = await initBrowser();
}, 100000)

afterAll(async () => {
  await browser.close();
})
