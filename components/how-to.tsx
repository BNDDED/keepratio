export function HowTo() {
  return (
    <section id="how-to" className="shell scroll-mt-24 py-14">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
        How to calculate an aspect ratio
      </h2>
      <p className="mt-3 max-w-3xl text-muted">
        Use KeepRatio as an image aspect ratio calculator when you are sizing a
        crop, or as a video aspect ratio calculator when a timeline needs a
        matching frame. The same two modes cover both.
      </p>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        <li className="border border-line bg-raised p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-signal">01</p>
          <h3 className="mt-3 font-display text-2xl">Find a ratio</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Type the pixel width and height. KeepRatio divides both numbers by
            their greatest common divisor. 1920 and 1080 become 16:9. 1080 and
            1350 become 4:5. 1080 and 1080 stay 1:1.
          </p>
        </li>
        <li className="border border-line bg-raised p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-signal">02</p>
          <h3 className="mt-3 font-display text-2xl">Lock a ratio</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Choose a ratio such as 16:9 or 9:16, then enter the side you already
            know. A 16:9 frame that is 1280 pixels wide is 720 pixels tall. A
            9:16 frame that is 1080 pixels wide is 1920 pixels tall.
          </p>
        </li>
        <li className="border border-line bg-raised p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-signal">03</p>
          <h3 className="mt-3 font-display text-2xl">Copy the result</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Each result has its own copy button: the simplified ratio (16:9),
            the dimensions (1920×1080), and the CSS declaration
            (aspect-ratio: 16 / 9;). If a locked size is not a whole pixel,
            copy the exact size or the nearest whole pixels.
          </p>
        </li>
      </ol>
      <pre className="mt-6 overflow-x-auto border border-line bg-ink p-4 text-sm text-raised">
        <code>{`.frame {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n}`}</code>
      </pre>
    </section>
  );
}
