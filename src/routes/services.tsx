import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "مجالات عملنا | سمارت تكنو — Smart Techno Services" },
      {
        name: "description",
        content:
          "تطبيقات موبايل، مواقع ويب احترافية وأنظمة تفاعلية، حلول برمجية، وألعاب تفاعلية ومحاكاة وتعليم.",
      },
      { property: "og:title", content: "مجالات عملنا | سمارت تكنو" },
      {
        property: "og:description",
        content: "تطبيقات موبايل، مواقع وأنظمة تفاعلية، حلول برمجية، وألعاب تعليمية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLanguage();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-latin text-xs font-semibold uppercase tracking-[0.3em] text-brand/70">
              {t.services.kicker}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white [text-wrap:balance] sm:text-5xl">
              {t.services.title}
            </h1>
          </div>
          <span className="hidden font-latin text-sm font-medium text-white/30 sm:block">
            {t.services.meta}
          </span>
        </div>
        <p className="mb-12 max-w-[55ch] text-base leading-relaxed text-white/55 [text-wrap:pretty] sm:text-lg">
          {t.services.intro}
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {t.services.items.map((item) => (
            <div
              key={item.num}
              className="group rounded-[20px] bg-panel p-7 ring-1 ring-line transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-[10px] bg-brand/10 text-brand ring-1 ring-brand/20">
                  <span className="font-latin text-lg font-bold">{item.num}</span>
                </span>
                <span className="font-latin text-[11px] uppercase tracking-[0.2em] text-white/25">
                  {item.tag}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55 [text-wrap:pretty] sm:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
