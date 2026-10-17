export function UseCases() {
  return (
    <section id="use-cases" className="border-y border-line bg-raised/80">
      <div className="shell py-14">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Image, video, and social ratios
        </h2>
        <p className="mt-3 max-w-3xl text-muted">
          The pixel presets above are the sizes editors ask for. The notes
          below say which shape belongs to which job, from a YouTube master to
          a TikTok cover and a CSS frame.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article>
            <h3 className="font-display text-2xl">16:9 landscape video</h3>
            <p className="mt-2 leading-7 text-muted">
              16:9 is the widescreen ratio for YouTube, presentations, and most
              landscape video. 1280×720 is 720p, 1920×1080 is HD, and
              3840×2160 is 4K UHD. All three simplify to 16:9. Lock 16:9 when
              you know only one side of a new export.
            </p>
          </article>
          <article>
            <h3 className="font-display text-2xl">9:16 vertical video</h3>
            <p className="mt-2 leading-7 text-muted">
              9:16 is the portrait video ratio used by TikTok, Instagram Reels,
              and YouTube Shorts. The usual full-HD vertical frame is
              1080×1920. It is 1920×1080 turned on its side: same pixel count,
              opposite ratio.
            </p>
          </article>
          <article>
            <h3 className="font-display text-2xl">Instagram 4:5 and 1:1</h3>
            <p className="mt-2 leading-7 text-muted">
              Instagram feed portraits are often 4:5 at 1080×1350, which gives
              the photo more room in the grid than a square. Profile crops and
              square posts are 1:1, commonly 1080×1080. Stories stay on the
              9:16 vertical frame.
            </p>
          </article>
          <article>
            <h3 className="font-display text-2xl">CSS aspect-ratio</h3>
            <p className="mt-2 leading-7 text-muted">
              The CSS aspect-ratio property keeps a box in proportion without a
              padding hack. Copy <span className="text-ink">aspect-ratio: 16 / 9;</span>{" "}
              for widescreen, <span className="text-ink">aspect-ratio: 9 / 16;</span>{" "}
              for a Shorts-style frame, or <span className="text-ink">aspect-ratio: 1 / 1;</span>{" "}
              for a square. The numbers are the same W:H result the calculator shows.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
