#!/usr/bin/env node

/**
 * Test script to verify Chrome installation for Puppeteer
 */

const puppeteer = require("puppeteer");

async function testChrome() {
  console.log("🧪 Testing Chrome installation for Puppeteer...");

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });

    console.log("✅ Chrome launched successfully!");

    const page = await browser.newPage();
    await page.goto("https://example.com");
    const title = await page.title();

    console.log(`✅ Page loaded successfully: ${title}`);

    await browser.close();
    console.log("✅ Chrome test completed successfully!");
  } catch (error) {
    console.error("❌ Chrome test failed:", error.message);
    console.log("\n🔧 Troubleshooting steps:");
    console.log("1. Run: npx puppeteer browsers install chrome");
    console.log("2. Set PUPPETEER_EXECUTABLE_PATH environment variable");
    console.log(
      "3. Check the DEPLOYMENT_GUIDE.md for platform-specific instructions"
    );

    process.exit(1);
  }
}

testChrome();
