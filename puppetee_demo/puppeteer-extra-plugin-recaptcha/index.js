const puppeteer = require("puppeteer-extra");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "xxxxxxxxx", // 知识需要付费
    },
    visualFeedback: true,
  })
);
const waitFor = async (t) => {
  return new Promise((r) => setTimeout(r, t));
};
puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();
  await page.goto("https://www.google.com/recaptcha/api2/demo");

  await page.solveRecaptchas();

  await Promise.all([
    page.waitForNavigation(),
    page.click(`#recaptcha-demo-submit`),
  ]);
    await page.screenshot({ path: 'response.png', fullPage: true })
    await browser.close()
});
