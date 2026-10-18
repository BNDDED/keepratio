import { SITEMAP_XML } from "@/lib/sitemap-xml";

// Fallback for requests that reach the App Router. `next start` serves
// `public/sitemap.xml` first; this handler is the prerendered response when
// that static file is not the match. It is not `app/sitemap.ts`.
export function GET() {
  return new Response(SITEMAP_XML, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
