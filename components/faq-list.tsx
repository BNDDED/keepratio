import { FAQS } from "@/lib/faq";

export function FaqList() {
  return (
    <section id="faq" className="shell scroll-mt-24 py-14">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
        Aspect ratio questions
      </h2>
      <p className="mt-3 max-w-3xl text-muted">
        Short answers for the sizes and ratios this calculator is built around,
        including 16:9, 9:16, Instagram, TikTok, and YouTube Shorts.
      </p>
      <div className="mt-6 border-t border-line">
        {FAQS.map((faq) => (
          <details key={faq.question} className="border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium">
              {faq.question}
              <span aria-hidden="true" className="text-signal">
                +
              </span>
            </summary>
            <p className="max-w-3xl pb-4 leading-7 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
