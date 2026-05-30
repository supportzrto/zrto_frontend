import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const [apiPurchased, setApiPurchased] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/key", { headers: { token } })
      .then(res => res.json())
      .then(data => {
        setApiPurchased(data.api_purchased ?? false);
        setApiKey(data.api_key || "");
        setEnabled(data.enabled ?? false);
        if (data.api_key) localStorage.setItem("api_key", data.api_key);
        setPageLoading(false);
      })
      .catch(() => setPageLoading(false));
  }, []);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerate = async () => {
    if (!confirm("Regenerate API key? Your old key will stop working immediately.")) return;
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/api/regenerate-key", {
      method: "POST", headers: { token },
    });
    const data = await res.json();
    setApiKey(data.api_key || "");
    if (data.api_key) localStorage.setItem("api_key", data.api_key);
    setLoading(false);
  };

  const toggleKey = async () => {
    const endpoint = enabled ? "/api/key/disable" : "/api/key/enable";
    await fetch(`http://127.0.0.1:8000${endpoint}`, { method: "POST", headers: { token } });
    setEnabled(!enabled);
  };

  const codeExample = `fetch("http://127.0.0.1:8000/api/predict-order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    api_key: "${apiKey || "YOUR_API_KEY"}",
    order_id: 123,
    order_value: 2500,
    payment_type: "COD",
    pincode: 500081,
    customer_city: "Hyderabad",
    device_type: "Mobile",
    order_channel: "Website"
  })
})
.then(res => res.json())
.then(data => console.log(data));
// Response: { risk_score: 0.87, decision: "BLOCK_COD", action: "..." }`;

  // ── Loading state ──
  if (pageLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <div className="text-4xl animate-spin">⏳</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* ── Header ── */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>🔑</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">API Access</h1>
          <p className="text-indigo-200 text-sm">Manage your API key and integrate with your store</p>
        </div>
      </div>

      {/* ── NOT PURCHASED ── */}
      {!apiPurchased ? (
        <div>

          {/* Purchase card */}
          <div className="rounded-2xl p-10 text-center shadow-xl mb-8"
            style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)", border: "2px solid #fed7aa" }}>
            <div className="text-6xl mb-5">🔒</div>
            <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#c2410c" }}>
              API Access is a Paid Feature
            </h2>
            <p className="text-sm mb-8 max-w-lg mx-auto leading-relaxed" style={{ color: "#78350f" }}>
              Purchase API access to integrate RTO Shield AI directly into your Shopify, WooCommerce,
              or custom store. Get a unique API key and score orders in real-time before dispatch.
            </p>

            {/* Price */}
            <div className="inline-block rounded-2xl px-10 py-6 mb-8"
              style={{ background: "#fff", border: "2px solid #fed7aa", boxShadow: "0 4px 16px rgba(249,115,22,0.15)" }}>
              <div className="text-4xl font-extrabold mb-1" style={{ color: "#ea580c" }}>
                ₹499
                <span className="text-lg font-semibold ml-1" style={{ color: "#9a3412" }}>/month</span>
              </div>
              <p className="text-xs" style={{ color: "#6b7280" }}>Billed monthly · Cancel anytime</p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-left">
              {[
                "✅ Unique API key generated instantly",
                "✅ 60 API requests per minute",
                "✅ Shopify & WooCommerce ready",
                "✅ Real-time COD risk scoring",
                "✅ Full API documentation access",
                "✅ Enable / disable key anytime",
              ].map(f => (
                <div key={f} className="text-sm font-semibold" style={{ color: "#78350f" }}>{f}</div>
              ))}
            </div>

            <Link to="/pricing"
              className="inline-block px-10 py-4 rounded-xl font-extrabold text-white text-base transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}>
              🚀 Purchase API Access — ₹499/month
            </Link>

            <p className="text-xs mt-4" style={{ color: "#9ca3af" }}>
              Secure payment via Razorpay · Instant activation after payment
            </p>
          </div>

          {/* What you get */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: "⚡", title: "Instant Integration", desc: "Get your API key immediately after purchase. Start scoring orders in minutes.", color: "#4f46e5", bg: "#e0e7ff" },
              { icon: "🛡️", title: "Secure & Reliable", desc: "Enterprise-grade security. Your key is encrypted and can be rotated anytime.", color: "#16a34a", bg: "#dcfce7" },
              { icon: "📊", title: "Full Analytics", desc: "Every API call is logged in your dashboard with risk scores and decisions.", color: "#ea580c", bg: "#ffedd5" },
            ].map(item => (
              <div key={item.title} className="rounded-2xl p-6 shadow-md"
                style={{ background: item.bg, border: `2px solid ${item.color}25` }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-extrabold mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div
            className="rounded-2xl p-8 shadow-md mb-8"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}
          >
            <h2
              className="text-xl font-extrabold mb-6 text-center"
              style={{ color: "#1e1b4b" }}
            >
              ⚙️ How API Access Works
            </h2>

            <div className="grid md:grid-cols-6 gap-4 text-center">
              {[
                "Purchase API",
                "Get API Key",
                "Integrate Store",
                "Send Orders",
                "Get Risk Score",
                "Take Action"
              ].map((step, index) => (
                <div key={step}>
                  <div
                    className="w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-white mb-3"
                    style={{
                      background: "linear-gradient(135deg,#4f46e5,#7c3aed)"
                    }}
                  >
                    {index + 1}
                  </div>

                  <p className="text-xs font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>


          {/* Supported Platforms */}
          <div
            className="rounded-2xl p-8 shadow-md mb-8"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}
          >
            <h2
              className="text-xl font-extrabold mb-6 text-center"
              style={{ color: "#1e1b4b" }}
            >
              🛍 Supported Platforms
            </h2>

            <div className="grid md:grid-cols-5 gap-4 text-center">
              {[
                "Shopify",
                "WooCommerce",
                "React Store",
                "Custom Website",
                "Mobile App"
              ].map(platform => (
                <div
                  key={platform}
                  className="rounded-xl p-4"
                  style={{
                    background: "#f8f7ff",
                    border: "1px solid #e0e7ff"
                  }}
                >
                  <div className="text-2xl mb-2">✅</div>
                  <div className="font-bold text-sm">{platform}</div>
                </div>
              ))}
            </div>
          </div>


          {/* Example Prediction */}
          <div
            className="rounded-2xl p-8 shadow-md mb-8"
            style={{
              background: "#fff",
              border: "2px solid #e0e7ff"
            }}
          >
            <h2
              className="text-xl font-extrabold mb-6"
              style={{ color: "#1e1b4b" }}
            >
              📦 Example Order Prediction
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div
                className="rounded-xl p-5"
                style={{ background: "#f8f7ff" }}
              >
                <h3 className="font-bold mb-3">Customer Order</h3>

                <div className="space-y-2 text-sm">
                  <div>Order Value: ₹2,499</div>
                  <div>Payment: COD</div>
                  <div>City: Hyderabad</div>
                  <div>Customer: New User</div>
                </div>
              </div>

              <div
                className="rounded-xl p-5"
                style={{
                  background: "#fff7ed",
                  border: "2px solid #fed7aa"
                }}
              >
                <h3
                  className="font-bold mb-3"
                  style={{ color: "#ea580c" }}
                >
                  AI Result
                </h3>

                <div className="space-y-2 text-sm">
                  <div>Risk Score: 91%</div>
                  <div>Decision: VERIFY</div>
                  <div>Reason: High RTO Area</div>
                  <div>Action: Verify Customer Before Shipping</div>
                </div>
              </div>

            </div>
          </div>

          {/* Blurred code preview */}
          <div className="rounded-2xl overflow-hidden shadow-md relative" style={{ border: "2px solid #1e1b4b" }}>
            <div className="flex items-center px-5 py-3" style={{ background: "#1e1b4b" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="ml-3 text-xs font-bold text-indigo-300">
                API Code Example — Unlock after purchase
              </span>
            </div>
            <div style={{ filter: "blur(4px)", pointerEvents: "none" }}>
              <pre className="p-6 text-sm leading-relaxed" style={{ background: "#0f172a", color: "#a5f3fc" }}>
                {`fetch("http://localhost:8000/api/predict-order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    order_id: 123,
    order_value: 2500,
    payment_type: "COD",
    pincode: 500081,
    customer_city: "Hyderabad",
  })
})
.then(res => res.json())
.then(data => console.log(data));`}
              </pre>
            </div>
            {/* Lock overlay */}
            <div className="absolute flex items-center justify-center"
              style={{ top: "44px", left: 0, right: 0, bottom: 0, background: "rgba(15,23,42,0.6)" }}>
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-white font-bold text-sm">Purchase API access to unlock</p>
                <Link to="/pricing"
                  className="inline-block mt-3 px-5 py-2 rounded-xl text-xs font-extrabold text-white"
                  style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
                  Purchase Now →
                </Link>
              </div>
            </div>
          </div>
        </div>

      ) : (
        /* ── PURCHASED — show full API management ── */
        <div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            {/* API Key card */}
            <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-extrabold text-lg" style={{ color: "#1e1b4b" }}>Your API Key</h2>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: enabled ? "#dcfce7" : "#fee2e2",
                    color: enabled ? "#16a34a" : "#dc2626"
                  }}>
                  {enabled ? "● Active" : "● Disabled"}
                </span>
              </div>

              <div className="rounded-xl p-4 mb-2 flex items-center gap-3"
                style={{ background: "#f5f3ff", border: "2px solid #c4b5fd" }}>
                <span className="flex-1 font-mono text-sm truncate" style={{ color: "#4f46e5" }}>
                  {showKey ? (apiKey || "Loading...") : (apiKey ? "•".repeat(32) : "Loading...")}
                </span>
                <button onClick={() => setShowKey(!showKey)}
                  className="text-xs font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: "#e0e7ff", color: "#4338ca" }}>
                  {showKey ? "🙈 Hide" : "👁️ Show"}
                </button>
                <button onClick={copyKey}
                  className="text-xs font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0 transition-all"
                  style={{
                    background: copied ? "#dcfce7" : "#e0e7ff",
                    color: copied ? "#16a34a" : "#4338ca"
                  }}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>

              <p className="text-xs mb-6" style={{ color: "#9ca3af" }}>
                🔒 Never share this key publicly or commit it to version control.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={regenerate} disabled={loading}
                  className="py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{ background: "#fff7ed", color: "#ea580c", border: "2px solid #fed7aa" }}>
                  {loading ? "⏳ Regenerating..." : "🔄 Regenerate"}
                </button>
                <button onClick={toggleKey}
                  className="py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{
                    background: enabled ? "#fee2e2" : "#dcfce7",
                    color: enabled ? "#dc2626" : "#16a34a",
                    border: `2px solid ${enabled ? "#fca5a5" : "#86efac"}`
                  }}>
                  {enabled ? "🚫 Disable" : "✅ Enable"}
                </button>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff7ed", border: "2px solid #fed7aa" }}>
              <h2 className="font-extrabold text-lg mb-5" style={{ color: "#c2410c" }}>⚡ Quick Reference</h2>
              <div className="space-y-3">
                {[
                  { label: "Base URL", value: "http://127.0.0.1:8000", color: "#4f46e5" },
                  { label: "Predict Endpoint", value: "/api/predict-order", color: "#7c3aed" },
                  { label: "Method", value: "POST", color: "#16a34a" },
                  { label: "Auth Method", value: "api_key in body", color: "#ea580c" },
                  { label: "Content-Type", value: "application/json", color: "#0891b2" },
                  { label: "Rate Limit", value: "60 requests/minute", color: "#db2777" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: "#78350f" }}>{item.label}</span>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
                      style={{ background: `${item.color}15`, color: item.color }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code example */}
          <div className="rounded-2xl overflow-hidden shadow-md mb-6" style={{ border: "2px solid #1e1b4b" }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ background: "#1e1b4b" }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-bold text-indigo-300">Example API Request — JavaScript</span>
              </div>
              <button onClick={() => navigator.clipboard.writeText(codeExample)}
                className="text-xs font-bold px-3 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.1)", color: "#a5b4fc" }}>
                📋 Copy Code
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed"
              style={{ background: "#0f172a", color: "#a5f3fc" }}>
              <code>{codeExample}</code>
            </pre>
          </div>

          {/* Response + Decisions */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: "2px solid #e0e7ff" }}>
              <div className="px-5 py-3 font-extrabold text-sm"
                style={{ background: "#e0e7ff", color: "#4338ca" }}>
                📥 Example Response
              </div>
              <pre className="p-5 text-sm leading-relaxed" style={{ background: "#f8f7ff", color: "#4f46e5" }}>
                {`{
  "risk_score": 0.87,
  "decision": "BLOCK_COD",
  "action": "Convert to prepaid or cancel"
}`}
              </pre>
            </div>

            <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
              <h3 className="font-extrabold mb-4" style={{ color: "#1e1b4b" }}>📊 Decision Types</h3>
              <div className="space-y-3">
                {[
                  { decision: "BLOCK_COD", desc: "High risk — hold or cancel order", color: "#dc2626", bg: "#fee2e2" },
                  { decision: "VERIFY", desc: "Medium risk — verify customer first", color: "#d97706", bg: "#fef3c7" },
                  { decision: "ALLOW", desc: "Low risk — safe to ship", color: "#16a34a", bg: "#dcfce7" },
                ].map(d => (
                  <div key={d.decision} className="flex items-center gap-3">
                    <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg flex-shrink-0"
                      style={{ background: d.bg, color: d.color }}>
                      {d.decision}
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>{d.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All endpoints */}
          <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h2 className="font-extrabold text-lg mb-5" style={{ color: "#1e1b4b" }}>📚 All Available Endpoints</h2>
            <div className="space-y-3">
              {[
                { method: "POST", path: "/api/predict-order", desc: "Score a single COD order for RTO risk", color: "#16a34a", bg: "#dcfce7" },
                { method: "POST", path: "/predict", desc: "Bulk predict orders via CSV file upload", color: "#4f46e5", bg: "#e0e7ff" },
                { method: "GET", path: "/usage", desc: "Get your current plan usage and limits", color: "#0891b2", bg: "#cffafe" },
                { method: "GET", path: "/api/stats", desc: "Get detailed prediction statistics", color: "#7c3aed", bg: "#ede9fe" },
                { method: "GET", path: "/api/logs", desc: "Retrieve all API prediction logs", color: "#db2777", bg: "#fce7f3" },
                { method: "POST", path: "/api/regenerate-key", desc: "Generate a new API key", color: "#ea580c", bg: "#ffedd5" },
              ].map(ep => (
                <div key={ep.path}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: ep.bg, border: `2px solid ${ep.color}20` }}>
                  <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg flex-shrink-0 text-white"
                    style={{ background: ep.color }}>{ep.method}</span>
                  <span className="font-mono font-bold text-sm flex-shrink-0"
                    style={{ color: ep.color }}>{ep.path}</span>
                  <span className="text-sm" style={{ color: "#6b7280" }}>{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div
            className="rounded-2xl p-8 shadow-md mt-8"
            style={{
              background: "#fff",
              border: "2px solid #e0e7ff"
            }}
          >
            <h2
              className="text-xl font-extrabold mb-6"
              style={{ color: "#1e1b4b" }}
            >
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-5">

              <div>
                <h3 className="font-bold">
                  What happens after payment?
                </h3>
                <p className="text-sm text-gray-500">
                  Your API key is generated instantly.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I regenerate my API key?
                </h3>
                <p className="text-sm text-gray-500">
                  Yes, anytime from the API Access page.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I disable my API key?
                </h3>
                <p className="text-sm text-gray-500">
                  Yes. Disabled keys stop accepting requests immediately.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Is API access included in Free Plan?
                </h3>
                <p className="text-sm text-gray-500">
                  No. API access requires a separate subscription.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can I cancel anytime?
                </h3>
                <p className="text-sm text-gray-500">
                  Yes. There is no long-term contract.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}