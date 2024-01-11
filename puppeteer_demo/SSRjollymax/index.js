// jollymax
const puppeteer = require("puppeteer");
const ua =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5410.0 Safari/537.36";

const config = {
  url: "https://www.jollymax.com/ru/PUBG",
  gameName: "pubgm",
  currency: "RUB",
  country: "ru",
  thous_separator: "", // 千位分隔符
  decimal_point_separator: ".", // 小数分隔符
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
    // Create a page
    const page = await browser.newPage();

    // 设置页面默认超时时间
    page.setDefaultTimeout(100000);

    // 设置页面的默认导航超时时间
    page.setDefaultNavigationTimeout(50000);

    // 设置user-agent
    ua && (await page.setUserAgent(ua));

    // 拦截请求
    await page.setRequestInterception(true);

    page.on("request", async (request) => {
      // 对一些不必要的资源、进行终止增加加载速度
      if (
        request.resourceType() == "image" ||
        request.resourceType() == "font" ||
        request.resourceType() == "stylesheet"
      ) {
        await request.abort();
      } else {
        await request.continue();
      }
    });

    await page.goto(config.url, { waitUntil: "domcontentloaded" });

    // 等待整个DOM加载完成
    await page.waitForSelector(".content-right-part");

    const params = { ...config, platform: "jollymax" };

    const result = await page.evaluate(async (args) => {
      let filterResults = [];

      if (
        window &&
        window.__NUXT__ &&
        window.__NUXT__.data &&
        window.__NUXT__.data.length
      ) {
        const _serverData = window.__NUXT__.data[0]?.serverData;

        if ("pageData" in _serverData) {
          const glist = _serverData.pageData.pageInfo.goodsList;
          if (!(glist && glist.length)) return filterResults;

          const getPrice = (item) => {
            let result = "0";
            if (item.payTypeList.length) {
              result = item.payTypeList[0].amount;
            }
            return result.toString();
          };

          //   默认拿取第一个支付通道的价格
          return glist.map((item) => {
            const price = getPrice(item);
            return {
              currency: item.currency || args.currency,
              platform: args.platform,
              game: args.gameName,
              country: args.country,
              price,
              sku_name: item?.goodsName || "SKU_NAME",
            };
          });
        }
      }

      return [];
    }, params);

    console.log(result);
    /**
         * [
         {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '91',
            sku_name: '60 UC'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '440',
            sku_name: '325 UC'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '910',
            sku_name: '660 UC'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '2248',
            sku_name: '1800 UC'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '4500',
            sku_name: '3850 UC'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '9100',
            sku_name: '8100 UC'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '1442',
            sku_name: 'RP Upgrade Pack-A3'
        },
        {
            currency: 'RUB',
            platform: 'jollymax',
            game: 'pubgm',
            country: 'ru',
            price: '3608',
            sku_name: 'Elite RP Upgrade Pack-A3'
        }
        ]
     */

    await browser.close();
  };
  run();
} catch (err) {
  console.error(err);
}
