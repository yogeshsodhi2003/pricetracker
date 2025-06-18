import puppeteer from "puppeteer";
import { ProductData } from "@/types/productData";

export async function scrapeTataCliqProduct(url: string): Promise<ProductData> {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForSelector("h1.Title__TitleText-sc-1k1z1d2-0", {
    timeout: 10000,
  });

  const data = await page.evaluate(() => {
    const title =
      document
        .querySelector("h1.Title__TitleText-sc-1k1z1d2-0")
        ?.textContent?.trim() || "";
    const priceText =
      document
        .querySelector("div.ProductDetailsMainCard__PriceText-sc-1xq0mzl-1")
        ?.textContent?.trim() || "";
    const image =
      document
        .querySelector("img.Image__StyledImage-sc-1as2s8r-1")
        ?.getAttribute("src") || "";
    const price = Number(priceText.replace(/[^\d]/g, ""));
    return { title, price, image };
  });

  await browser.close();
  return { ...data, url, source: "tatacliq" };
}
