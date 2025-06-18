import puppeteer from "puppeteer";
import { ProductData } from "@/types/productData";

export async function scrapeSnapdealProduct(url: string): Promise<ProductData> {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
    await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForSelector("h1.pdp-e-i-head", { timeout: 10000 });

  const data = await page.evaluate(() => {
    const title =
      document.querySelector("h1.pdp-e-i-head")?.textContent?.trim() || "";
    const priceText =
      document.querySelector("span.payBlkBig")?.textContent?.trim() || "";
    const image =
      document.querySelector("img.cloudzoom")?.getAttribute("src") || "";
    const price = Number(priceText.replace(/[^\d]/g, ""));
    return { title, price, image };
  });

  await browser.close();
  return { ...data, url, source: "snapdeal" };
}
