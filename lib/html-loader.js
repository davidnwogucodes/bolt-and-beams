import { readFile } from "node:fs/promises";
import path from "node:path";

const HTML_ROOT = path.join(process.cwd(), "html");

function normalizeHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href === "index.html") {
    return "/";
  }

  if (href.endsWith(".html")) {
    const withoutExt = href.slice(0, -5);
    return withoutExt.startsWith("/") ? withoutExt : `/${withoutExt}`;
  }

  return href;
}

function rewriteTemplateLinks(html) {
  return html
    .replace(/\r\n/g, "\n")
    .replaceAll("../assets/", "/assets/")
    .replaceAll("./assets/", "/assets/")
    .replaceAll("/assets/images/logos/logo-dark.svg", "/assets/images/logos/logo-white.svg")
    .replaceAll('href="index.html"', 'href="/"')
    .replace(/href="([^"]+)"/g, (_, href) => `href="${normalizeHref(href)}"`);
}

function extractTagContent(html, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = html.match(regex);
  return match ? match[1] : "";
}

export async function loadLegacyPage(slugSegments = []) {
  const slug = slugSegments.length === 0 ? "index" : slugSegments.join("/");
  const filePath = path.join(HTML_ROOT, `${slug}.html`);
  const file = await readFile(filePath, "utf8");

  const titleMatch = file.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "Studiova";

  const body = extractTagContent(file, "body");
  const html = rewriteTemplateLinks(body);

  return { title, html };
}
