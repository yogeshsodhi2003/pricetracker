// lib/scraper/amazon.ts
import puppeteer from 'puppeteer';
import { ProductData } from '@/types/productData';

export async function scrapeAmazonProduct(url: string): Promise<ProductData> {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  // Set user-agent to avoid bot detection
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('#productTitle', { timeout: 10000 });

  const data = await page.evaluate(() => {
    const title = document.querySelector('#productTitle')?.textContent?.trim() || '';

    const priceText =
      document.querySelector('#priceblock_ourprice')?.textContent ||
      document.querySelector('#priceblock_dealprice')?.textContent ||
      document.querySelector('#priceblock_saleprice')?.textContent ||
      '';

    const image =
      document.querySelector('#landingImage')?.getAttribute('src') ||
      document.querySelector('#imgTagWrapperId img')?.getAttribute('src') ||
      '';

    const price = Number(priceText.replace(/[^\d]/g, ''));

    return { title, price, image };
  });

  await browser.close();

  return {
    ...data,
    url,
    source: 'amazon',
  };
}
