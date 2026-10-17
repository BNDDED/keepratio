import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact KeepRatio at hello@keepratio.com about the aspect ratio calculator on keepratio.com.",
  alternates: { canonical: "https://keepratio.com/contact/" },
  openGraph: {
    title: "Contact — KeepRatio",
    url: "https://keepratio.com/contact/",
  },
};

export default function ContactPage() {
  return (
    <main className="shell py-12">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">KeepRatio</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Contact</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Questions about the aspect ratio calculator, a preset size, or the site
        at keepratio.com can go to{" "}
        <a className="text-ink underline underline-offset-4" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        . KeepRatio reads every note. This version does not upload images or
        batch-crop files.
      </p>
      <div className="mt-8 max-w-xl border border-line bg-raised p-5 sm:p-6">
        <h2 className="font-display text-2xl">Email KeepRatio</h2>
        <p className="mt-2 text-sm text-muted">
          The form opens your email app addressed to {SITE.email}. You can also
          write to that address directly.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
