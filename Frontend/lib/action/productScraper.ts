"use server";

import { scrapeFlipkartProduct } from "@/lib/scraper/flipkart";

import { scrapeTestProduct } from "../scraper/testing";

export async function scrapeProduct(productUrl: string, domain: string) {
  if (!productUrl) return;
  try {
    let scrapedData;
    switch (domain.toLowerCase()) {
      case "test":
        scrapedData = await scrapeTestProduct(productUrl);
        break;
      case "flipkart":
        scrapedData = await scrapeFlipkartProduct(productUrl);
        break;

      default:
        throw new Error(`Unsupported domain: ${domain}`);
    }
    return scrapedData;
  } catch {
    throw new Error("Failed to fetch product");
  }
}
