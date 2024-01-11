// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");

// Add adblocker plugin, which will transparently block ads in all pages you
// create using puppeteer.
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require("puppeteer");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(
  AdblockerPlugin({
    // Optionally enable Cooperative Mode for several request interceptors
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
  })
);

// puppeteer usage as normal
puppeteer
  .launch({
    headless: false,
    defaultViewport: {
      height: 1080,
      width: 1920,
    },
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    // Visit a page, ads are blocked automatically!
    await page.goto("https://www.4399.com/");

    await page.waitForTimeout(5 * 1000);
    await page.screenshot({ path: "response.png", fullPage: true });

    console.log(`All done, check the screenshots. ✨`);
    //   await browser.close()
  });
