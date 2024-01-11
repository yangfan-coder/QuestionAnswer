// razer
const puppeteer = require("puppeteer");
const ua =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5410.0 Safari/537.36";

const config = {
  url: "https://gold.razer.com/my/en/gold/catalog/pubgm",
  gameName: "pubgm",
  currency: "RM",
  country: "my",
  thous_separator: ",",
  decimal_point_separator: ".",
};

const waitFor = async (t) => {
  return new Promise((r) => setTimeout(r, t));
};
const gameSkuList = [];

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

    await page.goto(config.url);

    await waitFor(3000);

    const webshopStepSku = await page.waitForSelector("#webshop_step_sku");
    if (!webshopStepSku) {
      throw new Error("当前的IP被封禁了!!!");
    }

    const skuItem = await page.$$("#webshop_step_sku .sku-list__item");
    const darkFilter = await page.$(".onetrust-pc-dark-filter");

    // 自定义弹窗默认关闭
    await page.evaluateHandle((element) => {
      element && (element.style.display = "none");
    }, darkFilter);

    const params = { ...config };
    const getCards = async (dList, args) => {
      for (let d of dList) {
        const sku_name = await page.evaluate((element) => {
          const res = element.querySelector(".selection-tile__text") || null;
          if (!res) return {};

          return res?.innerText || "";
        }, d);
        await d.click();
        await waitFor(1500);

        const price_text = await page.evaluate(() => {
          const channels =
            document.querySelector("#webshop_step_payment_channels") || null;
          if (!channels) return {};

          // 优先获取其他支付通道
          let _details =
            channels.querySelectorAll(".selection-tile-promos__details")[1] ||
            null;

          // 兜底钱包
          if (!_details) {
            _details =
              channels.querySelectorAll(".selection-tile-promos__details")[0] ||
              null;

            if (!_details) return {};
          }

          const _card =
            _details.querySelector(".align-self-center.text-right") || null;

          if (!_card) return {};

          return _card?.innerText || "0";
        });

        const jons = {
          sku_name,
          price: price_text,
          currency: args.currency,
          platform: "pubgm",
          game: args.gameName,
          country: args.country,
        };

        gameSkuList.push(jons);
      }

      return gameSkuList;
    };
    const result = await getCards(skuItem, params);

    console.log(result);
    /**
     * [
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM5)',
            price: 'RM 5.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM10)',
            price: 'RM 10.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM20)',
            price: 'RM 20.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM30)',
            price: 'RM 30.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM40)',
            price: 'RM 40.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM50)',
            price: 'RM 50.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM100)',
            price: 'RM 100.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM200)',
            price: 'RM 200.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        },
        {
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM300)',
            price: 'RM 300.00',
            currency: 'RM',
            platform: 'pubgm',
            game: 'pubgm',
            country: 'my'
        }
     */
    await browser.close();
  };
  run();
} catch (err) {
  console.error(err);
}
