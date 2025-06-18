


import { PuppeteerCrawler } from 'crawlee';

const crawler = new PuppeteerCrawler({
  async requestHandler({ page, request, log }) {
    log.info(`Opening ${request.url}`);

    // Wait for price element to load
    await page.waitForSelector('#priceblock_ourprice, #priceblock_dealprice');

    const title = await page.title();

    const price = await page.evaluate(() => {
      return (
        document.querySelector('#priceblock_ourprice')?.textContent?.trim() ||
        document.querySelector('#priceblock_dealprice')?.textContent?.trim()
      );
    });

    console.log(`🛒 ${title}`);
    console.log(`💸 Price: ${price}`);
  },

  // Handle failed URLs
  failedRequestHandler({ request }) {
    console.log(`❌ Request ${request.url} failed too many times.`);
  },
});

await crawler.run([
  'https://www.amazon.in/dp/B0BYZLMRZC/', // example product URL
]);
