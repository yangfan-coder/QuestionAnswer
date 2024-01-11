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

    // 拦截请求
    await page.setRequestInterception(true);

    page.on("request", async (request) => {
      // 对一些不必要的资源、进行终止增加加载速度
      if (
        request.resourceType() == "image" ||
        request.resourceType() == "font"
      ) {
        await request.abort();
      } else {
        await request.continue();
      }
    });

    function getResValue() {
      return new Promise((resolve) => {
        let result = [];

        page.on("response", async (response) => {
          const url = response.url();
          const headers = response.headers();
          const contentType = headers["content-type"];
          const _url =
            url && url.indexOf("/") !== -1 ? url.split("/").pop() : "";

          if (_url && contentType.includes("application/json")) {
            const jsons = await response.json();

            if (jsons && jsons.gameSkus && jsons.gameSkus.length) {
              const _gameSkus = jsons.gameSkus || [];
              result = _gameSkus.map((item) => {
                const price = item.unitGold || item.unitBaseGold || 0;
                const sku_name =
                  item.productName || item.vanityName || "SKU_NAME";

                return {
                  currency: config.currency,
                  country: config.country,
                  platform: "razer",
                  game: _url,
                  price: price.toString(),
                  sku_name,
                };
              });
              resolve(result);
            }
          }
        });
      });
    }
    await page.goto(config.url);
    const result = await getResValue();
    console.log(result);
    /**
     * [
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '5',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM5)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '10',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM10)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '20',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM20)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '30',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM30)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '40',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM40)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '50',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM50)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '100',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM100)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '200',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM200)'
        },
        {
            currency: 'RM',
            country: 'my',
            platform: 'razer',
            game: 'pubgm',
            price: '300',
            sku_name: 'Razer Gold Direct Top-Up PIN (MY) - (RM300)'
        }
    ]
     */
    await browser.close();
  };
  run();
} catch (err) {
  console.error(err);
}
