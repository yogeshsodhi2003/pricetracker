// lib/scraper/flipkart.ts
import puppeteer from 'puppeteer';


export type ProductInfo = {
  title: string | null;
  price: string | null;
};


export async function scrapeFlipkartProduct(url: string) {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for price to load
  await page.waitForSelector('div._30jeq3._16Jk6d', { timeout: 10000 });

  const data = await page.evaluate(() => {
    const titleEl = document.querySelector('h1._apqj7v');
    const priceEl = document.querySelector('div._30jeq3._16Jk6d');
    const imageEl = document.querySelector('img._396cs4');

    const title = titleEl?.textContent?.trim() || '';
    const priceRaw = priceEl?.textContent?.trim() || '';
    const image = imageEl?.getAttribute('src') || '';

    const price = Number(priceRaw.replace(/[^\d]/g, ''));

    return { title, price, image };
  });

  await browser.close();
  return {
    ...data,
    url,
    source: 'flipkart',
  };
}
