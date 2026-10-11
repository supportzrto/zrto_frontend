import { brand } from "../config/theme";
import Icon from "./Icons";

const CARD_W = 340;
const GAP = 24;

// Shown ONLY in local development (npm run dev) when no real testimonials exist yet,
// so you can preview the animation. These never ship in the production build.
const DEV_DEMO = [
  { name: "Customer name", role: "Role", company: "Company", location: "City", quote: "Demo card for local preview only. Replace with a real customer quote in src/config/siteContent.js." },
  { name: "Customer name", role: "Role", company: "Company", location: "City", quote: "Demo card for local preview only. Replace with a real customer quote in src/config/siteContent.js." },
  { name: "Customer name", role: "Role", company: "Company", location: "City", quote: "Demo card for local preview only. Replace with a real customer quote in src/config/siteContent.js." },
  { name: "Customer name", role: "Role", company: "Company", location: "City", quote: "Demo card for local preview only. Replace with a real customer quote in src/config/siteContent.js." },
];

const AVATARS = [
  `linear-gradient(135deg, ${brand.primary}, ${brand.primaryDark})`,
  `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})`,
  "linear-gradient(135deg, #059669, #34d399)",
  "linear-gradient(135deg, #db2777, #f472b6)",
];

function Card({ t, i }) {
  return (
    <figure
      className="flex-shrink-0 rounded-3xl p-7 flex flex-col"
      style={{ width: CARD_W, background: "#fff", border: `2px solid ${brand.border}`, boxShadow: "0 10px 30px rgba(79,70,229,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5" style={{ color: "#f59e0b" }}>
          {[0, 1, 2, 3, 4].map((s) => <Icon key={s} name="star" size={16} />)}
        </div>
        <Icon name="quote" size={26} style={{ color: "#c7d2fe" }} />
      </div>
      <blockquote className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "#374151" }}>
        “{t.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${brand.border}` }}>
        <span className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-white flex-shrink-0" style={{ background: AVATARS[i % AVATARS.length] }}>
          {(t.name || "?")[0]}
        </span>
        <span className="min-w-0">
          <span className="block font-extrabold text-sm truncate" style={{ color: brand.ink }}>{t.name}</span>
          <span className="block text-xs truncate" style={{ color: brand.muted }}>
            {[t.role, t.company].filter(Boolean).join(", ")}
            {t.location ? ` · ${t.location}` : ""}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

// Right-to-left auto-scrolling testimonial strip. Pauses on hover; falls back to a
// swipeable row for people who prefer reduced motion.
export default function TestimonialMarquee({ items }) {
  const list = items && items.length ? items : import.meta.env.DEV ? DEV_DEMO : [];
  if (list.length === 0) return null;

  // Repeat the list until one "half" is wider than a big screen, then render two halves
  // and slide by exactly -50% for a seamless loop.
  const perItem = CARD_W + GAP;
  const reps = Math.max(1, Math.ceil(2800 / (list.length * perItem)));
  const half = Array.from({ length: reps }).flatMap(() => list);
  const track = [...half, ...half];
  const seconds = Math.max(30, (half.length * perItem) / 55); // ~55px per second

  return (
    <div
      className="zr-marquee relative"
      style={{ "--zr-dur": `${seconds}s`, WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      <style>{`
        @keyframes zr-marquee-rtl { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .zr-marquee { overflow: hidden; }
        .zr-marquee-track { display: flex; gap: ${GAP}px; width: max-content; padding: 12px 0 28px; animation: zr-marquee-rtl var(--zr-dur) linear infinite; }
        .zr-marquee:hover .zr-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .zr-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
          .zr-marquee-track { animation: none; }
        }
      `}</style>
      <div className="zr-marquee-track">
        {track.map((t, i) => (
          <div key={i} aria-hidden={i >= half.length ? "true" : undefined}>
            <Card t={t} i={i % list.length} />
          </div>
        ))}
      </div>
    </div>
  );
}