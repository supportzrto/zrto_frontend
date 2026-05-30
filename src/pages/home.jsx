import { useState } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/publicnavbar";
import Footer from "../components/footer";

const faqs = [
  { q: "Is this only for COD orders?", a: "Yes, RTO Shield AI is specifically designed to reduce losses from Cash on Delivery orders. It scores every COD order before dispatch." },
  { q: "Do I need a developer to set this up?", a: "No! You can upload a CSV directly from your dashboard with zero technical knowledge. For API integration, basic developer help is needed." },
  { q: "Will this reduce my overall orders?", a: "No. It only filters genuinely risky COD orders. Safe and prepaid orders are never affected." },
  { q: "Which platforms do you support?", a: "We support Shopify, WooCommerce, and any custom store via our REST API or CSV upload." },
  { q: "Is customer data safe?", a: "Absolutely. We never store raw customer data beyond prediction processing. All API keys are encrypted per account." },
  { q: "Can I try this as a pilot?", a: "Yes! Sign up for free and get 50 predictions at no cost. No credit card required." },
];

const reviews = [
  { name: "Rahul Sharma", role: "Founder, VogueStyle", avatar: "R", color: "#f97316", review: "RTO Shield AI reduced our COD returns by 68% in just 3 weeks. The AI predictions are incredibly accurate. We saved over ₹1.2L last month alone!", rating: 5, location: "Mumbai" },
  { name: "Priya Mehta", role: "Operations Head, TechGear", avatar: "P", color: "#4f46e5", review: "The CSV upload feature is a game changer. No coding needed — just upload and get results in seconds. Our logistics team loves it!", rating: 5, location: "Bangalore" },
  { name: "Arjun Nair", role: "CEO, UrbanFit", avatar: "A", color: "#16a34a", review: "Before RTO Shield, we were losing ₹80,000/month on fake COD orders. Now it's under ₹15,000. The ROI is insane for a ₹999 plan.", rating: 5, location: "Chennai" },
  { name: "Sneha Patel", role: "D2C Manager, OrganicLife", avatar: "S", color: "#db2777", review: "Setup took literally 5 minutes. The API integration with our Shopify store works perfectly. Highly recommended for any D2C brand.", rating: 5, location: "Ahmedabad" },
  { name: "Vikram Singh", role: "Logistics Head, FashionHub", avatar: "V", color: "#7c3aed", review: "The pincode risk mapping is brilliant. We now know exactly which areas have high RTO rates and can take preventive action automatically.", rating: 5, location: "Delhi" },
  { name: "Ananya Roy", role: "Founder, KidsZone", avatar: "A", color: "#0891b2", review: "Customer support is excellent and the dashboard is very intuitive. We've been using it for 2 months and can't imagine running without it.", rating: 5, location: "Kolkata" },
];

const brands = [
  "● VOGUE STYLE",
  "◆ TECHGEAR",
  "□ URBAN FIT",
  "✦ ORGANIC LIFE",
  "▲ FASHION HUB",
  "◉ KIDS ZONE",
];


export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ full_name: "", email: "", brand_name: "",phone: "", monthly_orders: "< 500 orders" });
  const [formStatus, setFormStatus] = useState(null);

  const handleFormSubmit = async () => {
    try {
      setFormStatus("loading");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/early-access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error();

      setFormStatus("success");


      setForm({
        full_name: "",
        email: "",
        brand_name: "",
        phone: "",
        order_volume: "< 500 orders"
      });

    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-track2:hover { animation-play-state: paused; }
        .float1 { animation: float1 4s ease-in-out infinite; }
        .float2 { animation: float2 5s ease-in-out infinite 0.5s; }
        .float3 { animation: float3 3.5s ease-in-out infinite 1s; }
        .float4 { animation: float1 6s ease-in-out infinite 1.5s; }
        .float5 { animation: float2 4.5s ease-in-out infinite 0.8s; }
        .float6 { animation: float3 5.5s ease-in-out infinite 0.3s; }
      `}</style>

      <PublicNavbar />
      <div className="font-sans" style={{ background: "#f0f4ff" }}>

        {/* ── HERO ── */}
        <section style={{ background: "linear-gradient(135deg, #1a1a6e 0%, #2d2d9b 40%, #4f46e5 70%, #7c3aed 100%)" }} className="relative overflow-hidden px-6 py-28">
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
          <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />

          <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8" style={{ background: "rgba(249,115,22,0.2)", color: "#fed7aa", border: "1px solid rgba(249,115,22,0.4)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                For Indian Ecommerce &amp; D2C Brands
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white tracking-tight">
                Stop Losing Money<br />on{" "}
                <span style={{ background: "linear-gradient(90deg, #fb923c, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  COD Orders
                </span>
              </h1>
              <p className="text-indigo-200 text-lg leading-relaxed mb-10 max-w-lg">
                ZRTO AI predicts risky COD orders before shipping and helps Indian brands recover thousands of rupees every month using machine learning.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/register" className="font-bold px-8 py-4 rounded-xl text-base shadow-2xl transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#fff", boxShadow: "0 8px 32px rgba(249,115,22,0.4)" }}>
                  Start Free — No Credit Card →
                </Link>
                <Link to="/pricing" className="font-semibold px-8 py-4 rounded-xl text-base transition-all border-2" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", background: "rgba(255,255,255,0.1)" }}>
                  View Pricing
                </Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {[
                  { val: "70%", label: "RTO Reduction" },
                  { val: "₹28K+", label: "Saved / Month" },
                  { val: "50", label: "Free Predictions" },
                ].map(s => (
                  <div key={s.val}>
                    <div className="text-2xl font-extrabold text-orange-300">{s.val}</div>
                    <div className="text-indigo-300 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl p-5 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] text-indigo-200 uppercase tracking-widest font-semibold">Live Monitoring</span>
                </div>
                <div className="rounded-xl p-4 mb-3" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "rgba(239,68,68,0.2)" }}>🛡️</div>
                      <div>
                        <div className="font-bold text-sm text-white">High Risk Order #10249</div>
                        <div className="text-xs text-red-300">Incomplete Address · Low Pincode Score</div>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-red-300">92% Risk</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(239,68,68,0.25)", color: "#fca5a5" }}>Auto-Held</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.1)", color: "#e0e7ff" }}>Alert Sent</span>
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "rgba(34,197,94,0.2)" }}>✅</div>
                      <div>
                        <div className="font-bold text-sm text-white">Order Verified #10250</div>
                        <div className="text-xs text-green-300">Customer confirmed · Safe to ship</div>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-green-300">Safe</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-3 shadow-2xl" style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 8px 24px rgba(249,115,22,0.5)" }}>
                <div className="text-2xl font-extrabold text-white">₹45k</div>
                <div className="text-orange-100 text-xs">Saved this week</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FLOATING TRUST STRIP ── */}
        <section className="py-10 px-6 overflow-hidden" style={{ background: "#eef2ff", borderBottom: "1px solid #c7d2fe" }}>
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: "#6366f1" }}>
            Trusted by fast-growing Indian ecommerce brands
          </p>

          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden ">
            <div className="flex gap-4 marquee-track" style={{ width: "max-content" }}>
              {[...brands, ...brands].map((b, i) => (
                <div key={i} className="float1 flex-shrink-0 px-6 py-3 rounded-2xl font-extrabold text-sm tracking-widest cursor-default transition-all hover:scale-110"
                  style={{
                    background: i % 4 === 0 ? "#e0e7ff" : i % 4 === 1 ? "#fce7f3" : i % 4 === 2 ? "#dcfce7" : "#fff7ed",
                    color: i % 4 === 0 ? "#4338ca" : i % 4 === 1 ? "#be185d" : i % 4 === 2 ? "#15803d" : "#c2410c",
                    border: `2px solid ${i % 4 === 0 ? "#c4b5fd" : i % 4 === 1 ? "#f9a8d4" : i % 4 === 2 ? "#86efac" : "#fdba74"}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    animationDelay: `${i * 0.3}s`,
                  }}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="py-24 px-6" style={{ background: "#f0f4ff" }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "#fee2e2", color: "#dc2626" }}>The Problem</div>
              <h2 className="text-4xl font-extrabold mb-5 leading-tight" style={{ color: "#1e1b4b" }}>RTO Is Silently<br />Killing Your Profit</h2>
              <p className="leading-relaxed mb-8 text-base" style={{ color: "#4b5563" }}>Cash on Delivery dominates Indian e-commerce, but it comes with a heavy price: high return rates, fake orders, and wasted logistics spend.</p>
              <div className="space-y-4">
                {["High COD share in India leads to unpredictable returns", "Rising fake orders and incomplete addresses", "Every failed delivery wastes shipping, packaging, and time", "Manual calling verification is slow and doesn't scale"].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: "#fee2e2", color: "#dc2626" }}>✕</div>
                    <span className="text-sm leading-relaxed" style={{ color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8 shadow-xl" style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff" }}>
              <div className="text-5xl font-extrabold mb-1">30–40%</div>
              <div className="font-bold mb-1 text-orange-300">Average COD RTO Rate</div>
              <div className="text-indigo-300 text-sm mb-8">in fashion &amp; impulse categories</div>
              <div className="space-y-4">
                {[{ label: "Cost of Shipping", value: "₹80 – ₹120" }, { label: "Cost of Return", value: "₹100+" }].map(r => (
                  <div key={r.label} className="flex justify-between pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="text-indigo-300 text-sm">{r.label}</span>
                    <span className="font-bold text-sm text-white">{r.value}</span>
                  </div>
                ))}
                <div className="rounded-xl p-4 text-center font-bold" style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}>Total Loss per RTO: ₹200+</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOLUTION ── */}
        <section className="py-24 px-6" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "rgba(255,255,255,0.15)", color: "#e0e7ff" }}>Our Solution</div>
            <h2 className="text-4xl font-extrabold mb-4 text-white">AI That Protects Every COD<br />Order Before It Ships</h2>
            <p className="max-w-xl mx-auto mb-14 text-indigo-200">Stop relying on gut feeling. Let data and automation filter out the noise.</p>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                { icon: "🎯", bg: "#fff7ed", iconBg: "#fed7aa", iconColor: "#ea580c", title: "AI RTO Risk Scoring", desc: "Score every COD order using historical data, pin-code performance, and courier success rates.", titleColor: "#ea580c" },
                { icon: "📊", bg: "#eff6ff", iconBg: "#bfdbfe", iconColor: "#2563eb", title: "Smart Analytics", desc: "Deep insights into which areas and customer types drive your RTO losses the most.", titleColor: "#2563eb" },
                { icon: "🗺️", bg: "#faf5ff", iconBg: "#e9d5ff", iconColor: "#7c3aed", title: "Hyperlocal Risk Map", desc: "See which pin-codes drive the most RTO. Block or add verification with one click.", titleColor: "#7c3aed" },
                { icon: "⚡", bg: "#f0fdf4", iconBg: "#bbf7d0", iconColor: "#16a34a", title: "API Integration", desc: "Connect directly to your store. Score orders in real-time before they're dispatched.", titleColor: "#16a34a" },
              ].map(f => (
                <div key={f.title} className="rounded-2xl p-6 text-left shadow-lg hover:scale-105 transition-transform" style={{ background: f.bg }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background: f.iconBg }}>{f.icon}</div>
                  <h3 className="font-extrabold mb-2 text-base" style={{ color: f.titleColor }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6" id="how-it-works" style={{ background: "#f0f4ff" }}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "#e0e7ff", color: "#4338ca" }}>Simple Process</div>
            <h2 className="text-4xl font-extrabold mb-16" style={{ color: "#1e1b4b" }}>How It Works</h2>
            <div className="relative grid md:grid-cols-4 gap-8">
              <div className="absolute top-10 left-[12%] right-[12%] h-0.5 hidden md:block" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }} />
              {[
                { icon: "🔌", num: "1", title: "Connect Your Store", desc: "Connect Shopify, WooCommerce, or custom store via API or CSV upload.", color: "#4f46e5" },
                { icon: "🤖", num: "2", title: "AI Scores Each Order", desc: "New COD orders are instantly scored for RTO risk using our AI engine.", color: "#7c3aed" },
                { icon: "🔔", num: "3", title: "Get Instant Alerts", desc: "Risky orders are flagged immediately. Take action before dispatch.", color: "#db2777" },
                { icon: "📦", num: "4", title: "Ship with Confidence", desc: "Only ship verified orders. Track all savings from your dashboard.", color: "#059669" },
              ].map(step => (
                <div key={step.num} className="flex flex-col items-center text-center relative">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl shadow-lg" style={{ background: "#fff", border: `3px solid ${step.color}` }}>{step.icon}</div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shadow-lg" style={{ background: step.color }}>{step.num}</div>
                  </div>
                  <h3 className="font-extrabold mb-2" style={{ color: step.color }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BUILT FOR ── */}
        <section className="py-24 px-6" style={{ background: "#eef2ff" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: "#1e1b4b" }}>Built for Modern Indian Ecommerce Teams</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "👗", bg: "#fdf2f8", border: "#f9a8d4", title: "D2C Fashion & Apparel", titleColor: "#be185d", desc: "High COD share and impulse buying make fashion one of the most RTO-heavy categories. Cut avoidable returns." },
                { icon: "📱", bg: "#eff6ff", border: "#93c5fd", title: "Electronics & Gadgets", titleColor: "#1d4ed8", desc: "Protect higher ticket orders from fake COD attempts and unreachable customers. Secure your high-value inventory." },
                { icon: "🏪", bg: "#fff7ed", border: "#fdba74", title: "Local & Regional Brands", titleColor: "#c2410c", desc: "Whether you ship 500 or 50,000 orders a month, AI-driven risk scoring keeps logistics cost under control." },
              ].map(item => (
                <div key={item.title} className="rounded-2xl p-7 shadow-md hover:shadow-xl transition-shadow" style={{ background: item.bg, border: `2px solid ${item.border}` }}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-extrabold mb-2 text-lg" style={{ color: item.titleColor }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)" }}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
            {[
              { val: "70%", label: "Avg RTO Reduction", color: "#fb923c" },
              { val: "₹4.2L", label: "Saved Per Client/Month", color: "#34d399" },
              { val: "15+", label: "Risk Signals Analyzed", color: "#a78bfa" },
              { val: "50", label: "Free Predictions", color: "#60a5fa" },
            ].map(s => (
              <div key={s.val}>
                <div className="text-4xl font-extrabold mb-2" style={{ color: s.color }}>{s.val}</div>
                <div className="text-indigo-300 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLIENT REVIEWS ── */}
        <section className="py-24 px-6 overflow-hidden" style={{ background: "#f0f4ff" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "#e0e7ff", color: "#4338ca" }}>Customer Reviews</div>
              <h2 className="text-4xl font-extrabold mb-3" style={{ color: "#1e1b4b" }}>Loved by 500+ Indian Brands</h2>
              <p className="text-sm" style={{ color: "#6b7280" }}>Real results from real businesses across India</p>
              {/* Star rating summary */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-2xl">⭐</span>)}
                </div>
                <span className="font-extrabold text-2xl" style={{ color: "#1e1b4b" }}>4.9</span>
                <span className="text-sm" style={{ color: "#6b7280" }}>out of 5 · 50+ Positive reviews</span>
              </div>
            </div>

            {/* Reviews grid — 3 columns */}
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i}
                  className={`rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all ${["float1", "float2", "float3", "float4", "float5", "float6"][i]}`}
                  style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-sm">⭐</span>)}
                  </div>
                  {/* Review text */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#374151" }}>
                    "{review.review}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${review.color}, ${review.color}cc)` }}>
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm" style={{ color: "#1e1b4b" }}>{review.name}</div>
                      <div className="text-xs" style={{ color: "#6b7280" }}>{review.role}</div>
                    </div>
                    <div className="ml-auto text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: "#f0f4ff", color: "#4338ca" }}>
                      📍 {review.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA below reviews */}
            <div className="text-center mt-12">
              <Link to="/register"
                className="inline-block font-extrabold px-8 py-4 rounded-xl text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}>
                Join 500+ Happy Brands — Start Free →
              </Link>
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section className="py-24 px-6" style={{ background: "#eef2ff" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "#e0e7ff", color: "#4338ca" }}>Integrations</div>
                <h2 className="text-4xl font-extrabold mb-3" style={{ color: "#1e1b4b" }}>Plug &amp; Play with Your Stack</h2>
                <p className="max-w-lg text-sm leading-relaxed" style={{ color: "#4b5563" }}>Get RTO protection up and running in less than 5 minutes without writing a single line of code.</p>
              </div>
              <Link to="/register" className="font-bold px-6 py-3 rounded-xl text-sm whitespace-nowrap transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}>
                Request API Access →
              </Link>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                { icon: "🛍️", bg: "#f0fdf4", border: "#86efac", iconBg: "#dcfce7", title: "Shopify", badge: "POPULAR", badgeBg: "#dcfce7", badgeColor: "#16a34a", link: "Coming Soon... →", linkColor: "#16a34a", desc: "Auto-sync orders, add risk tags, and manage verification from your Shopify Admin." },
                { icon: "🏪", bg: "#faf5ff", border: "#d8b4fe", iconBg: "#ede9fe", title: "WooCommerce", link: "Coming Soon... →", linkColor: "#7c3aed", desc: "Lightweight WordPress plugin. Hooks into checkout to flag risky COD orders instantly." },
                { icon: "⚡", bg: "#fff7ed", border: "#fdba74", iconBg: "#ffedd5", title: "Custom API", link: "view More Details →", linkColor: "#ea580c", desc: "Use our REST API to score orders and trigger verification workflows programmatically." },
                { icon: "📁", bg: "#eff6ff", border: "#93c5fd", iconBg: "#dbeafe", title: "Manual Upload", link: "View Guide →", linkColor: "#2563eb", desc: "No tech team? Export orders to CSV and upload to our dashboard for bulk scoring." },
              ].map(item => (
                <div key={item.title} className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 relative" style={{ background: item.bg, border: `2px solid ${item.border}` }}>
                  {item.badge && <span className="absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase" style={{ background: item.badgeBg, color: item.badgeColor }}>{item.badge}</span>}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: item.iconBg }}>{item.icon}</div>
                  <h3 className="font-extrabold mb-2" style={{ color: "#1e1b4b" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#4b5563" }}>{item.desc}</p>
                  <span className="text-sm font-bold" style={{ color: item.linkColor }}>{item.link}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6" style={{ background: "#f0f4ff" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-3" style={{ color: "#1e1b4b" }}>Frequently Asked Questions</h2>
            <p className="text-center text-sm mb-12" style={{ color: "#6b7280" }}>Everything you need to know about RTO Shield AI</p>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
                  <button className="w-full flex items-center justify-between px-6 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-bold" style={{ color: "#1e1b4b" }}>{faq.q}</span>
                    <span className="text-xl ml-4 flex-shrink-0 font-bold" style={{ color: "#4f46e5" }}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm leading-relaxed" style={{ borderTop: "1px solid #e0e7ff", paddingTop: "1rem", color: "#4b5563" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}>
          <div className="max-w-4xl mx-auto rounded-3xl p-10 grid md:grid-cols-2 gap-12 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <div>
              <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "rgba(249,115,22,0.3)", color: "#fed7aa" }}>Beta Program</div>
              <h2 className="text-3xl font-extrabold mb-4 leading-tight text-white">Join the Early<br />Access Beta</h2>
              <p className="mb-8 leading-relaxed text-sm text-indigo-200">Get priority onboarding, custom setup help, and discounted pricing for life when you join our beta program.</p>
              <div className="space-y-4">
                {["Fill out the form with your store details.", "Our team will review and approve your slot.", "We'll reach out within 24–48 hours with onboarding steps."].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0 mt-0.5 text-white" style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 4px 12px rgba(249,115,22,0.4)" }}>{i + 1}</div>
                    <span className="text-sm leading-relaxed text-indigo-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-extrabold text-white mb-2">
                    Application Received!
                  </h3>
                  <p className="text-indigo-200 text-sm">
                    We'll be in touch within 24–48 hours.
                  </p>
                </div>
              ) : (
                <>
                  {[
                    { label: "Full Name", key: "full_name", type: "text", placeholder: "John Doe" },
                    { label: "Work Email", key: "email", type: "email", placeholder: "john@brand.com" },
                    { label: "Brand Name", key: "brand_name", type: "text", placeholder: "My Awesome Store" },
                    { label: "Phone", key: "phone", type: "tel", placeholder: "9876543210" }, // ✅ ADDED
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-xs font-bold mb-1.5 block text-indigo-200 uppercase tracking-wide">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={(e) =>
                          setForm({ ...form, [field.key]: e.target.value })
                        }
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#fff",
                        }}
                      />
                    </div>
                  ))}

                  {/* Monthly Orders */}
                  <div>
                    <label className="text-xs font-bold mb-1.5 block text-indigo-200 uppercase tracking-wide">
                      Monthly Order Volume
                    </label>
                    <select
                      value={form.monthly_orders} // ✅ FIXED
                      onChange={(e) =>
                        setForm({ ...form, monthly_orders: e.target.value }) // ✅ FIXED
                      }
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#e0e7ff",
                      }}
                    >
                      <option style={{ background: "#312e81" }}>&lt; 500 orders</option>
                      <option style={{ background: "#312e81" }}>
                        500 – 2,000 orders
                      </option>
                      <option style={{ background: "#312e81" }}>
                        2,000 – 10,000 orders
                      </option>
                      <option style={{ background: "#312e81" }}>
                        10,000+ orders
                      </option>
                    </select>
                  </div>

                  {formStatus === "error" && (
                    <p className="text-red-300 text-xs">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    onClick={handleFormSubmit}
                    disabled={formStatus === "loading"}
                    className="w-full font-extrabold py-4 rounded-xl text-sm transition-all hover:scale-105 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #fb923c)",
                      color: "#fff",
                      boxShadow: "0 8px 24px rgba(249,115,22,0.4)",
                    }}
                  >
                    {formStatus === "loading"
                      ? "Submitting..."
                      : "Apply for Early Access →"}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
