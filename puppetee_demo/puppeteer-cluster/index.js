const { Cluster } = require("puppeteer-cluster");


// 延时
const waitFor = async (t) => {
  return new Promise((r) => setTimeout(r, t));
};


(async () => {
  // Create a cluster with 2 workers
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
    puppeteerOptions: {
      headless: false,
    },
  });


  await waitFor(10000)
  // Define a task (in this case: screenshot of page)
  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

    const path = url.replace(/[^a-zA-Z]/g, "_") + ".png";
    await page.screenshot({ path });
    console.log(`Screenshot of ${url} saved: ${path}`);
  });

  // Add some pages to queue
  cluster.queue("https://www.baidu.com");
  cluster.queue("https://www.bing.com/?mkt=zh-CN");
  cluster.queue("https://github.com/");

  // Shutdown after everything is done
  await cluster.idle();
  await cluster.close();
})();
