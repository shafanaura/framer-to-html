export function toFilename(pathname: string): string {
  if (pathname === "/" || pathname.trim() === "") return "index.html";
  const clean = pathname.replace(/^\/+|\/+$/g, "").replace(/\/+/, "/");
  const flattened = clean.replace(/\/+|[^a-zA-Z0-9_-]/g, "-");
  return `${flattened || "index"}.html`;
}
