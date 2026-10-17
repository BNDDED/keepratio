import Link from "next/link";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="h-1 bg-signal" />
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2.5 text-ink">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <rect x="1" y="5.5" width="20" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <rect x="6" y="1" width="10" height="20" fill="none" stroke="#c83a22" strokeWidth="1.4" />
          </svg>
          <span className="font-display text-xl tracking-tight">KeepRatio</span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
