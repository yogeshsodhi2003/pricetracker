// lib/scraper/myntra.ts
import puppeteer from 'puppeteer';
import { ProductData } from '@/types/productData';

export async function scrapeMyntraProduct(url: string): Promise<ProductData> {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('h1.pdp-title', { timeout: 10000 });

  const data = await page.evaluate(() => {
    const titleEl = document.querySelector('h1.pdp-title');
    const priceEl = document.querySelector('span.pdp-discounted-price') || document.querySelector('span.pdp-price');
    const imageEl = document.querySelector('img.pdp-image');

    const title = titleEl?.textContent?.trim() || '';
    const priceText = priceEl?.textContent?.trim() || '';
    const image = imageEl?.getAttribute('src') || '';

    const price = Number(priceText.replace(/[^\d]/g, ''));

    return { title, price, image };
  });

  await browser.close();

  return {
    ...data,
    url,
    source: 'myntra',
  };
}
