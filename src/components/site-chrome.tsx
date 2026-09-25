import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const { lang, t, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => data.subscription.unsubscribe();
  }, []);

  const links = [
    { href: "/#home", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#services", label: t.nav.services },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="/#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt={t.brand}
            width={1024}
            height={1024}
            className="size-11 rounded-xl object-contain ring-1 ring-brand/40"
          />
          <div className="leading-none">
            <p className="font-display text-lg font-extrabold tracking-tight text-white">
              {t.brand}
            </p>
            <p className="font-latin text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
              {t.brandLatin}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={signedIn ? "/account" : "/auth"}
            className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-ink transition hover:-translate-y-0.5"
          >
            {signedIn ? (lang === "ar" ? "حسابي" : "My account") : lang === "ar" ? "تسجيل الدخول" : "Sign in"}
          </Link>
          <div className="flex items-center rounded-full bg-panel p-1 ring-1 ring-line">
            <button
              onClick={() => setLang("ar")}
              className={
                lang === "ar"
                  ? "rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-ink"
                  : "rounded-full px-3 py-1.5 text-xs font-semibold text-white/50"
              }
            >
              ع
            </button>
            <button
              onClick={() => setLang("en")}
              className={
                lang === "en"
                  ? "rounded-full bg-brand px-3 py-1.5 font-latin text-xs font-bold text-ink"
                  : "rounded-full px-3 py-1.5 font-latin text-xs font-semibold text-white/50"
              }
            >
              EN
            </button>
          </div>

          <button
            className="grid size-9 place-items-center rounded-full bg-panel ring-1 ring-line md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg
              className="size-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line/80 bg-ink/95 px-5 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-panel hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt={t.brand}
            width={1024}
            height={1024}
            loading="lazy"
            className="size-8 rounded-lg object-contain"
          />
          <span className="font-display text-sm font-bold text-white/80">{t.brand}</span>
        </div>
        <p className="font-latin text-xs text-white/30">{t.footer.rights}</p>
        <p className="text-xs font-semibold text-white/40">{t.footer.madeIn}</p>
      </div>
    </footer>
  );
}
