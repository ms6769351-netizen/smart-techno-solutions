import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | سمارت تكنو — Contact Smart Techno" },
      {
        name: "description",
        content:
          "هيا نعمل معاً — راسلنا على Info@smarttechno.app لتحويل فكرتك إلى منتج رقمي حقيقي.",
      },
      { property: "og:title", content: "هيا نعمل معاً | سمارت تكنو" },
      {
        property: "og:description",
        content: "أخبرنا عن فكرتك وسنحوّلها معاً إلى منتج رقمي حقيقي.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(45,212,191,0.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-32 text-center sm:px-8 sm:py-40">
        <p className="rise rise-1 font-latin text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {t.contact.kicker}
        </p>
        <h1 className="rise rise-2 mt-6 font-display text-5xl font-black leading-tight text-white [text-wrap:balance] sm:text-7xl">
          {t.contact.title}
        </h1>
        <p className="rise rise-3 mx-auto mt-6 max-w-[40ch] text-base leading-relaxed text-white/55 [text-wrap:pretty] sm:text-lg">
          {t.contact.paragraph}
        </p>

        <div className="rise rise-3 mt-12 flex flex-col items-center gap-5">
          <a
            href="mailto:Info@smarttechno.app"
            className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-base font-bold text-ink ring-1 ring-brand/50 transition-transform hover:-translate-y-0.5 sm:text-lg"
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span className="font-latin" dir="ltr">
              Info@smarttechno.app
            </span>
          </a>
          <p className="text-xs font-medium text-white/40">{t.contact.responseNote}</p>
        </div>
      </div>
    </section>
  );
}
