# 🚀 Simple Deployment Guide (No Docker)

Solusi sederhana untuk deploy aplikasi Framer-to-HTML tanpa Docker.

## 🎯 Solusi Terbaik: Gunakan Puppeteer dengan Chrome yang sudah terinstall

### **1. Vercel (Paling Mudah)**

Vercel sudah support Puppeteer out-of-the-box. Cukup deploy saja:

```bash
# Install dependencies
npm install

# Deploy ke Vercel
npx vercel --prod
```

**Tidak perlu konfigurasi tambahan!** Vercel akan otomatis install Chrome.

### **2. Railway (Mudah)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login ke Railway
railway login

# Deploy
railway up
```

Railway akan otomatis detect dan install Chrome.

### **3. Render (Mudah)**

1. Connect GitHub repository ke Render
2. Pilih "Web Service"
3. Render akan otomatis install dependencies dan Chrome

### **4. Netlify Functions (Sedikit konfigurasi)**

Buat file `netlify.toml`:

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

## 🔧 Solusi Alternatif: Install Chrome Manual

Jika platform tidak support Puppeteer otomatis:

### **1. Tambahkan script di package.json:**

```json
{
  "scripts": {
    "postinstall": "npx puppeteer browsers install chrome"
  }
}
```

### **2. Set environment variables:**

```bash
# Untuk production
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
```

### **3. Update vercel.json (jika pakai Vercel):**

```json
{
  "functions": {
    "src/app/api/export/route.ts": {
      "maxDuration": 60
    }
  }
}
```

## 🎯 Solusi Paling Sederhana: Gunakan Platform yang Support Puppeteer

### **Rekomendasi Platform:**

1. **Vercel** ⭐ (Paling mudah)

   - Support Puppeteer otomatis
   - Tidak perlu konfigurasi
   - Deploy dengan 1 command

2. **Railway** ⭐ (Mudah)

   - Auto-detect Puppeteer
   - Support Chrome otomatis
   - Deploy dengan 1 command

3. **Render** ⭐ (Mudah)
   - Support Puppeteer
   - Auto-install Chrome
   - Connect GitHub langsung

### **Platform yang Perlu Konfigurasi:**

- **Netlify Functions** (perlu setup)
- **AWS Lambda** (perlu layer Chrome)
- **Google Cloud Functions** (perlu custom runtime)

## 🚀 Quick Deploy ke Vercel (Rekomendasi)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login ke Vercel
vercel login

# 3. Deploy
vercel --prod

# Selesai! Aplikasi sudah online
```

**Tidak perlu:**

- ❌ Docker
- ❌ Konfigurasi Chrome
- ❌ Environment variables
- ❌ Script tambahan

## 🔍 Troubleshooting

### **Jika masih error di Vercel:**

1. **Check Vercel logs:**

   ```bash
   vercel logs
   ```

2. **Update vercel.json:**

   ```json
   {
     "functions": {
       "src/app/api/export/route.ts": {
         "maxDuration": 60
       }
     }
   }
   ```

3. **Test locally:**
   ```bash
   npm run dev
   # Test export functionality
   ```

### **Jika error di platform lain:**

1. **Railway:** Tambahkan build command: `npx puppeteer browsers install chrome && npm run build`
2. **Render:** Set environment variable: `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false`
3. **Netlify:** Gunakan Netlify Functions dengan custom runtime

## ✅ Verifikasi Deploy

Setelah deploy, test:

1. Buka aplikasi di browser
2. Masukkan Framer URL
3. Klik "Export to HTML"
4. Pastikan download berhasil

## 🎯 Kesimpulan

**Solusi terbaik:** Gunakan **Vercel** karena:

- ✅ Support Puppeteer otomatis
- ✅ Tidak perlu konfigurasi
- ✅ Deploy dengan 1 command
- ✅ Free tier cukup untuk testing
- ✅ Auto-scaling

**Command untuk deploy:**

```bash
npx vercel --prod
```

**Selesai!** 🎉

---

**Status**: ✅ **Ready to Deploy (No Docker Needed)**
