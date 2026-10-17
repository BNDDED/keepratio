import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg text-ink">{SITE.name}</p>
          <p className="mt-1 max-w-md">
            Aspect ratio calculator for images, video, and CSS. Canonical site:{" "}
            <a className="text-ink underline decoration-line underline-offset-4" href={SITE.canonical}>
              {SITE.domain}
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-5">
          <Link className="text-ink underline decoration-line underline-offset-4" href="/privacy">
            Privacy
          </Link>
          <Link className="text-ink underline decoration-line underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
      <div className="shell pb-8 text-xs tracking-wide text-muted">© 2026 {SITE.name}</div>
    </footer>
  );
}
