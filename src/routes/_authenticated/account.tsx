import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "حسابي | Smart Techno" },
      { name: "description", content: "بيانات حساب العميل في سمارت تكنو." },
      { property: "og:title", content: "حسابي | Smart Techno" },
      { property: "og:description", content: "بيانات حساب العميل." },
    ],
  }),
  component: AccountPage,
});

type Profile = { full_name: string | null; phone: string | null; email: string | null; company: string | null; city: string | null };

function AccountPage() {
  const { lang } = useLanguage();
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const [p, setP] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.from("profiles").select("full_name, phone, email, company, city").eq("id", user.id).maybeSingle()
      .then(({ data }) => setP(data));
  }, [user.id]);

  const L = lang === "ar"
    ? { title: "حسابي", name: "الاسم", phone: "الهاتف", email: "البريد", company: "الشركة", city: "المدينة", out: "تسجيل الخروج" }
    : { title: "My account", name: "Name", phone: "Phone", email: "Email", company: "Company", city: "City", out: "Sign out" };

  const rows: [string, string | null | undefined][] = [
    [L.name, p?.full_name], [L.phone, p?.phone], [L.email, p?.email ?? user.email], [L.company, p?.company], [L.city, p?.city],
  ];

  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <div className="rounded-[24px] bg-panel/85 p-8 ring-1 ring-line backdrop-blur">
        <h1 className="font-display text-3xl font-bold text-white">{L.title}</h1>
        <dl className="mt-6 space-y-3">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line pb-3 text-sm">
              <dt className="text-white/50">{k}</dt>
              <dd className="font-semibold text-white">{v || "—"}</dd>
            </div>
          ))}
        </dl>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth", replace: true }); }}
          className="mt-8 w-full rounded-full py-3 text-sm font-bold text-white/70 ring-1 ring-line transition hover:text-white hover:ring-brand/50"
        >
          {L.out}
        </button>
      </div>
    </main>
  );
}
