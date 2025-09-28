import { XMLParser } from "fast-xml-parser";

type ParsedSitemap = {
  urlset?: { url?: Array<{ loc?: string } | { loc?: Array<string> }> };
  sitemapindex?: { sitemap?: Array<{ loc?: string }> };
};

export async function readSitemapUrls(siteOrigin: string): Promise<string[]> {
  const parser = new XMLParser({ ignoreAttributes: false });
  const urls = new Set<string>();

  const pushUrl = (u: string | undefined) => {
    if (!u) return;
    try {
      const parsedUrl = new URL(u);
      if (parsedUrl.origin === siteOrigin) urls.add(parsedUrl.toString());
    } catch {
      // ignore
    }
  };

  const readUrlset = (parsed: ParsedSitemap) => {
    if (!parsed.urlset || !Array.isArray(parsed.urlset.url)) return;
    for (const u of parsed.urlset.url) {
      if (typeof u === "object" && u) {
        if (Array.isArray((u as any).loc)) {
          for (const loc of (u as any).loc as Array<string>) pushUrl(loc);
        } else {
          pushUrl((u as any).loc as string | undefined);
        }
      }
    }
  };

  const fetchXml = async (pathOrUrl: string) => {
    const target = new URL(pathOrUrl, siteOrigin).toString();
    const res = await fetch(target, { cache: "no-store" });
    if (!res.ok) throw new Error(`Sitemap status ${res.status}`);
    const xml = await res.text();
    return parser.parse(xml) as ParsedSitemap;
  };

  try {
    const root = await fetchXml("/sitemap.xml");
    if (root.sitemapindex && Array.isArray(root.sitemapindex.sitemap)) {
      await Promise.all(
        root.sitemapindex.sitemap.map(async (s) => {
          if (!s?.loc) return;
          try {
            const child = await fetchXml(s.loc);
            readUrlset(child);
          } catch {}
        })
      );
    } else {
      readUrlset(root);
    }
  } catch {}

  if (urls.size === 0) urls.add(siteOrigin);
  return Array.from(urls);
}
