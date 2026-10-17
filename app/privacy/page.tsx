import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for KeepRatio at keepratio.com. The aspect ratio calculator runs in your browser and does not upload images.",
  alternates: { canonical: "https://keepratio.com/privacy/" },
  openGraph: {
    title: "Privacy Policy — KeepRatio",
    url: "https://keepratio.com/privacy/",
  },
};

export default function PrivacyPage() {
  return (
    <main className="shell py-12">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">KeepRatio</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Privacy Policy</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        This policy describes how KeepRatio, the site at{" "}
        <a className="text-ink underline underline-offset-4" href={SITE.canonical}>
          {SITE.domain}
        </a>
        , handles information. Last updated October 17, 2026.
      </p>

      <div className="mt-10 grid max-w-3xl gap-8 leading-7">
        <section>
          <h2 className="font-display text-2xl">Who we are</h2>
          <p className="mt-2 text-muted">
            KeepRatio publishes an aspect ratio calculator at https://keepratio.com/.
            There is no account system. Privacy questions can go to{" "}
            <a className="text-ink underline underline-offset-4" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">What you type</h2>
          <p className="mt-2 text-muted">
            Widths, heights, and ratios are calculated in your browser. KeepRatio
            does not send those numbers to a KeepRatio database, and this version
            does not upload images or run a batch crop. Closing the page clears
            the figures you typed.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Hosting logs</h2>
          <p className="mt-2 text-muted">
            The host that serves keepratio.com may keep ordinary connection logs,
            such as IP address, browser type, and the page requested, so the site
            can be delivered and protected. KeepRatio does not sell personal
            information.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Advertisements</h2>
          <p className="mt-2 text-muted">
            The advertisement areas on the calculator page are empty placeholders.
            They do not load an ad network in this version. If a later version
            loads a third-party ad provider, this policy will name that provider
            and what it may collect.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Contact</h2>
          <p className="mt-2 text-muted">
            To ask about this policy or about KeepRatio, email {SITE.email} or
            use the contact page at https://keepratio.com/contact/.
          </p>
        </section>
      </div>
    </main>
  );
}
