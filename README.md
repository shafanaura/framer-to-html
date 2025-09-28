# Framer to HTML Export

A Next.js application that converts Framer websites into static HTML files. This tool allows you to export any Framer site as a downloadable ZIP file containing clean HTML pages with all Framer-specific elements removed.

## 🚀 Features

- **One-Click Export**: Simply paste a Framer URL and download a ZIP file
- **Complete Site Crawling**: Automatically discovers all pages via sitemap.xml
- **Clean HTML Output**: Removes Framer badges, editor bars, and other UI elements
- **Static File Generation**: Converts dynamic Framer sites to static HTML
- **Progress Tracking**: Real-time progress indicator during export
- **Modern UI**: Built with Mantine components and responsive design

## 🛠️ How It Works

1. **URL Validation**: Validates the input URL to ensure it's a proper Framer site
2. **Sitemap Discovery**: Fetches and parses the site's sitemap.xml to find all pages
3. **Page Crawling**: Uses Puppeteer to visit each page and capture the rendered HTML
4. **Content Cleaning**: Removes Framer-specific elements and UI components
5. **Link Rewriting**: Converts internal links to work with static HTML files
6. **ZIP Generation**: Packages all pages into a downloadable ZIP file

## 🏗️ Technical Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: Mantine v8
- **Web Scraping**: Puppeteer
- **File Processing**: JSZip
- **XML Parsing**: fast-xml-parser
- **Concurrency**: p-limit for controlled parallel processing
- **Styling**: PostCSS with Mantine preset

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd framer-to-html
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Deploy to Vercel

The project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📖 Usage

1. **Enter Framer URL**: Paste any Framer site URL (e.g., `https://example.framer.ai`)
2. **Click Export**: The tool will automatically discover all pages and process them
3. **Download ZIP**: Get a clean HTML export of the entire site

### Supported URL Formats

- `https://example.framer.ai`
- `https://example.framer.website`
- Any Framer-hosted site

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality.

### Puppeteer Configuration

The tool uses Puppeteer with the following settings:

- Headless mode enabled
- Viewport: 1440x1024
- Network idle wait for complete page loading
- 120-second timeout per page

### Concurrency Limits

- Maximum 3 concurrent page processing
- 1-second delay after page load for animation settling

## 🧹 Content Cleaning

The export process removes:

- Framer badge elements (`__framer-badge`)
- Editor bar components (`__framer-editorbar`)
- Framer-specific CSS classes
- Dynamic JavaScript artifacts
- Editor-related iframes and containers

## 📁 Output Structure

The generated ZIP contains:

- `index.html` - Homepage
- `page-name.html` - Other pages (sanitized filenames)
- All internal links rewritten for static hosting
- Clean HTML without Framer dependencies

## 🛡️ Error Handling

- **Invalid URLs**: Validates URL format and protocol
- **Network Errors**: Handles failed page loads gracefully
- **Timeout Protection**: 120-second limit per page
- **Sitemap Fallback**: Uses homepage if sitemap is unavailable

## 🔍 API Endpoints

### POST `/api/export`

Exports a Framer site to HTML ZIP.

**Request Body:**

```json
{
  "url": "https://example.framer.ai"
}
```

**Response:**

- Success: ZIP file download
- Error: JSON error message

## 🧪 Development

### Project Structure

```
src/
├── app/
│   ├── api/export/route.ts    # Export API endpoint
│   ├── page.tsx              # Main UI component
│   └── layout.tsx            # App layout
└── utils/
    ├── filename.ts           # Filename sanitization
    ├── rewriter.ts           # HTML content cleaning
    ├── sitemap.ts            # Sitemap parsing
    └── url.ts                # URL validation
```

### Key Components

- **Home Page**: User interface for URL input and export
- **Export API**: Handles the entire export process
- **URL Utils**: Validates and processes Framer URLs
- **Sitemap Parser**: Discovers all site pages
- **HTML Rewriter**: Cleans and optimizes HTML content
- **Filename Utils**: Creates safe filenames for static hosting

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For issues or feature requests, please contact the maintainers.

## 🔮 Future Enhancements

- Support for custom viewport sizes
- Batch export multiple sites
- CSS optimization and minification
- Image optimization and compression
- Support for Framer animations preservation
- Custom export templates
