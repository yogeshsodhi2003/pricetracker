import { Router } from "express";
import { runCrawler } from "../crawlee.js";

const router = Router();

// Define the route for the scrapper
router.post("/scrapper", async (req, res) => {
  const { url } = req.body;
  console.log("Received URL:", url);
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  try {
    const data = await runCrawler(url);
    console.log("Scraped data:", data);
    res.json(data);
  } catch (error) {
    console.error("Error in scrapper route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Export the router
export default router;
