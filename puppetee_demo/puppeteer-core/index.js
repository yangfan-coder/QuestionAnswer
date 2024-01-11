const puppeteer = require("puppeteer-core");
const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // [本地路径]
  defaultViewport: {
    height: 1080,
    width: 1920,
  },
});
return browser;
