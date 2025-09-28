#!/usr/bin/env node

/**
 * Chrome installation script for different deployment platforms
 * This script helps install Chrome/Chromium for Puppeteer in production
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔧 Installing Chrome/Chromium for Puppeteer...");

try {
  // Check if we're in a CI/CD environment
  const isCI =
    process.env.CI ||
    process.env.VERCEL ||
    process.env.RAILWAY ||
    process.env.RENDER;

  if (isCI) {
    console.log("📦 Detected CI/CD environment, installing Chrome...");

    // Install Chrome via Puppeteer
    execSync("npx puppeteer browsers install chrome", { stdio: "inherit" });

    console.log("✅ Chrome installed successfully!");
  } else {
    console.log("💻 Local environment detected");
    console.log(
      "ℹ️  For local development, Chrome should already be available"
    );
    console.log(
      "ℹ️  If you encounter issues, run: npx puppeteer browsers install chrome"
    );
  }

  // Set environment variable for Puppeteer
  const envContent = `
# Puppeteer Configuration
PUPPETEER_EXECUTABLE_PATH=${process.env.PUPPETEER_EXECUTABLE_PATH || ""}
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=${
    process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD || "false"
  }
`;

  // Write to .env if it doesn't exist
  if (!fs.existsSync(".env")) {
    fs.writeFileSync(".env", envContent);
    console.log("📝 Created .env file with Puppeteer configuration");
  }
} catch (error) {
  console.error("❌ Error installing Chrome:", error.message);
  console.log("\n🔧 Manual installation steps:");
  console.log("1. Run: npx puppeteer browsers install chrome");
  console.log("2. Set PUPPETEER_EXECUTABLE_PATH environment variable");
  console.log("3. For Docker: Use the provided Dockerfile");
  console.log("4. For Vercel: Use the provided vercel.json configuration");

  process.exit(1);
}
