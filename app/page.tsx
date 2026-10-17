import { FaqList } from "@/components/faq-list";
import { HowTo } from "@/components/how-to";
import { RatioWorkspace } from "@/components/ratio-workspace";
import { UseCases } from "@/components/use-cases";
import { FAQS } from "@/lib/faq";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  description: SITE.description,
  alternates: { canonical: SITE.canonical },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.canonical,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.canonical,
      },
      {
        "@type": "WebApplication",
        name: "KeepRatio Aspect Ratio Calculator",
        url: SITE.canonical,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: SITE.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="shell pb-6 pt-10 sm:pt-14">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          Image, video, and CSS ratios
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          Aspect Ratio Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Type a width and height to simplify the ratio, or lock a ratio and
          fill one side to calculate the other. For image crops, video frames,
          and CSS.
        </p>
      </header>
      <RatioWorkspace />
      <HowTo />
      <UseCases />
      <FaqList />
    </main>
  );
}
