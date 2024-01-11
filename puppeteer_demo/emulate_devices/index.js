const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto("https://baidu.com/");
  await page.screenshot({
    path: "full.png",
    fullPage: true,
  });
  console.log(await page.title());
  await browser.close();
})();
