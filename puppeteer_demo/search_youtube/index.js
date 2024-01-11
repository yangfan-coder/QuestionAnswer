// baidu search
const puppeteer = require("puppeteer");
const screenshot = "baidu.png";
try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://baidu.com");
    await page.type("#kw", "puppeteer");
    await page.click("#su");
    await page.waitForTimeout(2000);
    await page.screenshot({ path: screenshot });
    await browser.close();
  })();
} catch (err) {
  console.error(err);
}
