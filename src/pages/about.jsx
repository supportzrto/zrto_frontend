import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Reveal from "../components/Reveal";
import { brand } from "../config/theme";

const principles = [
  { icon: "📐", title: "Data over gut feeling", desc: "Every decision comes from a risk score built on 15 order signals, not a hunch or a phone call.", tint: "#eef2ff", ring: "#c7d2fe", color: brand.primary },
  { icon: "🇮🇳", title: "Built for India", desc: "Pincode-level risk, COD behaviour and WhatsApp-first confirmation, because that is how Indian ecommerce actually works.", tint: "#fff7ed", ring: "#fed7aa", color: "#c2410c" },
  { icon: "🔒", title: "Privacy by default", desc: "Customer data is used to produce a prediction. Credentials are write-only and API keys are unique to each account.", tint: "#f0fdf4", ring: "#bbf7d0", color: "#15803d" },
  { icon: "🤝", title: "Customers stay in control", desc: "Instead of silently cancelling, medium-risk customers get a chance to confirm their own order.", tint: "#faf5ff", ring: "#e9d5ff", color: brand.primaryDark },
];

const decisions = [
  { tag: "Low risk", title: "Allow", desc: "Ships immediately.", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { tag: "Medium risk", title: "Verify", desc: "WhatsApp Confirm / Cancel before dispatch.", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { tag: "High risk", title: "Block or prepaid", desc: "Stopped before you pay for shipping.", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
];

const facts = [
  { val: "15", label: "Risk signals analysed per order" },
  { val: "3", label: "Outcomes: allow, verify, block" },
  { val: "50", label: "Free predictions to start" },
  { val: "24/7", label: "Automatic scoring and reminders" },
];

function Picture({ name, alt }) {
  return (
    <picture>
      <source srcSet={`/${name}.webp`} type="image/webp" />
      <img src={`/${name}.png`} alt={alt} loading="lazy" width="1200" height="934" className="w-full h-auto rounded-3xl" />
    </picture>
  );
}

export default function About() {
  return (
    <PublicLayout>
      <div className="font-sans" style={{ background: "#f8f9ff" }}>
        {/* HERO */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32 text-center" style={{ background: brand.panelGradient }}>
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          <div className="relative max-w-3xl mx-auto">
            <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.14)", color: "#e0e7ff", border: "1px solid rgba(255,255,255,0.2)" }}>About ZRTO</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6">
              We help Indian brands{" "}
              <span style={{ background: `linear-gradient(90deg, ${brand.accentLight}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                stop shipping losses
              </span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#c7d2fe" }}>
              ZRTO predicts which Cash on Delivery orders are likely to come back, before you ship them, so you spend on deliveries that complete.
            </p>
          </div>
        </section>

        {/* WHY WE BUILT THIS */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <Reveal>
              <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: brand.border, color: "#4338ca" }}>Our story</span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5" style={{ color: brand.ink }}>Why we built this</h2>
              <p className="leading-relaxed mb-4" style={{ color: "#4b5563" }}>
                D2C brands in India often lose a large share of their COD orders to fake or unverified customers. Each one costs outbound shipping, return shipping, packaging and time.
              </p>
              <p className="leading-relaxed" style={{ color: "#4b5563" }}>
                The usual fixes, calling every customer or chasing confirmations by hand, are slow, inconsistent and still miss risky orders. We wanted something that works automatically, at any order volume.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-3xl p-2 shadow-2xl" style={{ background: "#fff", border: `1px solid ${brand.border}` }}>
                <Picture name="ai_image" alt="ZRTO AI engine analysing customer behaviour, order patterns and pincode risk" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* HOW WE SOLVE IT */}
        <section className="px-6 py-24" style={{ background: "#fff" }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <Reveal className="order-2 md:order-1" delay={120}>
              <div className="rounded-3xl p-2 shadow-2xl" style={{ background: "#fff", border: `1px solid ${brand.border}` }}>
                <Picture name="ai_image2" alt="Illustration of the ZRTO dashboard (sample data)" />
              </div>
            </Reveal>
            <Reveal className="order-1 md:order-2">
              <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: brand.border, color: "#4338ca" }}>Our approach</span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5" style={{ color: brand.ink }}>How we solve it</h2>
              <p className="leading-relaxed mb-6" style={{ color: "#4b5563" }}>
                ZRTO uses machine learning to look at customer behaviour, pincode risk and order patterns. Instead of guessing, you get a clear risk score and a decision for every order.
              </p>
              <div className="space-y-3">
                {decisions.map((d) => (
                  <div key={d.title} className="flex items-center gap-4 rounded-2xl px-5 py-4" style={{ background: d.bg, border: `2px solid ${d.border}` }}>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white whitespace-nowrap" style={{ color: d.color }}>{d.tag}</span>
                    <div>
                      <span className="font-extrabold" style={{ color: d.color }}>{d.title}</span>
                      <span className="text-sm" style={{ color: "#4b5563" }}> · {d.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: brand.border, color: "#4338ca" }}>What we believe</span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: brand.ink }}>The principles behind the product</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={(i % 2) * 100}>
                  <div className="h-full rounded-3xl p-7 flex gap-5 transition-transform hover:-translate-y-1" style={{ background: p.tint, border: `2px solid ${p.ring}` }}>
                    <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">{p.icon}</span>
                    <div>
                      <h3 className="font-extrabold text-lg mb-1.5" style={{ color: p.color }}>{p.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section className="px-6 py-20" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: ["#fb923c", "#34d399", "#a78bfa", "#60a5fa"][i] }}>{f.val}</div>
                <div className="text-sm" style={{ color: "#a5b4fc" }}>{f.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <Reveal className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden" style={{ background: brand.gradient }}>
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full opacity-25 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Stop guessing. Start predicting.</h2>
              <p className="mb-8" style={{ color: "#e0e7ff" }}>Try ZRTO free. No credit card required.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="font-extrabold px-8 py-4 rounded-xl text-white transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})`, boxShadow: "0 8px 24px rgba(249,115,22,0.45)" }}>
                  Start free: 50 predictions →
                </Link>
                <Link to="/contact" className="font-bold px-8 py-4 rounded-xl text-white transition-colors hover:bg-white/20" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.35)" }}>
                  Talk to us
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </PublicLayout>
  );
}