// lib/scraper/meesho.ts
import puppeteer from 'puppeteer';
import { ProductData } from '@/types/productData';

export async function scrapeMeeshoProduct(url: string): Promise<ProductData> {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for price or any key element
  await page.waitForSelector('h1', { timeout: 10000 });

  const data = await page.evaluate(() => {
    const title = document.querySelector('h1')?.textContent?.trim() || '';
    const priceText = document.querySelector('h4')?.textContent?.trim() || '';
    const image = document.querySelector('img')?.getAttribute('src') || '';

    const price = Number(priceText.replace(/[^\d]/g, ''));

    return { title, price, image };
  });

  await browser.close();

  return {
    ...data,
    url,
    source: 'meesho',
  };
}
