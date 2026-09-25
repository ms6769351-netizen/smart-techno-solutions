import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | Smart Techno" },
      { name: "description", content: "سجّل دخولك أو أنشئ حساب عميل جديد في سمارت تكنو." },
      { property: "og:title", content: "تسجيل الدخول | Smart Techno" },
      { property: "og:description", content: "حساب العميل في سمارت تكنو." },
    ],
  }),
  component: AuthPage,
});

const T = {
  ar: {
    login: "تسجيل الدخول", signup: "حساب جديد", name: "الاسم بالكامل", phone: "رقم الهاتف",
    email: "البريد الإلكتروني", password: "كلمة المرور", company: "الشركة (اختياري)", city: "المدينة (اختياري)",
    submitLogin: "دخول", submitSignup: "إنشاء الحساب", checkEmail: "تم إنشاء الحساب! افحص بريدك لتأكيد الحساب ثم سجّل الدخول.",
    welcome: "مرحباً بك", logout: "تسجيل الخروج", subtitle: "أدخل بياناتك للمتابعة",
  },
  en: {
    login: "Sign in", signup: "Create account", name: "Full name", phone: "Phone number",
    email: "Email", password: "Password", company: "Company (optional)", city: "City (optional)",
    submitLogin: "Sign in", submitSignup: "Create account", checkEmail: "Account created! Check your email to confirm, then sign in.",
    welcome: "Welcome", logout: "Sign out", subtitle: "Enter your details to continue",
  },
};

const signupSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^\+?[0-9 ]{7,20}$/),
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  company: z.string().trim().max(120),
  city: z.string().trim().max(80),
});

function AuthPage() {
  const { lang } = useLanguage();
  const s = T[lang];
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", password: "", company: "", city: "" });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/account" });
    });
  }, [navigate]);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const p = signupSchema.safeParse(form);
        if (!p.success) {
          setMsg({ ok: false, text: lang === "ar" ? "تأكد من صحة البيانات (الاسم، الهاتف، البريد، كلمة مرور 6 أحرف على الأقل)." : "Please check your details (name, phone, email, password 6+ chars)." });
          return;
        }
        const { email, password, ...meta } = p.data;
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/account", data: meta },
        });
        if (error) setMsg({ ok: false, text: error.message });
        else { setMsg({ ok: true, text: s.checkEmail }); setMode("login"); }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
        if (error) setMsg({ ok: false, text: lang === "ar" ? "البريد أو كلمة المرور غير صحيحة." : error.message });
        else navigate({ to: "/account" });
      }
    } finally {
      setBusy(false);
    }
  }

  const input = "w-full rounded-xl bg-ink/60 px-4 py-3 text-sm text-white ring-1 ring-line outline-none transition focus:ring-brand/60";

  return (
    <main className="relative mx-auto flex min-h-[80vh] max-w-md items-center px-5 py-16">
      <div className="w-full rounded-[24px] bg-panel/85 p-8 ring-1 ring-line backdrop-blur">
        <div className="mb-6 flex rounded-full bg-ink/60 p-1 ring-1 ring-line">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setMsg(null); }}
              className={`flex-1 rounded-full py-2 text-sm font-bold transition ${mode === m ? "bg-brand text-ink" : "text-white/50"}`}
            >
              {m === "login" ? s.login : s.signup}
            </button>
          ))}
        </div>
        <p className="mb-6 text-center text-sm text-white/50">{s.subtitle}</p>
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <>
              <input className={input} placeholder={s.name} value={form.full_name} onChange={set("full_name")} required maxLength={100} />
              <input className={input} placeholder={s.phone} value={form.phone} onChange={set("phone")} required type="tel" maxLength={20} />
            </>
          )}
          <input className={input} placeholder={s.email} value={form.email} onChange={set("email")} required type="email" maxLength={255} />
          <input className={input} placeholder={s.password} value={form.password} onChange={set("password")} required type="password" minLength={6} maxLength={72} />
          {mode === "signup" && (
            <>
              <input className={input} placeholder={s.company} value={form.company} onChange={set("company")} maxLength={120} />
              <input className={input} placeholder={s.city} value={form.city} onChange={set("city")} maxLength={80} />
            </>
          )}
          {msg && (
            <p className={`rounded-xl px-4 py-3 text-sm ${msg.ok ? "bg-brand/10 text-brand" : "bg-destructive/15 text-destructive"}`}>{msg.text}</p>
          )}
          <button disabled={busy} className="w-full rounded-full bg-brand py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 disabled:opacity-50">
            {mode === "login" ? s.submitLogin : s.submitSignup}
          </button>
        </form>
      </div>
    </main>
  );
}
