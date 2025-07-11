import express from "express";
import dotenv from "dotenv";
dotenv.config();
// Importing necessary modules
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import scrapperRouter from "./routes/scrapper.js";

const app = express();
const PORT = process.env.PORT || 4000;
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to handle URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));
app.use(cors());

app.use("/", scrapperRouter);

app.listen(PORT, () => {
  console.log(`Server is running on${PORT}`);
});
