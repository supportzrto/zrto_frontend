import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

export default function PredictOrders() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [limitError, setLimitError] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please upload a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);
    setLimitError(null);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json(); // ✅ ONLY ONCE

      if (data.error === "free_limit_reached") {
        setLimitError(data);
        return;
      }

      if (data.error === "batch_limit_exceeded") {
        setLimitError(data);
        return;
      }



      if (data.error) {
        setError(data.error);
        return;
      }

      // ✅ success
      setResult(data);

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.name.endsWith(".csv")) setFile(dropped);
    else alert("Please upload a CSV file only.");
  };

  return (
    <DashboardLayout>

      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>🤖</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Predict Orders</h1>
          <p className="text-indigo-200 text-sm">Upload your CSV to get AI-powered RTO risk predictions</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">


        <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
          <h2 className="font-extrabold text-lg mb-5" style={{ color: "#1e1b4b" }}>📁 Upload CSV File</h2>


          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("csv-input").click()}
            className="rounded-2xl p-8 text-center cursor-pointer transition-all mb-5"
            style={{
              border: `2px dashed ${dragOver ? "#4f46e5" : "#c7d2fe"}`,
              background: dragOver ? "#e0e7ff" : "#f5f3ff",
            }}
          >
            <div className="text-4xl mb-3">📂</div>
            {file ? (
              <>
                <p className="font-bold" style={{ color: "#4f46e5" }}>{file.name}</p>
                <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </>
            ) : (
              <>
                <p className="font-bold" style={{ color: "#4f46e5" }}>Drag & drop your CSV here</p>
                <p className="text-xs mt-1" style={{ color: "#6b7280" }}>or click to browse files</p>
              </>
            )}
            <input
              id="csv-input"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => { setFile(e.target.files[0]); setLimitError(null); setResult(null); }}
            />
          </div>

          <button
            onClick={uploadFile}
            disabled={loading || !file || limitError?.type === "limit_reached"}
            className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all"
            style={{
              background:
                loading || !file || limitError?.type === "limit_reached"
                  ? "#a5b4fc"
                  : "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow:
                loading || !file || limitError?.type === "limit_reached"
                  ? "none"
                  : "0 4px 16px rgba(79,70,229,0.35)",
              cursor:
                loading || !file || limitError?.type === "limit_reached"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {limitError?.type === "limit_reached"
              ? "🚫 Limit Reached"
              : loading
                ? "⏳ Processing..."
                : "🚀 Run AI Prediction"}
          </button>
        </div>


        <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff7ed", border: "2px solid #fed7aa" }}>
          <h2 className="font-extrabold text-lg mb-5" style={{ color: "#c2410c" }}>📋 How It Works</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Prepare your CSV", desc: "Export your COD orders in CSV format from your store or logistics platform." },
              { step: "2", title: "Upload the file", desc: "Drag and drop or click to upload. We accept standard CSV files." },
              { step: "3", title: "Get predictions", desc: "Our AI analyzes 15+ risk signals and returns BLOCK / VERIFY / ALLOW for each order." },
              { step: "4", title: "Download results", desc: "Download the enriched CSV with risk scores and decisions for each order." },
            ].map(item => (
              <div key={item.step} className="flex gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 text-white"
                  style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>
                  {item.step}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "#c2410c" }}>{item.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "#78350f" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {limitError && (
        <div className="mb-8 rounded-2xl p-7"
          style={{ background: "#fff7ed", border: "2px solid #fed7aa", boxShadow: "0 4px 16px rgba(249,115,22,0.15)" }}>

          <div className="text-4xl mb-4">🚫</div>

          <h3 className="font-extrabold text-xl mb-2" style={{ color: "#c2410c" }}>
            {limitError.type === "free_limit_reached"
              ? "Free Plan Limit Reached"
              : "File Too Large for Your Remaining Quota"}
          </h3>

          <p className="text-sm mb-5 leading-relaxed" style={{ color: "#78350f" }}>
            {limitError.message}
          </p>


          <div className="flex flex-wrap gap-4 mb-6">
            <div className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>
              <span style={{ color: "#6b7280" }}>Used: </span>
              <strong style={{ color: "#dc2626" }}>{limitError.used}</strong>
              <span style={{ color: "#6b7280" }}> / {limitError.limit}</span>
            </div>

            {limitError.remaining !== undefined && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "#fef3c7", border: "1px solid #fde68a" }}>
                <span style={{ color: "#6b7280" }}>Remaining: </span>
                <strong style={{ color: "#d97706" }}>{limitError.remaining} predictions</strong>
              </div>
            )}

            {limitError.fileHas !== undefined && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>
                <span style={{ color: "#6b7280" }}>Your file has: </span>
                <strong style={{ color: "#dc2626" }}>{limitError.fileHas} orders</strong>
              </div>
            )}
          </div>


          <div className="rounded-xl p-4 mb-5"
            style={{ background: "rgba(249,115,22,0.08)", border: "1px solid #fdba74" }}>
            <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#ea580c" }}>
              Pro Plan includes:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                "✅ 5,000 predictions/month",
                "✅ Unlimited CSV uploads",
                "✅ Full API integration",
                "✅ Priority support",
              ].map(f => (
                <span key={f} className="text-xs font-semibold" style={{ color: "#78350f" }}>{f}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/pricing"
              className="inline-block px-7 py-3.5 rounded-xl font-extrabold text-white text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f97316, #fb923c)",
                boxShadow: "0 4px 16px rgba(249,115,22,0.4)"
              }}>
              🚀 Upgrade to Pro — ₹999/month
            </Link>
            <button
              onClick={() => setLimitError(null)}
              className="px-5 py-3.5 rounded-xl font-bold text-sm"
              style={{ background: "#e0e7ff", color: "#4338ca" }}>
              ← Try a smaller file
            </button>
          </div>
        </div>
      )}


      {result && (
        <div>
          <h2 className="font-extrabold text-xl mb-5" style={{ color: "#1e1b4b" }}>
            📊 Prediction Results
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Orders", value: result.total_orders, icon: "📦", color: "#4f46e5", bg: "#e0e7ff" },
              { label: "Risky Orders", value: result.risky_orders, icon: "🚨", color: "#dc2626", bg: "#fee2e2" },
              { label: "Need Verify", value: result.verify_orders, icon: "⚠️", color: "#d97706", bg: "#fef3c7" },
              { label: "Safe Orders", value: result.safe_orders, icon: "✅", color: "#16a34a", bg: "#dcfce7" },
              { label: "Potential Savings", value: `₹${Number(result.potential_savings).toLocaleString("en-IN")}`, icon: "💰", color: "#0891b2", bg: "#cffafe" },
            ].map(card => (
              <div key={card.label}
                className="rounded-2xl p-5 shadow-md hover:-translate-y-1 transition-transform"
                style={{ background: card.bg, border: `2px solid ${card.color}25` }}>
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: "#6b7280" }}>{card.label}</div>
                <div className="text-2xl font-extrabold" style={{ color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>


          <div className="rounded-2xl p-6 mb-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h3 className="font-extrabold mb-4" style={{ color: "#1e1b4b" }}>Risk Breakdown</h3>
            <div className="flex rounded-full overflow-hidden h-6 mb-3">
              <div style={{ width: `${(result.risky_orders / result.total_orders) * 100}%`, background: "#dc2626" }} />
              <div style={{ width: `${(result.verify_orders / result.total_orders) * 100}%`, background: "#f59e0b" }} />
              <div style={{ width: `${(result.safe_orders / result.total_orders) * 100}%`, background: "#16a34a" }} />
            </div>
            <div className="flex gap-6 text-xs font-semibold">
              {[
                { label: "Risky", color: "#dc2626" },
                { label: "Verify", color: "#f59e0b" },
                { label: "Safe", color: "#16a34a" },
              ].map(l => (
                <span key={l.label} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: l.color }} />
                  <span style={{ color: "#6b7280" }}>{l.label}</span>
                </span>
              ))}
            </div>
          </div>

          <a
            href={`https://zrtobackend-production.up.railway.app${result.download_url}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              boxShadow: "0 4px 16px rgba(22,163,74,0.35)",
              textDecoration: "none"
            }}>
            ⬇️ Download Results CSV
          </a>
        </div>
      )}

    </DashboardLayout>
  );
}