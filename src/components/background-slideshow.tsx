import { useEffect, useState } from "react";
import bg1 from "@/assets/bg-1.png";
import bg2 from "@/assets/bg-2.png";
import bg3 from "@/assets/bg-3.png";
import bg4 from "@/assets/bg-4.png";

const images = [bg1, bg2, bg3, bg4];

export function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-[1400ms] ease-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 0.28 : 0,
            transform: i === index ? "scale(1.06)" : "scale(1)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-ink/75" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(16,185,129,0.16), transparent 70%), linear-gradient(to bottom, rgba(10,14,17,0.55), rgba(10,14,17,0.92))",
        }}
      />
    </div>
  );
}
