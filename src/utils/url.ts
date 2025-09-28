export function assertFramerUrl(input: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(input);
  } catch (error) {
    throw new Error("Invalid URL");
  }
  if (!/^https?:/.test(parsed.protocol)) {
    throw new Error("URL must start with http or https");
  }
  return parsed;
}
