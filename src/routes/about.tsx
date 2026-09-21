import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | سمارت تكنو — About Smart Techno" },
      {
        name: "description",
        content:
          "شركة برمجية مصرية متخصصة في تصميم وتطوير تطبيقات الموبايل والحلول الرقمية التي تمس الواقع اليومي للمستخدم.",
      },
      { property: "og:title", content: "من نحن | سمارت تكنو" },
      {
        property: "og:description",
        content: "تكنولوجيا تُصنع لفهم الشارع واحتياجات الأفراد.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b border-line/80">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-latin text-xs font-semibold uppercase tracking-[0.3em] text-brand/70">
              {t.about.kicker}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white [text-wrap:balance] sm:text-5xl">
              {t.about.title}
            </h1>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-loose text-white/60 [text-wrap:pretty] sm:text-lg">
              {t.about.p1}
            </p>
            <p className="mt-6 text-base leading-loose text-white/60 [text-wrap:pretty] sm:text-lg">
              {t.about.p2}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {t.about.values.map((value, i) => (
              <div
                key={value.title}
                className="rounded-[20px] bg-panel p-7 ring-1 ring-line transition-transform hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-[10px] bg-brand/10 text-brand ring-1 ring-brand/20">
                  <span className="font-latin text-lg font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 [text-wrap:pretty]">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
