import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "@/hooks/use-reveal";
import { BackgroundSlideshow } from "@/components/background-slideshow";
import hodnaImg from "@/assets/prog-hodna.jpg";
import saghaImg from "@/assets/prog-sagha.jpg";
import masarImg from "@/assets/prog-masar.jpg";
import qararImg from "@/assets/prog-qarar.jpg";
import hodnaQr from "@/assets/qr-hodna.svg";
import saghaQr from "@/assets/qr-sagha.svg";
import masarQr from "@/assets/qr-masar.svg";
import qararQr from "@/assets/qr-qarar.svg";

const PROGRAMS: { key: string; img?: string; qr?: string; url?: string }[] = [
  { key: "hodna", img: hodnaImg, qr: hodnaQr, url: "https://sokoon-wellness-app--ugareetjo.replit.app/" },
  { key: "sagha", img: saghaImg, qr: saghaQr, url: "https://aurum-coral-alpha.vercel.app/" },
  { key: "masar", img: masarImg, qr: masarQr, url: "https://masar-app-phi.vercel.app/" },
  { key: "qarar", img: qararImg, qr: qararQr, url: "https://qrr-fwry--malakshaker429.replit.app/" },
  { key: "rahma" },
];

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
      <BackgroundSlideshow />

      {/* Hero */}
      <section id="home" className="relative scroll-mt-16 overflow-hidden border-b border-line/80">
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="rise rise-1 flex items-center gap-2 text-xs font-semibold text-accent">
            <span className="size-2 animate-ping rounded-full bg-brand" />
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
              className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink ring-1 ring-brand/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(16,185,129,0.8)]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#services"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white/70 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 hover:text-white"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-16 border-b border-line/80">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-latin text-xs font-semibold uppercase tracking-[0.3em] text-brand/70">
              {t.about.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white [text-wrap:balance] sm:text-4xl">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <p className="text-base leading-loose text-white/60 [text-wrap:pretty] sm:text-lg">
              {t.about.p1}
            </p>
            <p className="mt-6 text-base leading-loose text-white/60 [text-wrap:pretty] sm:text-lg">
              {t.about.p2}
            </p>
          </Reveal>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {t.about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 120}>
                <div className="group h-full rounded-[20px] bg-panel/80 p-7 ring-1 ring-line backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:ring-brand/40">
                  <span className="grid size-12 place-items-center rounded-[10px] bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                    <span className="font-latin text-lg font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 [text-wrap:pretty]">
                    {value.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-16 border-b border-line/80">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal>
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
            <p className="max-w-[55ch] text-base leading-relaxed text-white/55 [text-wrap:pretty]">
              {t.services.intro}
            </p>
          </Reveal>

          {/* Part 1 — Our programs */}
          <Reveal delay={80}>
            <div className="mt-16 flex items-center gap-4">
              <span className="h-px flex-1 bg-line" />
              <h3 className="font-display text-2xl font-bold text-white">
                {t.services.programs.title}
              </h3>
              <span className="h-px flex-1 bg-line" />
            </div>
            <p className="mt-3 text-center text-sm text-white/50">
              {t.services.programs.subtitle}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p, i) => {
              const info = t.services.programs.list[i] ?? { name: p.key, desc: "" };
              return (
                <Reveal key={p.key} delay={(i % 3) * 120}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-panel/80 ring-1 ring-line backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:ring-brand/40">
                    <div className="relative h-64 overflow-hidden bg-white/[0.02]">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={info.name}
                          loading="lazy"
                          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid size-full place-items-center">
                          <span className="rounded-full bg-brand/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand/80">
                            {t.services.programs.comingSoon}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h4 className="font-display text-2xl font-bold text-brand">{info.name}</h4>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60 [text-wrap:pretty]">
                        {p.url ? info.desc : t.services.programs.comingSoonDesc}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-5">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(16,185,129,0.8)]"
                          >
                            {t.services.programs.visit}
                          </a>
                        ) : (
                          <span className="rounded-full px-6 py-3 text-sm font-semibold text-white/30 ring-1 ring-line">
                            {t.services.programs.visit}
                          </span>
                        )}
                        {p.qr ? (
                          <div className="flex items-center gap-3">
                            <img
                              src={p.qr}
                              alt="QR"
                              className="size-20 rounded-lg bg-white p-1 transition-transform duration-300 hover:scale-125"
                            />
                            <span className="max-w-[10ch] text-xs text-white/45">
                              {t.services.programs.scan}
                            </span>
                          </div>
                        ) : (
                          <span className="grid size-20 place-items-center rounded-lg text-[10px] text-white/25 ring-1 ring-dashed ring-line">
                            QR
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Part 2 — Offerings */}
          <Reveal delay={80}>
            <div className="mt-20 flex items-center gap-4">
              <span className="h-px flex-1 bg-line" />
              <h3 className="font-display text-2xl font-bold text-white">
                {t.services.offerings.title}
              </h3>
              <span className="h-px flex-1 bg-line" />
            </div>
            <p className="mt-3 text-center text-sm text-white/50">
              {t.services.offerings.subtitle}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.offerings.items.map((item, i) => (
              <Reveal key={item.num} delay={i * 120}>
                <Link
                  to="/order/$type"
                  params={{ type: (["mobile", "web", "games"] as const)[i] ?? "mobile" }}
                  className="group relative block h-full overflow-hidden rounded-[20px] bg-panel/80 p-7 ring-1 ring-line backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:ring-brand/40"
                >
                  <div className="absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-brand to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-[10px] bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                      <span className="font-latin text-lg font-bold">{item.num}</span>
                    </span>
                  </div>
                  <h4 className="mt-6 font-display text-xl font-bold text-white">{item.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 [text-wrap:pretty]">
                    {item.desc}
                  </p>
                  <p className="mt-5 font-latin text-[11px] uppercase tracking-[0.2em] text-white/25">
                    {item.tag}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative scroll-mt-16 overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
          <Reveal>
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
                className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink ring-1 ring-brand/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-14px_rgba(16,185,129,0.85)]"
              >
                <span className="font-latin" dir="ltr">
                  Info@smarttechno.app
                </span>
              </a>
              <p className="text-xs font-medium text-white/40">{t.contact.responseNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
