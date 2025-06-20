// lib/scraper/meesho.ts
import puppeteer from 'puppeteer';
import { ProductData } from '@/types/productData';

export async function scrapetesting(url: string): Promise<ProductData> {
  const browser = await puppeteer.launch({
    headless: true
  });
  console.log(url)

  const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for price or any key element
  await page.waitForSelector('div.caption', { timeout: 10000 });

  const data = await page.evaluate(() => {
    const title = document.querySelector('h4.title')?.textContent?.trim() || '';
    const priceText = document.querySelector('h4[itemprop="offers"] span[itemprop="price"]')?.textContent?.trim() || '';
    const imagesrc = document.querySelector('img.image')?.getAttribute('src') || '';
    console.log(priceText)
   const image = "https://webscraper.io" + imagesrc
    const price  = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    

    return { title, price, image };
  });

  await browser.close();

  return {
    ...data,
    url,  
    source: 'test',
  };
}



