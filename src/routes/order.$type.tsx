import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { BackgroundSlideshow } from "@/components/background-slideshow";
import { estimateProject } from "@/lib/estimate.functions";

const TYPES = ["mobile", "web", "games"] as const;
type T = (typeof TYPES)[number];

const titles: Record<T, { ar: string; en: string }> = {
  mobile: { ar: "طلب تطبيق موبايل", en: "Mobile App Request" },
  web: { ar: "طلب موقع ويب", en: "Website Request" },
  games: { ar: "طلب لعبة تفاعلية / تعليمية", en: "Interactive / Educational Game Request" },
};

export const Route = createFileRoute("/order/$type")({
  beforeLoad: ({ params }) => {
    if (!TYPES.includes(params.type as T)) throw notFound();
  },
  head: ({ params }) => {
    const t = titles[params.type as T] ?? titles.mobile;
    return {
      meta: [
        { title: `${t.ar} | سمارت تكنو` },
        { name: "description", content: "سجّل متطلبات مشروعك واحصل على تقدير فوري بالذكاء الاصطناعي للسعر ومدة التنفيذ." },
        { property: "og:title", content: `${t.ar} | Smart Techno` },
        { property: "og:description", content: "تقدير فوري للسعر ومدة التنفيذ لمشروعك البرمجي." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: OrderPage,
});

type Result = Awaited<ReturnType<typeof estimateProject>>;

function OrderPage() {
  const { type } = Route.useParams() as { type: T };
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const estimate = useServerFn(estimateProject);
  const [form, setForm] = useState({ name: "", details: "", pages: "5", audience: "", features: "", platforms: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [res, setRes] = useState<Extract<Result, { ok: true }> | null>(null);

  const L = ar
    ? { name: "اسم المشروع", details: "تفاصيل المشروع", pages: type === "games" ? "عدد المراحل / الشاشات" : "عدد الصفحات / الشاشات", audience: "الفئة المستهدفة", features: "أهم المميزات المطلوبة", platforms: type === "web" ? "نوع الموقع (شركة، شخصي، متجر...)" : "المنصات (أندرويد، iOS، ويب...)", submit: "حلّل مشروعي واحسب السعر", loading: "الذكاء الاصطناعي يحلل مشروعك...", back: "العودة للرئيسية", price: "السعر التقديري", days: "مدة التنفيذ", day: "يوم عمل", egp: "جنيه", analysis: "تحليل المشروع", complexity: "درجة التعقيد", cx: { low: "بسيط", medium: "متوسط", high: "كبير" }, contact: "اعتمد العرض وتواصل معنا", required: "من فضلك اكتب اسم المشروع وتفاصيل كافية (10 أحرف على الأقل).", fail: "تعذر تحليل المشروع الآن، حاول مرة أخرى.", credits: "خدمة التحليل غير متاحة مؤقتاً.", note: "السعر تقديري ويتم تأكيده بعد التواصل." }
    : { name: "Project name", details: "Project details", pages: type === "games" ? "Levels / screens" : "Pages / screens", audience: "Target audience", features: "Key features", platforms: type === "web" ? "Site type (company, personal, store...)" : "Platforms (Android, iOS, Web...)", submit: "Analyze & estimate price", loading: "AI is analyzing your project...", back: "Back to home", price: "Estimated price", days: "Delivery time", day: "working days", egp: "EGP", analysis: "Project analysis", complexity: "Complexity", cx: { low: "Low", medium: "Medium", high: "High" }, contact: "Accept & contact us", required: "Please enter a project name and enough details (10+ characters).", fail: "Couldn't analyze the project right now, please try again.", credits: "The analysis service is temporarily unavailable.", note: "Estimated price, confirmed after we talk." };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || form.details.trim().length < 10) return setErr(L.required);
    setLoading(true);
    setRes(null);
    try {
      const r = await estimate({
        data: { type, lang, ...form, pages: Math.max(1, Math.min(200, parseInt(form.pages) || 1)) },
      });
      if (r.ok) setRes(r);
      else setErr(r.error === "credits" ? L.credits : L.fail);
    } catch {
      setErr(L.fail);
    } finally {
      setLoading(false);
    }
  }

  const input = "w-full rounded-[12px] bg-ink/70 px-4 py-3 text-white ring-1 ring-line outline-none transition focus:ring-brand/60 placeholder:text-white/25";
  const mail = res
    ? `mailto:Info@smarttechno.app?subject=${encodeURIComponent(form.name)}&body=${encodeURIComponent(`${titles[type][lang]}\n${L.name}: ${form.name}\n${L.pages}: ${form.pages}\n${L.price}: ${res.price} ${L.egp}\n${L.days}: ${res.days} ${L.day}\n\n${form.details}`)}`
    : "";

  return (
    <div className="relative">
      <BackgroundSlideshow />
      <div className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Link to="/" className="text-sm text-white/50 transition hover:text-brand">
          {ar ? "→ " : "← "}
          {L.back}
        </Link>
        <h1 className="rise mt-6 font-display text-4xl font-black text-white sm:text-5xl">{titles[type][lang]}</h1>

        <form onSubmit={submit} className="rise rise-1 mt-10 space-y-5 rounded-[20px] bg-panel/85 p-6 ring-1 ring-line backdrop-blur sm:p-8">
          <Field label={L.name}><input className={input} maxLength={120} value={form.name} onChange={set("name")} /></Field>
          <Field label={L.details}><textarea className={`${input} min-h-32`} maxLength={4000} value={form.details} onChange={set("details")} /></Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={L.pages}><input type="number" min={1} max={200} className={input} value={form.pages} onChange={set("pages")} /></Field>
            <Field label={L.platforms}><input className={input} maxLength={200} value={form.platforms} onChange={set("platforms")} /></Field>
          </div>
          <Field label={L.audience}><input className={input} maxLength={300} value={form.audience} onChange={set("audience")} /></Field>
          <Field label={L.features}><textarea className={`${input} min-h-24`} maxLength={1500} value={form.features} onChange={set("features")} /></Field>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full rounded-full bg-brand px-8 py-4 font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-14px_rgba(16,185,129,0.85)] disabled:opacity-60">
            {loading ? <span className="animate-pulse">{L.loading}</span> : L.submit}
          </button>
        </form>

        {res && (
          <div className="rise mt-8 rounded-[20px] bg-panel/90 p-6 ring-1 ring-brand/40 backdrop-blur sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label={L.price} value={`${res.price.toLocaleString(ar ? "ar-EG" : "en-US")} ${L.egp}`} />
              <Stat label={L.days} value={`${res.days.toLocaleString(ar ? "ar-EG" : "en-US")} ${L.day}`} />
              <Stat label={L.complexity} value={L.cx[res.complexity]} />
            </div>
            <h2 className="mt-8 font-display text-xl font-bold text-white">{L.analysis}</h2>
            <p className="mt-3 leading-relaxed text-white/70">{res.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {res.breakdown.map((b, i) => (
                <li key={i} className="flex gap-2"><span className="text-brand">•</span>{b}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/40">{L.note}</p>
            <a href={mail} className="mt-5 inline-flex rounded-full bg-brand px-7 py-3 font-bold text-ink transition hover:-translate-y-0.5">{L.contact}</a>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/70">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] bg-ink/60 p-4 ring-1 ring-line">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-2 font-display text-2xl font-black text-brand">{value}</p>
    </div>
  );
}
