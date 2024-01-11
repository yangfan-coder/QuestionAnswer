// codashop
const puppeteer = require("puppeteer");
const ua =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5410.0 Safari/537.36";

const config = {
  url: "https://www.codashop.com/en-my/pubg-mobile-uc-redeem-code",
  gameName: "pubgm",
  currency: "RM",
  country: "my",
  thous_separator: ",",
  decimal_point_separator: ".",
};

// 延时
const waitFor = async (t) => {
  return new Promise((r) => setTimeout(r, t));
};

try {
  const run = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        height: 1080,
        width: 1920,
      },
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    // 设置页面默认超时时间
    page.setDefaultTimeout(100000);

    // 设置页面的默认导航超时时间
    page.setDefaultNavigationTimeout(50000);

    // 设置user-agent
    ua && (await page.setUserAgent(ua));

    await page.goto(config.url, { waitUntil: "domcontentloaded" });

    const section__denom = await page.waitForSelector(roots);

    if (!section__denom) return [];

    const params = { ...config, platform: "codashop" };
    const _waitFor = waitFor.toString();

    // 进行DOM操作
    const jsons = await page.evaluate(
      async (args, _waitFor, _roots) => {
        const _wait = eval("(" + _waitFor + ")");
        await _wait(1000);

        let price, sku_name;

        let _lis =
          Array.from(
            document.querySelectorAll(".form-section__denom-group li")
          ) || [];

        if (_lis && _lis.length === 0) return [];

        const games = _lis.map((item) => {
          const sku_name_dom =
            item.querySelector(".form-section__denom-data-section") || null;
          const sku_price_dom =
            item.querySelector(".starting-price-value") || null;

          if (sku_name_dom) {
            sku_name = sku_name_dom.innerText || "SKU_NAME";
          }

          if (sku_price_dom) {
            price = sku_price_dom.innerText;
          }

          return {
            price,
            sku_name,
            currency: args.currency,
            platform: args.platform,
            game: args.gameName,
            country: args.country,
          };
        });

        return !!(games && games.length) ? games : [];
      },
      params,
      _waitFor,
      roots
    );
    console.log(jsons);
    /**
     * [
          {
            price: 'RM4.50',
            sku_name: '60 UC',
            currency: 'RM',
            platform: 'codashop',
            game: 'pubgm',
            country: 'my'
          },
          {
            price: 'RM22.50',
            sku_name: '325 UC',
            currency: 'RM',
            platform: 'codashop',
            game: 'pubgm',
            country: 'my'
          },
          {
            price: 'RM45.00',
            sku_name: '660 UC',
            currency: 'RM',
            platform: 'codashop',
            game: 'pubgm',
            country: 'my'
          },
          {
            price: 'RM112.50',
            sku_name: '1800 UC',
            currency: 'RM',
            platform: 'codashop',
            game: 'pubgm',
            country: 'my'
          },
          {
            price: 'RM225.00',
            sku_name: '3850 UC',
            currency: 'RM',
            platform: 'codashop',
            game: 'pubgm',
            country: 'my'
          },
          {
            price: 'RM450.00',
            sku_name: '8100 UC',
            currency: 'RM',
            platform: 'codashop',
            game: 'pubgm',
            country: 'my'
          }
        ]
     */
    await browser.close();
  };
  run();
} catch (err) {
  console.error(err);
}
