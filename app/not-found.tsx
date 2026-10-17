import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">KeepRatio</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted">
        That address is not on keepratio.com. The aspect ratio calculator is on
        the home page.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block border border-ink px-4 py-2 text-sm uppercase tracking-[0.12em]"
      >
        Back to the calculator
      </Link>
    </main>
  );
}
