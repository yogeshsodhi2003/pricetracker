'use server'
import { scrapeAmazonProduct } from '@/lib/scraper/amazon';
import { scrapeAjioProduct } from '@/lib/scraper/ajio';
import { scrapeFlipkartProduct } from '@/lib/scraper/flipkart';
import { scrapeMeeshoProduct } from '@/lib/scraper/meesho';
import { scrapeMyntraProduct } from '@/lib/scraper/myntra';
import { scrapeTataCliqProduct } from '@/lib/scraper/tatacliq';
import { scrapeCromaProduct } from '@/lib/scraper/croma';
import { scrapeSnapdealProduct } from '@/lib/scraper/snapdeal';

export async function scrapeProduct(productUrl: string, domain: string) {
    if(!productUrl) return;
try{
    const domain = new URL(productUrl).hostname;

let scrapedData;

switch (true) {
  case /amazon\./.test(domain):
    scrapedData = await scrapeAmazonProduct(productUrl);
    break;

  case /flipkart\./.test(domain):
    scrapedData = await scrapeFlipkartProduct(productUrl);
    break;

  case /meesho\./.test(domain):
    scrapedData = await scrapeMeeshoProduct(productUrl);
    break;

  case /myntra\./.test(domain):
    scrapedData = await scrapeMyntraProduct(productUrl);
    break;

  case /ajio\./.test(domain):
    scrapedData = await scrapeAjioProduct(productUrl);
    break;

  case /snapdeal\./.test(domain):
    scrapedData = await scrapeSnapdealProduct(productUrl);
    break;

  case /croma\./.test(domain):
    scrapedData = await scrapeCromaProduct(productUrl);
    break;

  case /tatacliq\./.test(domain):
    scrapedData = await scrapeTataCliqProduct(productUrl);
    break;

  default:
    throw new Error(`Unsupported domain: ${domain}`);
}

console.log(scrapedData);

}
catch(error: any){
    throw new Error('Failed to fetch product');
}

}