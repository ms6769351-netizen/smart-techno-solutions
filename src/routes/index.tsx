import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "سمارت تكنو | Smart Techno — تحويل الأفكار إلى حلول برمجية" },
      {
        name: "description",
        content:
          "شركة برمجية مصرية تقدم حلولاً برمجية وتطبيقات تفاعلية صُممت خصيصاً لتلائم المستخدم — ألعاب، أدوات مالية وصحية، وأداء سريع.",
      },
      { property: "og:title", content: "سمارت تكنو | Smart Techno" },
      {
        property: "og:description",
        content: "تحويل الأفكار إلى حلول برمجية — ابتكار رقمي بهدف حقيقي.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative scroll-mt-16 overflow-hidden border-b border-line/80">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.14), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="rise rise-1 flex items-center gap-2 text-xs font-semibold text-accent">
            <span className="size-2 rounded-full bg-brand" />
            <span className="font-latin uppercase tracking-[0.3em]">{t.hero.kicker}</span>
          </div>

          <h1 className="rise rise-2 mt-8 max-w-[20ch] font-display text-[13vw] font-black leading-[1.05] tracking-tight text-white [text-wrap:balance] sm:text-7xl lg:text-8xl">
            {t.hero.titleA}
            <br />
            <span className="text-brand">{t.hero.titleB}</span>
          </h1>

          <p className="rise rise-3 mt-8 max-w-[46ch] text-base leading-relaxed text-white/60 [text-wrap:pretty] sm:text-lg">
            {t.hero.paragraph}
          </p>

          <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink ring-1 ring-brand/50 transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#services"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white/70 ring-1 ring-line transition-transform hover:-translate-y-0.5 hover:text-white"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-16 border-b border-line/80">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-latin text-xs font-semibold uppercase tracking-[0.3em] text-brand/70">
              {t.about.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white [text-wrap:balance] sm:text-4xl">
              {t.about.title}
            </h2>
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
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
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

      {/* Services */}
      <section id="services" className="scroll-mt-16 border-b border-line/80">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="font-latin text-xs font-semibold uppercase tracking-[0.3em] text-brand/70">
                {t.services.kicker}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white [text-wrap:balance] sm:text-4xl">
                {t.services.title}
              </h2>
            </div>
            <span className="hidden font-latin text-sm font-medium text-white/30 sm:block">
              {t.services.meta}
            </span>
          </div>
          <p className="mb-12 max-w-[55ch] text-base leading-relaxed text-white/55 [text-wrap:pretty]">
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
                <h3 className="mt-6 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55 [text-wrap:pretty]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative scroll-mt-16 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 100%, rgba(45,212,191,0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
          <p className="font-latin text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.contact.kicker}
          </p>
          <h2 className="mt-6 font-display text-5xl font-black leading-none text-white [text-wrap:balance] sm:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-base leading-relaxed text-white/55 [text-wrap:pretty] sm:text-lg">
            {t.contact.paragraph}
          </p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href="mailto:Info@smarttechno.app"
              className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink ring-1 ring-brand/50 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-latin" dir="ltr">
                Info@smarttechno.app
              </span>
            </a>
            <p className="text-xs font-medium text-white/40">{t.contact.responseNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
