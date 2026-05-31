import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

export default function UsagePage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://zrtobackend-production.up.railway.app/usage", { credentials:"include" })
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  const used = data?.used ?? 0;
  const limit = typeof data?.limit === "number" ? data.limit : 50;
  const plan = data?.plan || localStorage.getItem("plan") || "free";
  const remaining = typeof data?.remaining === "number" ? data.remaining : limit - used;
  const percent = Math.min((used / limit) * 100, 100);

  const getBarColor = () => {
    if (percent >= 90) return { bar: "#dc2626", bg: "#fee2e2", text: "#dc2626", label: "Critical" };
    if (percent >= 70) return { bar: "#f97316", bg: "#fff7ed", text: "#ea580c", label: "High" };
    if (percent >= 40) return { bar: "#4f46e5", bg: "#e0e7ff", text: "#4338ca", label: "Moderate" };
    return { bar: "#16a34a", bg: "#dcfce7", text: "#15803d", label: "Low" };
  };

  const colors = getBarColor();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>📈</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Usage</h1>
          <p className="text-indigo-200 text-sm">Track your prediction usage and plan limits</p>
        </div>
      </div>

      {/* Plan + usage overview */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Current Plan", value: plan.charAt(0).toUpperCase() + plan.slice(1), icon: "💎", color: "#4f46e5", bg: "#e0e7ff" },
          { label: "Predictions Used", value: used.toLocaleString("en-IN"), icon: "🤖", color: "#7c3aed", bg: "#ede9fe" },
          { label: "Remaining", value: remaining === "Unlimited" ? "∞" : remaining.toLocaleString("en-IN"), icon: "⚡", color: "#16a34a", bg: "#dcfce7" },
        ].map(card => (
          <div key={card.label} className="rounded-2xl p-5 shadow-md" style={{ background: card.bg, border: `2px solid ${card.color}25` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${card.color}20` }}>{card.icon}</div>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#6b7280" }}>{card.label}</span>
            </div>
            <div className="text-3xl font-extrabold" style={{ color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Usage bar card */}
      <div className="rounded-2xl p-7 shadow-md mb-8" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-extrabold text-lg" style={{ color: "#1e1b4b" }}>Monthly Usage</h2>
            <p className="text-sm" style={{ color: "#6b7280" }}>Resets every 30 days</p>
          </div>
          <span className="px-4 py-1.5 rounded-full text-sm font-extrabold"
            style={{ background: colors.bg, color: colors.text }}>
            {colors.label} — {percent.toFixed(0)}% used
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-5 rounded-full mb-3" style={{ background: "#f1f5f9" }}>
          <div className="h-5 rounded-full transition-all duration-700"
            style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${colors.bar}, ${colors.bar}bb)`, boxShadow: `0 2px 10px ${colors.bar}44` }} />
        </div>

        <div className="flex justify-between text-xs font-semibold" style={{ color: "#9ca3af" }}>
          <span>0</span>
          <span style={{ color: colors.text }}>{used} used</span>
          <span>{limit}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl p-6 shadow-md" style={{ background: "#f5f3ff", border: "2px solid #c4b5fd" }}>
          <h3 className="font-extrabold mb-4" style={{ color: "#4f46e5" }}>📊 Usage Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: "CSV Upload Predictions", value: used, max: limit, color: "#4f46e5" },
              { label: "API Predictions", value: 0, max: limit, color: "#7c3aed" },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span style={{ color: "#374151" }}>{item.label}</span>
                  <span style={{ color: item.color }}>{item.value}</span>
                </div>
                <div className="w-full h-2.5 rounded-full" style={{ background: "#e0e7ff" }}>
                  <div className="h-2.5 rounded-full" style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade nudge */}
        {plan === "free" && (
          <div className="rounded-2xl p-6 shadow-md" style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", border: "2px solid #fdba74" }}>
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-extrabold text-lg mb-2" style={{ color: "#c2410c" }}>Need More Predictions?</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#78350f" }}>
              Upgrade to Pro for 5,000 predictions/month, full API access, and priority support.
            </p>
            <div className="text-2xl font-extrabold mb-5" style={{ color: "#ea580c" }}>
              ₹4999 <span className="text-sm font-semibold" style={{ color: "#9a3412" }}>/month</span>
            </div>
            <Link to="/pricing"
              className="inline-block px-6 py-3 rounded-xl font-extrabold text-sm text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 4px 16px rgba(249,115,22,0.35)" }}>
              Upgrade to Pro →
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}