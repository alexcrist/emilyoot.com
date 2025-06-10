import dotenv from "dotenv";
import { createWriteStream } from "fs";
import { get } from "https";
import { launch } from "puppeteer";

dotenv.config();

const password = process.env.EMILYOOT_PASSWORD;

(async () => {
  for (let i = 0; i <= 44; i++) {
    // Open browser
    const browser = await launch({ headless: false });

    // Navigate to page
    const page = await browser.newPage();
    const baseUrl = `https://www.emilyoot.com/prints#e-${i}`;
    await page.goto(baseUrl, { waitUntil: "networkidle2" });

    // Enter password
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', password);
    await page.click('input[type="submit"]');
    await page.waitForNavigation();

    // Get image URL
    const selector = ".gallery-item-inner img[src]";
    await page.waitForSelector(selector, { timeout: 10000 });
    const imgUrl = await page.$eval(selector, (e) => e.getAttribute("src"));
    if (!imgUrl) {
      throw Error("Missing image URL.");
    }

    // Download image
    const file = createWriteStream(`images/e-${i}.png`);
    await new Promise((resolve) => {
      get(imgUrl, (response) => {
        response.pipe(file);
        resolve();
      });
    });

    // Close browser
    await browser.close();
  }
})();
