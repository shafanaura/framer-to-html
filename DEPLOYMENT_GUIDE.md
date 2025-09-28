# 🚀 Deployment Guide for Framer-to-HTML

This guide helps you deploy the Framer-to-HTML application with Puppeteer support on various platforms.

## 🎯 The Chrome/Puppeteer Issue

The error you're seeing occurs because Puppeteer needs Chrome/Chromium to work, but production environments often don't have Chrome installed by default.

## 🔧 Solutions by Platform

### 1. **Vercel Deployment**

#### Option A: Use Vercel's Built-in Chrome Support

```bash
# Install dependencies
npm install

# Deploy to Vercel
vercel --prod
```

The `vercel.json` configuration will handle Chrome installation automatically.

#### Option B: Manual Chrome Installation

```bash
# Install Chrome for Puppeteer
npx puppeteer browsers install chrome

# Set environment variable
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Deploy
vercel --prod
```

### 2. **Docker Deployment**

```bash
# Build the Docker image
docker build -t framer-to-html .

# Run the container
docker run -p 3000:3000 framer-to-html
```

The `Dockerfile` includes Chrome installation and proper configuration.

### 3. **Railway Deployment**

```bash
# Install Chrome during build
railway run npx puppeteer browsers install chrome

# Deploy
railway up
```

### 4. **Render Deployment**

Add these environment variables in Render dashboard:

```
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

### 5. **Netlify Functions**

For Netlify, you'll need to use Netlify Functions with a custom runtime:

```bash
# Install Chrome
npx puppeteer browsers install chrome

# Deploy
netlify deploy --prod
```

## 🛠️ Manual Chrome Installation

If automatic installation fails, run these commands:

```bash
# Install Chrome via Puppeteer
npx puppeteer browsers install chrome

# Or install system Chrome
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y chromium-browser

# CentOS/RHEL
sudo yum install -y chromium

# macOS
brew install --cask chromium
```

## 🔍 Troubleshooting

### Error: "Could not find Chrome"

**Solution 1: Set executable path**

```bash
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

**Solution 2: Install Chrome**

```bash
npx puppeteer browsers install chrome
```

**Solution 3: Use Docker**

```bash
docker build -t framer-to-html .
docker run -p 3000:3000 framer-to-html
```

### Error: "Chrome crashed"

**Solution: Add more Chrome arguments**
The updated `route.ts` includes additional Chrome arguments for stability:

- `--disable-dev-shm-usage`
- `--single-process`
- `--disable-gpu`

### Error: "Timeout waiting for Chrome"

**Solution: Increase timeout**
The code already includes a 120-second timeout, but you can adjust it in `route.ts`:

```typescript
await page.goto(url.toString(), {
  waitUntil: "networkidle0",
  timeout: 120_000, // 2 minutes
});
```

## 📋 Environment Variables

Set these environment variables in your deployment platform:

```bash
# Required for production
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Optional: Increase memory limit
NODE_OPTIONS=--max-old-space-size=4096
```

## 🎯 Platform-Specific Instructions

### Vercel

1. Deploy with the provided `vercel.json`
2. Chrome will be installed automatically
3. No additional configuration needed

### Railway

1. Add build command: `npx puppeteer browsers install chrome && npm run build`
2. Set environment variables in Railway dashboard
3. Deploy

### Render

1. Set environment variables in Render dashboard
2. Use the provided Dockerfile
3. Deploy

### Docker

1. Use the provided Dockerfile
2. Build and run the container
3. Chrome is pre-installed

## ✅ Verification

After deployment, test the export functionality:

1. Go to your deployed application
2. Enter a Framer URL
3. Click "Export to HTML"
4. Verify the download works

## 🆘 Still Having Issues?

If you're still experiencing issues:

1. **Check logs**: Look at your deployment platform's logs
2. **Test locally**: Run `npm run dev` and test the export
3. **Use Docker**: The Dockerfile should work in most environments
4. **Contact support**: Each platform has specific Puppeteer support

## 📚 Additional Resources

- [Puppeteer Documentation](https://pptr.dev/)
- [Vercel Puppeteer Guide](https://vercel.com/guides/how-can-i-use-puppeteer-with-vercel)
- [Docker Puppeteer Guide](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker)

---

**Status**: ✅ **Production-Ready with Chrome Support**
