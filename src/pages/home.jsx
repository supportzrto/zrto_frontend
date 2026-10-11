import { useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/publicnavbar";
import Footer from "../components/footer";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast.jsx";
import { API_URL } from "../config/api";
import { brand } from "../config/theme";
import { TESTIMONIALS, LOGOS } from "../config/siteContent";

const faqs = [
  { q: "Is this only for COD orders?", a: "Yes. ZRTO is built specifically to cut losses from Cash on Delivery orders. It scores every COD order before dispatch, and prepaid orders are never affected." },
  { q: "Do I need a developer to set this up?", a: "No. You can upload a CSV from your dashboard with zero technical knowledge. If you want real-time scoring at checkout, our REST API needs basic developer help." },
  { q: "Will this reduce my overall orders?", a: "No. Only genuinely risky COD orders are touched. Low-risk orders go straight through, and medium-risk orders just get a quick WhatsApp confirmation." },
  { q: "Which platforms do you support?", a: "Today you can use CSV upload or our REST API with any store. Shopify and WooCommerce plugins are coming soon." },
  { q: "How does the WhatsApp verification work?", a: "Medium-risk COD orders get a WhatsApp message with Confirm and Cancel buttons. Confirmed orders are marked verified in your dashboard, cancelled ones are flagged, and a reminder is sent automatically if the customer doesn't reply." },
  { q: "Is customer data safe?", a: "We only use customer data to produce a prediction. API keys are unique per account, and your WhatsApp credentials are never shown back once saved." },
  { q: "Can I try this first?", a: "Yes. Sign up free and get 50 predictions at no cost. No credit card required." },
];

const features = [
  { icon: "🎯", title: "AI RTO risk scoring", desc: "Every COD order gets a 0–100% risk score from 15 signals: pincode history, courier performance, address quality, customer behaviour and more.", span: "md:col-span-2", tint: "#eef2ff", ring: "#c7d2fe", accent: brand.primary },
  { icon: "💬", title: "WhatsApp verification", desc: "Medium-risk orders get a one-tap Confirm / Cancel message. Results land in your dashboard automatically.", span: "", tint: "#f0fdf4", ring: "#bbf7d0", accent: "#15803d" },
  { icon: "🗺️", title: "Pincode risk intelligence", desc: "See which areas drive your returns, so you can add verification or block COD where it hurts most.", span: "", tint: "#fff7ed", ring: "#fed7aa", accent: "#c2410c" },
  { icon: "📊", title: "Savings analytics", desc: "Track verified, cancelled and no-response orders, plus the money you saved, in one dashboard.", span: "", tint: "#faf5ff", ring: "#e9d5ff", accent: brand.primaryDark },
  { icon: "⚡", title: "API + CSV, your choice", desc: "Score orders in real time through the REST API, or drop in a CSV and get a decision for every row in seconds.", span: "", tint: "#eff6ff", ring: "#bfdbfe", accent: "#1d4ed8" },
];

const outcomes = [
  { tag: "LOW RISK", title: "Allow", desc: "Safe orders ship straight away. No friction for good customers.", icon: "✅", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { tag: "MEDIUM RISK", title: "Verify on WhatsApp", desc: "Borderline orders get a quick Confirm / Cancel message before you ship.", icon: "💬", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { tag: "HIGH RISK", title: "Block or go prepaid", desc: "Very risky COD orders are stopped or pushed to prepaid before you spend on shipping.", icon: "🛡️", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
];

const steps = [
  { icon: "🔌", title: "Connect or upload", desc: "Send orders through the REST API, or upload a CSV from your dashboard.", color: brand.primary },
  { icon: "🤖", title: "AI scores every order", desc: "Each COD order gets a risk score and a clear decision in seconds.", color: brand.primaryDark },
  { icon: "💬", title: "Risky orders get verified", desc: "Medium-risk customers receive a WhatsApp confirmation, with an automatic reminder.", color: "#db2777" },
  { icon: "📦", title: "Ship with confidence", desc: "Ship verified orders only and watch your return losses fall.", color: "#059669" },
];

const waFlow = [
  { t: "Order scored", d: "Risk score marks it as a borderline COD order." },
  { t: "WhatsApp sent", d: "Customer gets a message from your own business number." },
  { t: "Customer taps a button", d: "Confirm or Cancel. Your dashboard updates instantly." },
  { t: "No reply? We follow up", d: "An automatic reminder goes out after 2 hours (configurable per brand)." },
];

const builtFor = [
  { icon: "👗", title: "D2C fashion & apparel", desc: "Impulse buying and high COD share make fashion one of the most return-heavy categories.", color: "#be185d", bg: "#fdf2f8", border: "#fbcfe8" },
  { icon: "📱", title: "Electronics & gadgets", desc: "Protect high-ticket orders from fake COD attempts and unreachable customers.", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { icon: "🏪", title: "Regional & growing brands", desc: "Whether you ship 500 or 50,000 orders a month, keep logistics cost under control.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
];

const integrations = [
  { icon: "📁", title: "CSV upload", status: "Available now", live: true, desc: "Export orders, upload, and get a decision for every row. No tech team needed." },
  { icon: "⚡", title: "REST API", status: "Available now", live: true, desc: "Score orders in real time at checkout and trigger WhatsApp verification automatically." },
  { icon: "🛍️", title: "Shopify", status: "Coming soon", live: false, desc: "Auto-sync orders, tag risky ones and manage verification inside Shopify Admin." },
  { icon: "🏬", title: "WooCommerce", status: "Coming soon", live: false, desc: "A lightweight plugin that flags risky COD orders at checkout." },
];

const stats = [
  { val: "15", label: "Risk signals per order" },
  { val: "3", label: "Clear outcomes: allow, verify, block" },
  { val: "50", label: "Free predictions to start" },
  { val: "2 hrs", label: "Automatic WhatsApp reminder" },
];

function Pill({ children, tone = "light" }) {
  const styles =
    tone === "dark"
      ? { background: "rgba(255,255,255,0.14)", color: "#e0e7ff", border: "1px solid rgba(255,255,255,0.2)" }
      : { background: brand.border, color: "#4338ca", border: "1px solid #c7d2fe" };
  return (
    <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={styles}>
      {children}
    </span>
  );
}

function SectionHead({ pill, title, sub, dark = false }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <div className="mb-5">
        <Pill tone={dark ? "dark" : "light"}>{pill}</Pill>
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4" style={{ color: dark ? "#fff" : brand.ink }}>
        {title}
      </h2>
      {sub && (
        <p className="text-base leading-relaxed" style={{ color: dark ? "#c7d2fe" : brand.muted }}>
          {sub}
        </p>
      )}
    </div>
  );
}

const emptyForm = { full_name: "", email: "", brand_name: "", phone: "", monthly_orders: "< 500 orders" };

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.brand_name.trim()) {
      toast.error("Please fill in your name, email and brand name.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/early-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 422) {
        toast.error("Please check your email address and details.");
        setStatus("idle");
        return;
      }
      if (res.status === 429) {
        toast.error("Too many attempts. Please wait a minute and try again.");
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error();
      setForm(emptyForm);
      setStatus("success");
    } catch {
      toast.error("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-orange-400/70 transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" };

  return (
    <>
      <style>{`
        @keyframes zr-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes zr-float-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes zr-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(249,115,22,0.45); } 100% { box-shadow: 0 0 0 14px rgba(249,115,22,0); } }
        @keyframes zr-fill { from { width: 0; } }
        @keyframes zr-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-20px) scale(1.08); } }
        .zr-float { animation: zr-float 6s ease-in-out infinite; }
        .zr-float-slow { animation: zr-float-slow 7s ease-in-out infinite 0.6s; }
        .zr-blob { animation: zr-blob 14s ease-in-out infinite; }
        .zr-fill { animation: zr-fill 1.6s ease-out both; }
        .zr-cta { animation: zr-pulse-ring 2.2s ease-out infinite; }
        .zr-card { transition: transform .25s ease, box-shadow .25s ease; }
        .zr-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(79,70,229,0.15); }
        @media (prefers-reduced-motion: reduce) {
          .zr-float, .zr-float-slow, .zr-blob, .zr-fill, .zr-cta { animation: none !important; }
        }
      `}</style>

      <PublicNavbar />
      <div className="font-sans" style={{ background: "#f8f9ff" }}>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-28 md:pb-36" style={{ background: brand.panelGradient }}>
          <div className="zr-blob absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
          <div className="zr-blob absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full opacity-25 pointer-events-none" style={{ background: "radial-gradient(circle, #22d3ee, transparent 65%)", animationDelay: "3s" }} />
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "26px 26px" }} />

          <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8" style={{ background: "rgba(249,115,22,0.18)", color: "#fed7aa", border: "1px solid rgba(249,115,22,0.4)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                For Indian ecommerce &amp; D2C brands
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6 text-white tracking-tight">
                Stop losing money on{" "}
                <span style={{ background: `linear-gradient(90deg, ${brand.accentLight}, #fbbf24)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  COD returns
                </span>
              </h1>
              <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "#c7d2fe" }}>
                ZRTO scores every COD order before you ship it, confirms the risky ones on WhatsApp, and blocks the rest, so you stop paying for deliveries that never complete.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/register" className="zr-cta font-extrabold px-8 py-4 rounded-xl text-base transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})`, color: "#fff", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}>
                  Start free: 50 predictions →
                </Link>
                <a href="#how-it-works" className="font-semibold px-8 py-4 rounded-xl text-base transition-colors hover:bg-white/20" style={{ color: "#fff", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  See how it works
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "#c7d2fe" }}>
                {["No credit card", "CSV or API", "WhatsApp verification built in"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <span style={{ color: "#4ade80" }}>✓</span> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Product mockup */}
            <div className="relative max-w-md w-full mx-auto lg:ml-auto mb-24 lg:mb-0">
              <div className="zr-float rounded-3xl p-5 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.22)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#c7d2fe" }}>Sample data · illustration</span>
                </div>
                {[
                  { id: "#10248", score: 12, label: "Allow", color: "#4ade80", bg: "rgba(34,197,94,0.14)", bd: "rgba(34,197,94,0.3)" },
                  { id: "#10249", score: 61, label: "Verify on WhatsApp", color: "#fbbf24", bg: "rgba(245,158,11,0.14)", bd: "rgba(245,158,11,0.3)" },
                  { id: "#10250", score: 92, label: "Block / prepaid", color: "#f87171", bg: "rgba(239,68,68,0.14)", bd: "rgba(239,68,68,0.3)" },
                ].map((o) => (
                  <div key={o.id} className="rounded-xl p-3.5 mb-2.5" style={{ background: o.bg, border: `1px solid ${o.bd}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">Order {o.id}</span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: o.color }}>{o.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.14)" }}>
                        <div className="zr-fill h-full rounded-full" style={{ width: `${o.score}%`, background: o.color }} />
                      </div>
                      <span className="text-xs font-extrabold w-16 text-right" style={{ color: o.color }}>{o.score}% risk</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="zr-float-slow absolute -bottom-28 -left-2 sm:-left-12 w-64 rounded-2xl p-4 shadow-2xl" style={{ background: "#fff" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "#dcfce7" }}>💬</span>
                  <span className="text-xs font-bold" style={{ color: brand.ink }}>WhatsApp · Your Brand</span>
                </div>
                <div className="rounded-xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed mb-2" style={{ background: "#ecfdf5", color: "#065f46" }}>
                  Hi Asha, please confirm your COD order #10249 (₹2,499).
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 text-center text-[11px] font-bold py-1.5 rounded-lg" style={{ background: "#dcfce7", color: "#15803d" }}>✓ Confirm</span>
                  <span className="flex-1 text-center text-[11px] font-bold py-1.5 rounded-lg" style={{ background: "#fee2e2", color: "#b91c1c" }}>✕ Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FACT STRIP ── */}
        <section className="px-6 -mt-12 relative z-20">
          <Reveal className="max-w-5xl mx-auto rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 p-7 shadow-xl" style={{ background: "#fff", border: `1px solid ${brand.border}` }}>
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold" style={{ color: brand.primary }}>{s.val}</div>
                <div className="text-xs mt-1 leading-snug" style={{ color: brand.muted }}>{s.label}</div>
              </div>
            ))}
          </Reveal>
        </section>

        {LOGOS.length > 0 && (
          <section className="px-6 pt-16">
            <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#6366f1" }}>Trusted by</p>
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {LOGOS.map((l) => (
                <span key={l} className="font-extrabold tracking-widest text-sm" style={{ color: brand.faint }}>{l}</span>
              ))}
            </div>
          </section>
        )}

        {/* ── PROBLEM ── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="mb-6"><Pill>The problem</Pill></div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5" style={{ color: brand.ink }}>
                RTO is silently killing your profit
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "#4b5563" }}>
                Cash on Delivery dominates Indian ecommerce, but it comes at a price: fake orders, unreachable customers and shipments that come straight back.
              </p>
              <ul className="space-y-4">
                {[
                  "Fake orders and incomplete addresses waste every shipment",
                  "Each failed delivery costs shipping, packaging and time",
                  "Calling every customer by hand is slow and doesn't scale",
                  "You find out a COD order was bad only after you've paid to ship it",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "#fee2e2", color: "#dc2626" }}>✕</span>
                    <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-3xl p-8 md:p-10 text-white shadow-2xl" style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
                <div className="text-5xl font-extrabold mb-1">30–40%</div>
                <div className="font-bold mb-1" style={{ color: "#fdba74" }}>Typical COD return rate</div>
                <div className="text-sm mb-8" style={{ color: "#a5b4fc" }}>in fashion and impulse categories (industry estimate)</div>
                {[
                  { label: "Outbound shipping", value: "₹80 – ₹120" },
                  { label: "Return shipping", value: "₹100+" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="text-sm" style={{ color: "#a5b4fc" }}>{r.label}</span>
                    <span className="font-bold text-sm">{r.value}</span>
                  </div>
                ))}
                <div className="rounded-xl p-4 mt-6 text-center font-bold" style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}>
                  Roughly ₹200+ lost on every returned order
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── THREE OUTCOMES ── */}
        <section className="py-24 px-6" style={{ background: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead pill="Decision engine" title="Every COD order gets one of three clear outcomes" sub="No guesswork. ZRTO tells you what to do with each order, before you spend on shipping." />
            <div className="grid md:grid-cols-3 gap-6">
              {outcomes.map((o, i) => (
                <Reveal key={o.title} delay={i * 110}>
                  <div className="zr-card h-full rounded-3xl p-8" style={{ background: o.bg, border: `2px solid ${o.border}` }}>
                    <div className="flex items-center justify-between mb-6">
                      <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-sm">{o.icon}</span>
                      <span className="text-[11px] font-extrabold tracking-widest px-3 py-1 rounded-full bg-white" style={{ color: o.color }}>{o.tag}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold mb-2" style={{ color: o.color }}>{o.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{o.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES (BENTO) ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHead pill="What you get" title="Everything you need to protect COD revenue" sub="From the first score to the final delivery, in one dashboard." />
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 3) * 90} className={f.span}>
                  <div className="zr-card h-full rounded-3xl p-7" style={{ background: f.tint, border: `2px solid ${f.ring}` }}>
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl mb-5 shadow-sm">{f.icon}</div>
                    <h3 className="font-extrabold text-lg mb-2" style={{ color: f.accent }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHATSAPP FLOW ── */}
        <section className="py-24 px-6 relative overflow-hidden" style={{ background: brand.panelGradient }}>
          <div className="absolute -top-20 right-0 w-[380px] h-[380px] rounded-full opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="mb-6"><Pill tone="dark">WhatsApp COD verification</Pill></div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white mb-5">
                Let your customers confirm their own orders
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "#c7d2fe" }}>
                Messages go out from your own WhatsApp Business number. The customer taps one button, and your dashboard updates on its own. No calling, no chasing.
              </p>
              <Link to="/register" className="inline-block font-extrabold px-7 py-3.5 rounded-xl text-sm transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})`, color: "#fff", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}>
                Try it free →
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <ol className="space-y-4">
                {waFlow.map((s, i) => (
                  <li key={s.t} className="flex gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})` }}>{i + 1}</span>
                    <div>
                      <div className="font-bold text-white mb-0.5">{s.t}</div>
                      <div className="text-sm leading-relaxed" style={{ color: "#c7d2fe" }}>{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6" id="how-it-works" style={{ background: "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead pill="Simple process" title="How it works" sub="From upload to a safer shipment in four steps." />
            <div className="relative grid md:grid-cols-4 gap-8">
              <div className="absolute top-10 left-[12%] right-[12%] h-0.5 hidden md:block" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 110} className="text-center relative">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg bg-white" style={{ border: `3px solid ${s.color}` }}>{s.icon}</div>
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow" style={{ background: s.color }}>{i + 1}</span>
                  </div>
                  <h3 className="font-extrabold mb-2" style={{ color: s.color }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── BUILT FOR ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHead pill="Who it's for" title="Built for modern Indian ecommerce teams" />
            <div className="grid md:grid-cols-3 gap-6">
              {builtFor.map((b, i) => (
                <Reveal key={b.title} delay={i * 100}>
                  <div className="zr-card h-full rounded-3xl p-8" style={{ background: b.bg, border: `2px solid ${b.border}` }}>
                    <div className="text-4xl mb-4">{b.icon}</div>
                    <h3 className="font-extrabold text-lg mb-2" style={{ color: b.color }}>{b.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS (only when real ones are added in config/siteContent.js) ── */}
        {TESTIMONIALS.length > 0 && (
          <section className="py-24 px-6" style={{ background: "#fff" }}>
            <div className="max-w-6xl mx-auto">
              <SectionHead pill="Customer stories" title="What our customers say" />
              <div className="grid md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <Reveal key={t.name} delay={i * 90}>
                    <figure className="zr-card h-full rounded-3xl p-7" style={{ background: brand.surface, border: `2px solid ${brand.border}` }}>
                      <blockquote className="text-sm leading-relaxed mb-5" style={{ color: "#374151" }}>“{t.quote}”</blockquote>
                      <figcaption className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${brand.border}` }}>
                        <span className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white" style={{ background: brand.gradient }}>{t.name[0]}</span>
                        <span>
                          <span className="block font-extrabold text-sm" style={{ color: brand.ink }}>{t.name}</span>
                          <span className="block text-xs" style={{ color: brand.muted }}>{[t.role, t.company, t.location].filter(Boolean).join(" · ")}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── INTEGRATIONS ── */}
        <section className="py-24 px-6" style={{ background: TESTIMONIALS.length > 0 ? "#f8f9ff" : "#fff" }}>
          <div className="max-w-6xl mx-auto">
            <SectionHead pill="Integrations" title="Plug in with the stack you already have" sub="Start today with CSV or API. Store plugins are on the way." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {integrations.map((it, i) => (
                <Reveal key={it.title} delay={i * 90}>
                  <div className="zr-card h-full rounded-3xl p-6 relative" style={{ background: it.live ? "#fff" : brand.surface, border: `2px solid ${it.live ? "#86efac" : brand.border}` }}>
                    <span className="absolute top-4 right-4 text-[10px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-wide" style={{ background: it.live ? "#dcfce7" : "#e0e7ff", color: it.live ? "#15803d" : "#4338ca" }}>{it.status}</span>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: it.live ? "#f0fdf4" : "#fff" }}>{it.icon}</div>
                    <h3 className="font-extrabold mb-2" style={{ color: brand.ink }}>{it.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHead pill="FAQ" title="Questions, answered" sub="Everything you need to know about ZRTO." />
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="rounded-2xl overflow-hidden transition-shadow" style={{ background: "#fff", border: `2px solid ${open ? "#a5b4fc" : brand.border}`, boxShadow: open ? "0 10px 30px rgba(79,70,229,0.1)" : "none" }}>
                    <button
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                    >
                      <span className="font-bold" style={{ color: brand.ink }}>{f.q}</span>
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 transition-transform" style={{ background: brand.border, color: brand.primary, transform: open ? "rotate(45deg)" : "none" }}>+</span>
                    </button>
                    {open && (
                      <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#4b5563" }}>{f.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── EARLY ACCESS ── */}
        <section id="early-access" className="py-24 px-6 relative overflow-hidden" style={{ background: brand.gradient }}>
          <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full opacity-25 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
          <div className="relative max-w-5xl mx-auto rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-12 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.22)" }}>
            <div>
              <div className="mb-5"><Pill tone="dark">Early access</Pill></div>
              <h2 className="text-3xl font-extrabold leading-tight text-white mb-4">Join the early access program</h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#c7d2fe" }}>
                Get priority onboarding, hands-on setup help and discounted pricing for life while we're in early access.
              </p>
              <ul className="space-y-4">
                {["Tell us about your store.", "We review and approve your slot.", "We reach out within 24–48 hours with onboarding steps."].map((t, i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 text-white" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})` }}>{i + 1}</span>
                    <span className="text-sm leading-relaxed pt-0.5" style={{ color: "#e0e7ff" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-extrabold text-white mb-2">Application received!</h3>
                <p className="text-sm mb-6" style={{ color: "#c7d2fe" }}>We'll be in touch within 24–48 hours.</p>
                <button onClick={() => setStatus("idle")} className="text-sm font-bold underline" style={{ color: "#fed7aa" }}>Submit another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                {[
                  { label: "Full name", key: "full_name", type: "text", ph: "John Doe", ac: "name" },
                  { label: "Work email", key: "email", type: "email", ph: "john@brand.com", ac: "email" },
                  { label: "Brand name", key: "brand_name", type: "text", ph: "My Awesome Store", ac: "organization" },
                  { label: "Phone (optional)", key: "phone", type: "tel", ph: "9876543210", ac: "tel" },
                ].map((f) => (
                  <div key={f.key}>
                    <label htmlFor={`ea-${f.key}`} className="text-xs font-bold mb-1.5 block uppercase tracking-wide" style={{ color: "#c7d2fe" }}>{f.label}</label>
                    <input id={`ea-${f.key}`} type={f.type} placeholder={f.ph} autoComplete={f.ac} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inputCls} style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label htmlFor="ea-orders" className="text-xs font-bold mb-1.5 block uppercase tracking-wide" style={{ color: "#c7d2fe" }}>Monthly order volume</label>
                  <select id="ea-orders" value={form.monthly_orders} onChange={(e) => setForm({ ...form, monthly_orders: e.target.value })} className={inputCls} style={{ ...inputStyle, color: "#e0e7ff" }}>
                    {["< 500 orders", "500 – 2,000 orders", "2,000 – 10,000 orders", "10,000+ orders"].map((o) => (
                      <option key={o} style={{ background: "#312e81" }}>{o}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={status === "loading"} className="w-full font-extrabold py-4 rounded-xl text-sm transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})`, color: "#fff", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}>
                  {status === "loading" ? "Submitting..." : "Apply for early access →"}
                </button>
              </form>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}