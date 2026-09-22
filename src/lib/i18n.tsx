import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

const ar = {
  brand: "سمارت تكنو",
  brandLatin: "Smart Techno",
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    services: "مجالات عملنا",
    contact: "تواصل",
  },
  hero: {
    kicker: "Digital Instrument",
    titleA: "تحويل الأفكار",
    titleB: "إلى حلول برمجية",
    paragraph:
      "ابتكار رقمي بهدف حقيقي؛ نقدم في سمارت تكنو حلولاً برمجية وتطبيقات تفاعلية صُممت خصيصاً لتلائم المستخدم. من الألعاب التي تعكس هويتنا، إلى الأدوات المالية والصحية التي تنظم حياتك، نضمن لك أداءً سريعاً وواجهات خالية من التعقيد تناسب جميع الفئات.",
    ctaPrimary: "هيا نعمل معاً",
    ctaSecondary: "استكشف مجالات عملنا",
  },
  home: {
    servicesKicker: "Services",
    servicesTitle: "مجالات عملنا",
    servicesMeta: "04 — Offerings",
    contactKicker: "Contact",
    contactTitle: "هيا نعمل معاً",
    contactParagraph: "أخبرنا عن فكرتك وسنحوّلها معاً إلى منتج رقمي حقيقي يؤتي ثماره.",
  },
  about: {
    kicker: "About",
    title: "من نحن",
    p1: "شركة برمجية مصرية متخصصة في تصميم وتطوير تطبيقات الموبايل والحلول الرقمية التي تمس الواقع اليومي للمستخدم. نؤمن بأن التكنولوجيا الحقيقية هي التي تُصنع لفهم الشارع واحتياجات الأفراد، لذا نركز على تقديم منتجات برمجية تجمع بين البساطة، التفاعلية، والفاعلية المباشرة.",
    p2: "تتنوع مجالات عملنا لتغطي أبعاداً مختلفة من حياة المستخدم اليومية؛ فنحن نبتكر حلولاً تفاعلية تعكس هوية الشارع المصري بأسلوب ممتع وقريب للجمهور، ونطور أدوات مالية وحسابية ذكية تساعد الأفراد على متابعة حركة الأسواق (مثل الذهب) لاتخاذ قرارات واعية، بالإضافة إلى تقديم تطبيقات مخصصة لصحة ونمط الحياة تهدف إلى تنظيم اليوم، تقليل التوتر، وتعزيز الهدوء النفسي.",
    values: [
      { title: "البساطة", desc: "واجهات خالية من التعقيد تناسب جميع الفئات" },
      { title: "التفاعلية", desc: "منتجات حية تعكس هوية المستخدم وثقافته" },
      { title: "الفاعلية", desc: "أداء سريع ونتائج مباشرة تلمس الواقع اليومي" },
    ],
  },
  services: {
    kicker: "Services",
    title: "مجالات عملنا",
    meta: "02 — Divisions",
    intro:
      "نغطي أبعاداً مختلفة من الحياة الرقمية — من التطبيقات إلى الألعاب التعليمية، بخبرة مصرية ورؤية عالمية.",
    programs: {
      title: "برامجنا",
      subtitle: "تطبيقات من صنعنا، جاهزة للاستخدام الآن.",
      visit: "جرّب البرنامج",
      scan: "امسح الرمز للتحميل",
      comingSoon: "قريباً",
      comingSoonDesc: "نجهّز مكان البرنامج — الرابط والصورة ورمز QR سيُضافون قريباً.",
      hadana: {
        name: "هدنة",
        desc: "برنامج يساعد المستخدم على الاسترخاء وتنظيم التنفس وتقليل التوتر وتقليل أي طاقة سلبية ويساعده على الهدوء.",
        url: "https://sokoon-wellness-app--ugareetjo.replit.app/",
      },
      masar: {
        name: "مسار",
      },
    },
    offerings: {
      title: "ما نقدمه لعملائنا",
      subtitle: "خدماتنا الأساسية لتحويل فكرتك إلى منتج حقيقي.",
      items: [
        {
          num: "01",
          tag: "Flutter · Dart · React Native",
          title: "تطبيقات الموبايل",
          desc: "إنشاء برامج للموبايل بتصميمات مذهلة وبلغات Flutter وDart وReact Native لتحويل الأفكار إلى برامج واقعية.",
        },
        {
          num: "02",
          tag: "HTML · CSS · JS · Tailwind · React",
          title: "مواقع الويب",
          desc: "تصميم مواقع ويب تتميز بالسهولة والمرونة باستخدام أفضل التقنيات — نساعدك في إنشاء موقع شركتك وموقعك الشخصي.",
        },
        {
          num: "03",
          tag: "Games",
          title: "الألعاب التفاعلية والتعليمية",
          desc: "إنشاء الألعاب التفاعلية والألعاب التعليمية بأسلوب ممتع وقريب للجمهور.",
        },
      ],
    },
  },
  contact: {
    kicker: "Contact",
    title: "هيا نعمل معاً",
    paragraph: "أخبرنا عن فكرتك وسنحوّلها معاً إلى منتج رقمي حقيقي يؤتي ثماره.",
    emailLabel: "راسلنا عبر البريد",
    responseNote: "نرد عادة خلال ٢٤ ساعة",
  },
  footer: {
    rights: "© 2026 Smart Techno — Cairo, Egypt",
    madeIn: "صُنع بفخر في مصر",
  },
};

const en: typeof ar = {
  brand: "Smart Techno",
  brandLatin: "سمارت تكنو",
  nav: {
    home: "Home",
    about: "About Us",
    services: "What We Do",
    contact: "Contact",
  },
  hero: {
    kicker: "Digital Instrument",
    titleA: "Turning Ideas",
    titleB: "Into Software Solutions",
    paragraph:
      "Digital innovation with a real purpose. At Smart Techno, we build software solutions and interactive apps designed specifically for the user — from games that reflect our identity, to financial and health tools that organize your life. We guarantee fast performance and clutter-free interfaces for everyone.",
    ctaPrimary: "Let's Work Together",
    ctaSecondary: "Explore What We Do",
  },
  home: {
    servicesKicker: "Services",
    servicesTitle: "What We Do",
    servicesMeta: "04 — Offerings",
    contactKicker: "Contact",
    contactTitle: "Let's Work Together",
    contactParagraph:
      "Tell us your idea and together we'll turn it into a real digital product that delivers results.",
  },
  about: {
    kicker: "About",
    title: "About Us",
    p1: "An Egyptian software company specialized in designing and developing mobile applications and digital solutions that touch the user's everyday reality. We believe real technology is made to understand the street and people's needs, so we focus on products that combine simplicity, interactivity, and direct effectiveness.",
    p2: "Our fields of work cover different dimensions of the user's daily life: we create interactive experiences that reflect Egyptian street identity in a fun, relatable style; we develop smart financial and calculation tools that help individuals track market movements (such as gold) to make informed decisions; and we build dedicated health and lifestyle apps that organize the day, reduce stress, and promote peace of mind.",
    values: [
      { title: "Simplicity", desc: "Clutter-free interfaces for all audiences" },
      { title: "Interactivity", desc: "Living products that reflect user identity" },
      { title: "Effectiveness", desc: "Fast performance and direct, real-world results" },
    ],
  },
  services: {
    kicker: "Services",
    title: "What We Do",
    meta: "02 — Divisions",
    intro:
      "We cover different dimensions of digital life — from apps to educational games — with Egyptian expertise and a global vision.",
    programs: {
      title: "Our Programs",
      subtitle: "Apps we built ourselves, ready to use now.",
      visit: "Try the App",
      scan: "Scan to download",
      comingSoon: "Coming Soon",
      comingSoonDesc: "We're preparing this program's spot — the link, image, and QR code will be added soon.",
      hadana: {
        name: "Hadana",
        desc: "An app that helps the user relax, organize breathing, reduce stress and negative energy, and find calm.",
        url: "https://sokoon-wellness-app--ugareetjo.replit.app/",
      },
      masar: {
        name: "Masar",
      },
    },
    offerings: {
      title: "What We Offer Our Clients",
      subtitle: "Our core services to turn your idea into a real product.",
      items: [
        {
          num: "01",
          tag: "Flutter · Dart · React Native",
          title: "Mobile Applications",
          desc: "Building mobile apps with stunning designs in Flutter, Dart, and React Native — turning ideas into real software.",
        },
        {
          num: "02",
          tag: "HTML · CSS · JS · Tailwind · React",
          title: "Websites",
          desc: "Website design that is simple and flexible using the best technologies — we help you build your company site and personal site.",
        },
        {
          num: "03",
          tag: "Games",
          title: "Interactive & Educational Games",
          desc: "Creating interactive games and educational games in a fun, relatable style.",
        },
      ],
    },
  },
  contact: {
    kicker: "Contact",
    title: "Let's Work Together",
    paragraph:
      "Tell us your idea and together we'll turn it into a real digital product that delivers results.",
    emailLabel: "Email us",
    responseNote: "We usually reply within 24 hours",
  },
  footer: {
    rights: "© 2026 Smart Techno — Cairo, Egypt",
    madeIn: "Proudly made in Egypt",
  },
};

export const translations = { ar, en };
export type Translation = typeof ar;

interface LangContextValue {
  lang: Lang;
  t: Translation;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "ar",
  t: ar,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("smart-techno-lang");
    if (stored === "en" || stored === "ar") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("smart-techno-lang", lang);
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LangContext);
}
