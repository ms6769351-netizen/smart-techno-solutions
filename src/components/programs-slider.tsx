import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export type Program = { key: string; img?: string; qr?: string; url?: string; chip?: { ar: string; en: string } };

export function ProgramsSlider({ programs }: { programs: Program[] }) {
  const { t, lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const cardStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 320;
    const card = track.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + 20 : 320;
  }, []);

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const rtl = document.documentElement.dir === "rtl";
      const step = cardStep() * dir * (rtl ? -1 : 1);
      const max = track.scrollWidth - track.clientWidth;
      const pos = Math.abs(track.scrollLeft);
      // loop back to start when reaching the end
      if (dir === 1 && pos >= max - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    },
    [cardStep],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => scrollByCard(1), 4000);
    return () => clearInterval(id);
  }, [paused, scrollByCard]);

  return (
    <div
      className="relative mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* arrows */}
      <button
        type="button"
        aria-label="prev"
        onClick={() => scrollByCard(-1)}
        className="absolute -left-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-panel/90 text-brand ring-1 ring-line backdrop-blur transition-all hover:scale-110 hover:ring-brand/50 sm:grid lg:-left-6"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="next"
        onClick={() => scrollByCard(1)}
        className="absolute -right-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-panel/90 text-brand ring-1 ring-line backdrop-blur transition-all hover:scale-110 hover:ring-brand/50 sm:grid lg:-right-6"
      >
        <ChevronRight className="size-6" />
      </button>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {programs.map((p, i) => {
          const info = t.services.programs.list[i] ?? { name: p.key, desc: "" };
          return (
            <article
              key={p.key}
              data-card
              className="group flex w-[78vw] max-w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] bg-panel/85 ring-1 ring-line backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:ring-brand/40 sm:w-[300px]"
            >
              {/* phone-style image */}
              <div className="relative flex h-72 items-end justify-center overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent pt-6">
                {p.img ? (
                  <div className="relative h-full w-[62%] overflow-hidden rounded-t-[28px] ring-1 ring-white/10 shadow-[0_-10px_50px_-20px_rgba(16,185,129,0.35)]">
                    <img
                      src={p.img}
                      alt={info.name}
                      loading="lazy"
                      className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="grid h-full w-[62%] place-items-center rounded-t-[28px] ring-1 ring-dashed ring-line">
                    <span className="rounded-full bg-brand/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand/80">
                      {t.services.programs.comingSoon}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col items-center p-6 text-center">
                {p.chip && (
                  <span className="rounded-full bg-brand/10 px-4 py-1 text-[11px] font-bold text-brand ring-1 ring-brand/25">
                    {lang === "ar" ? p.chip.ar : p.chip.en}
                  </span>
                )}
                <h4 className="mt-3 font-display text-xl font-bold text-white">{info.name}</h4>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/55 [text-wrap:pretty]">
                  {p.url ? info.desc : t.services.programs.comingSoonDesc}
                </p>

                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white/[0.06] px-6 py-3 text-sm font-bold text-white ring-1 ring-line transition-all duration-300 hover:bg-brand hover:text-ink hover:ring-brand"
                  >
                    {t.services.programs.viewProject}
                    <ArrowLeft className="size-4 rtl:rotate-0 ltr:rotate-180" />
                  </a>
                ) : (
                  <span className="mt-5 flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white/30 ring-1 ring-line">
                    {t.services.programs.comingSoon}
                  </span>
                )}

                {p.qr && (
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={p.qr}
                      alt="QR"
                      className="size-16 rounded-lg bg-white p-1 transition-transform duration-300 hover:scale-125"
                    />
                    <span className="max-w-[10ch] text-start text-[11px] text-white/45">
                      {t.services.programs.scan}
                    </span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* mobile arrows */}
      <div className="mt-2 flex justify-center gap-3 sm:hidden">
        <button
          type="button"
          aria-label="prev"
          onClick={() => scrollByCard(-1)}
          className="grid size-11 place-items-center rounded-full bg-panel/90 text-brand ring-1 ring-line"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="next"
          onClick={() => scrollByCard(1)}
          className="grid size-11 place-items-center rounded-full bg-panel/90 text-brand ring-1 ring-line"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
