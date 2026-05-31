import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const plan = localStorage.getItem("plan") || "free";

  const downloadFile = async (filePath) => {
  try {
    const res = await fetch(`https://zrtobackend-production.up.railway.app/download/${encodeURIComponent(filePath)}`, {
      credentials: "include"
    });

    if (!res.ok) {
      alert("Download failed or unauthorized");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop();
    a.click();
  } catch (err) {
    console.error(err);
    alert("Error downloading file");
  }
};

  useEffect(() => {
    fetch("https://zrtobackend-production.up.railway.app/api/prediction-history", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setHistory(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const totalSaved = history.reduce((sum, item) => sum + (item.potential_savings || 0), 0);
  const totalOrders = history.reduce((sum, item) => sum + (item.total_orders || 0), 0);

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          boxShadow: "0 8px 32px rgba(79,70,229,0.25)"
        }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>📋</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Prediction History</h1>
          <p className="text-indigo-200 text-sm">All your past CSV prediction runs and results</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Batches", value: history.length, icon: "📋", color: "#4f46e5", bg: "#e0e7ff" },
          { label: "Total Orders Analyzed", value: totalOrders.toLocaleString("en-IN"), icon: "📦", color: "#7c3aed", bg: "#ede9fe" },
          { label: "Total Savings", value: `₹${totalSaved.toLocaleString("en-IN")}`, icon: "💰", color: "#16a34a", bg: "#dcfce7" },
        ].map(card => (
          <div key={card.label} className="rounded-2xl p-5 shadow-md"
            style={{ background: card.bg, border: `2px solid ${card.color}25` }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${card.color}20` }}>{card.icon}</div>
              <span className="text-xs font-semibold text-gray-500">{card.label}</span>
            </div>
            <div className="text-2xl font-extrabold" style={{ color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="relative rounded-2xl shadow-md overflow-hidden"
        style={{ background: "#fff", border: "2px solid #e0e7ff" }}>

        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "2px solid #e0e7ff" }}>
          <h2 className="font-extrabold text-indigo-900">All Prediction Runs</h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: "#e0e7ff", color: "#4338ca" }}>
            {history.length} records
          </span>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="text-4xl mb-3 animate-spin">⏳</div>
            <p className="text-gray-500">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-extrabold text-lg mb-2 text-indigo-900">
              No predictions yet
            </h3>
            <p className="text-sm text-gray-500">
              Upload a CSV on the Predict Orders page to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#f8f7ff", borderBottom: "2px solid #e0e7ff" }}>
                  {["Date & Time", "Total Orders", "Risky", "Verify", "Safe", "Savings", "Action"].map(h => (
                    <th key={h} className="py-3 px-5 text-left font-extrabold text-xs uppercase tracking-wide text-indigo-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {history.map((item, index) => {
                  const isBlurred = plan === "free" && index >= 2;

                  return (
                    <tr key={index}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        filter: isBlurred ? "blur(4px)" : "none",
                        pointerEvents: isBlurred ? "none" : "auto",
                        opacity: isBlurred ? 0.6 : 1
                      }}>
                      <td className="py-4 px-5 font-semibold">
                        {formatDate(item.created_at)}
                      </td>

                      <td className="py-4 px-5 font-bold text-indigo-600">
                        {item.total_orders}
                      </td>

                      <td className="py-4 px-5 text-red-600 font-bold">
                        {item.risky_orders}
                      </td>

                      <td className="py-4 px-5 text-yellow-600 font-bold">
                        {item.verify_orders}
                      </td>

                      <td className="py-4 px-5 text-green-600 font-bold">
                        {item.safe_orders}
                      </td>

                      <td className="py-4 px-5 font-extrabold text-green-600">
                        ₹{Number(item.potential_savings || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="py-4 px-5">
                        <button
                          onClick={() => downloadFile(item.file_id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                          style={{ background: "#4f46e5" }}
                        >
                          ⬇️ Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 🔥 UPGRADE OVERLAY */}
        {plan === "free" && history.length > 2 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(6px)"
            }}>

            <div className="text-5xl mb-3">🔒</div>

            <h2 className="text-xl font-extrabold mb-2 text-red-600">
              Unlock Full History
            </h2>

            <p className="text-sm mb-4 max-w-sm text-gray-500">
              Upgrade to Pro to access complete prediction history, downloads, and analytics.
            </p>

            <button
              onClick={() => window.location.href = "/pricing"}
              className="px-5 py-2 rounded-xl font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #f97316, #fb923c)"
              }}
            >
              🚀 Upgrade to Pro
            </button>

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}