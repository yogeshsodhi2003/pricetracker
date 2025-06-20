"use server";
import { scrapeAmazonProduct } from "@/lib/scraper/amazon";
import { scrapeAjioProduct } from "@/lib/scraper/ajio";
import { scrapeFlipkartProduct } from "@/lib/scraper/flipkart";
import { scrapeMeeshoProduct } from "@/lib/scraper/meesho";
import { scrapeMyntraProduct } from "@/lib/scraper/myntra";
import { scrapeTataCliqProduct } from "@/lib/scraper/tatacliq";
import { scrapeCromaProduct } from "@/lib/scraper/croma";
import { scrapeSnapdealProduct } from "@/lib/scraper/snapdeal";
import { scrapetesting } from "../scraper/testing";

export async function scrapeProduct(productUrl: string, domain: string) {
  if (!productUrl) return;
  try {
    let scrapedData;

    switch (domain.toLowerCase()) {
      case "test":
        scrapedData = await scrapetesting(productUrl);
        break;
      case "amazon":
        scrapedData = await scrapeAmazonProduct(productUrl);
        break;

      case "flipkart":
        scrapedData = await scrapeFlipkartProduct(productUrl);
        break;

      case "meesho":
        scrapedData = await scrapeMeeshoProduct(productUrl);
        break;

      case "myntra":
        scrapedData = await scrapeMyntraProduct(productUrl);
        break;

      case "ajio":
        scrapedData = await scrapeAjioProduct(productUrl);
        break;

      case "snapdeal":
        scrapedData = await scrapeSnapdealProduct(productUrl);
        break;

      case "croma":
        scrapedData = await scrapeCromaProduct(productUrl);
        break;

      case "tatacliq":
        scrapedData = await scrapeTataCliqProduct(productUrl);
        break;

      default:
        throw new Error(`Unsupported domain: ${domain}`);
    }
    return scrapedData;
  } catch {
    throw new Error("Failed to fetch product");
  }
}
