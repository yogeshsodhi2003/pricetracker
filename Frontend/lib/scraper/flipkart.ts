  import axios from 'axios';
  import * as cheerio from 'cheerio';



  export async function scrapeFlipkartProduct(url:string) {
    try {
      console.log(url)
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      const $ = cheerio.load(data);


      // Flipkart often uses this class for price
         const title = $('span.VU-ZEz').text().trim();

      const price = $('div[class*="Nx9bqj"]' ).first().text();
      console.log("this is working" ,title)
      console.log(price)
      return title;
    } catch {
      throw new Error("error scraping flipkart product");
    }
  }

