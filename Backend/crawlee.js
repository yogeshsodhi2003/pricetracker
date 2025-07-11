// crawler.js
import { PuppeteerCrawler, Configuration } from "crawlee";

const config = new Configuration({
  persistStorage: false, // disables writing to disk
  purgeOnStart: true, // clears any leftover storage
});

export const crawleeData = async (url) => {
  let title = null;
  let image = null;
  let price = null;

  const crawler = new PuppeteerCrawler(
    {
      useSessionPool: false, // no session reuse
      async requestHandler({ page, request }) {
        console.log(`Visiting: ${request.url}`);
        await page.goto(request.url, { waitUntil: "networkidle2" });
        await page.waitForSelector("span.VU-ZEz", { timeout: 5000 });
        await page.waitForSelector("div.Nx9bqj.CxhGGd", { timeout: 5000 });
        await page.waitForSelector("img.DByuf4.IZexXJ.jLEJ7H", {
          timeout: 5000,
        });

        title = await page.$eval("span.VU-ZEz", (el) => el.textContent.trim());

        // Get image src and join with domain if needed
        image = await page
          .$eval("img.DByuf4.IZexXJ.jLEJ7H", (el) => el.getAttribute("src"))
          .catch(() => null);

        // Get price and extract only the number
        price = await page.$eval('span[itemprop="price"]', (el) =>
          el.textContent.trim()
        );
        price = await page
          .$eval("div.Nx9bqj", (el) => el.textContent.trim())
          .catch(() => null);
        if (price) price = price.replace(/[^0-9.]/g, ""); // Only digits and dot
      },
    },
    config
  );

  // Ensure this request is uniquely treated every time
  await crawler.run([{ url, uniqueKey: `${url}-${Date.now()}` }]);
  console.log("Crawler finished. Titles found:", title);

  return {
    price,
    title,
    image,
    url,
  };
};

export const runCrawler = async (url) => {
  try {
    console.log(`Starting crawler for URL: ${url}`);
    const result = await crawleeData(url);
    console.log("Crawler finished. Titles found:", result);
    return result;
  } catch (error) {
    console.error("Error occurred during crawl:", error.message || error);
    return [];
  }
};
