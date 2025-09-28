import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import pLimit from "p-limit";
import puppeteer from "puppeteer";
import { assertFramerUrl } from "@/utils/url";
import { toFilename } from "@/utils/filename";
import { buildRewriters } from "@/utils/rewriter";
import { readSitemapUrls } from "@/utils/sitemap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { url?: string } | null;
    const inputUrl = body?.url ?? "";
    const site = assertFramerUrl(inputUrl);
    const siteOrigin = site.origin;

    const urls = await readSitemapUrls(siteOrigin);

    // Build filename mapping
    const pathToFilename = new Map<string, string>();
    for (const u of urls) {
      const { pathname } = new URL(u);
      pathToFilename.set(pathname, toFilename(pathname));
    }

    const rewriteHtml = buildRewriters(siteOrigin, pathToFilename);

    const zip = new JSZip();
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
    });
    try {
      const limit = pLimit(3);
      await Promise.all(
        urls.map((urlStr) =>
          limit(async () => {
            const url = new URL(urlStr);
            const filename =
              pathToFilename.get(url.pathname) ?? toFilename(url.pathname);
            const page = await browser.newPage();
            try {
              await page.setViewport({
                width: 1440,
                height: 1024,
                deviceScaleFactor: 1,
              });
              await page.goto(url.toString(), {
                waitUntil: "networkidle0",
                timeout: 120_000,
              });
              // Give Framer a bit of time to settle animations/lazy code
              await new Promise((resolve) => setTimeout(resolve, 1000));
              const html = await page.evaluate(
                () => document.documentElement.outerHTML
              );
              const rewritten = rewriteHtml(html);
              zip.file(filename, rewritten);
            } finally {
              await page.close();
            }
          })
        )
      );
    } finally {
      await browser.close();
    }

    const arrayBuffer = await zip.generateAsync({ type: "arraybuffer" });
    return new NextResponse(arrayBuffer as unknown as ArrayBuffer, {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=framer-export-${site.hostname}.zip`,
        "Cache-Control": "no-store",
      }),
    });
  } catch (error: any) {
    const message = error?.message || "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
