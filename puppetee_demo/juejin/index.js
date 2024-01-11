// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "c2de1f72ac1b94263f934414acbdda6e",
    },
    visualFeedback: true,
  })
);

function waitFor(t) {
  return new Promise((r) => setTimeout(r, t));
}

puppeteer
  .launch({
    headless: false,
    // devtools: true,
    args: [
      "--disable-features=IsolateOrigins,site-per-process",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
      "--disable-web-security",
    ],
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://juejin.cn/");
    // 设置页面默认超时时间
    page.setDefaultTimeout(100000);

    const loginbutton = await page.$(".login-button");
    await page.evaluateHandle(async (element) => {
      function waitFor(t) {
        return new Promise((r) => setTimeout(r, t));
      }

      if (element) {
        element.click();
        await waitFor(1000);
        let clickable = document.querySelector(".clickable");
        clickable && clickable.click();
      }
    }, loginbutton);

    await waitFor(1000);
    await page.type('input[name="loginPhoneOrEmail"]', "13032014099");
    await page.type('input[name="loginPassword"]', "yangfan123");

    
    await page.solveRecaptchas();
    for (const frame of page.mainFrame().childFrames()) {
      await frame.solveRecaptchas();
    }
    await Promise.all([page.waitForNavigation(), page.click(`.btn.btn-login`)]);
  });
