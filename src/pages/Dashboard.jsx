import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import MetricCard from "../components/metriccard";
import UsageBar from "../components/usagebar";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [usage, setUsage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const plan = user?.plan || "free";

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, usageRes] = await Promise.all([
          fetch(`${API_URL}/api/stats`, {
            credentials: "include",
          }),
          fetch(`${API_URL}/usage`, {
            credentials: "include",
          }),
        ]);


        if (statsRes.status === 401 || usageRes.status === 401) {
          window.location.href = "/login";
          return;
        }

        const statsData = await statsRes.json();
        const usageData = await usageRes.json();

        setStats(statsData);
        setUsage(usageData);


      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }

    async function loadUser() {
      try {
        const response = await fetch(`${API_URL}/api/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await response.json();
        setUser(data);

      } catch (err) {
        console.error("User load error:", err);
      }
    }

    loadData();
    loadUser();
  }, []);

  return (
    <DashboardLayout>

      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 mb-8 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}
      >
        <div>
          <h1 className="text-2xl font-extrabold text-white mb-1">
            Welcome back, {user?.first_name || "User"}! 👋
          </h1>

          {user?.company_name && (
            <p className="text-indigo-200 text-sm mb-1">
              {user.company_name}
            </p>
          )}

          <p className="text-indigo-200 text-sm">
            Here's what's happening with your COD orders today.
          </p>
    
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-1">Current Plan</div>
            <div className="text-xs text-indigo-200 mt-1">
              Expires on: {user?.expiry ? new Date(user.expiry).toLocaleDateString() : "—"}
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: "rgba(255,255,255,0.15)" }}>
            🛡️
          </div>
        </div>
      </div>

      {/* Metric cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl p-6 animate-pulse" style={{ background: "#e0e7ff", height: "140px" }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Predictions"
            value={stats?.total_predictions ?? 0}
            icon="🤖"
            color="#4f46e5"
            bg="#f5f3ff"
          />
          <MetricCard
            title="Risky Orders"
            value={stats?.risky_orders ?? 0}
            icon="⚠️"
            color="#dc2626"
            bg="#fff5f5"
          />
          <MetricCard
            title="Potential Savings"
            value={`₹${((stats?.risky_orders ?? 0) * 200).toLocaleString("en-IN")}`}
            icon="💰"
            color="#16a34a"
            bg="#f0fdf4"
          />
        </div>
      )}

      {/* Second row */}
      {!loading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard
            title="Verified Orders"
            value={stats?.verify_orders ?? 0}
            icon="✅"
            color="#0891b2"
            bg="#ecfeff"
          />
          <MetricCard
            title="Safe Orders"
            value={stats?.safe_orders ?? 0}
            icon="📦"
            color="#7c3aed"
            bg="#faf5ff"
          />
        </div>
      )}

      {/* Usage bar */}
      {usage && (
        <UsageBar used={usage.used} limit={typeof usage.limit === "number" ? usage.limit : 50} />
      )}

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "🤖", title: "Predict New Orders", desc: "Upload a CSV to get risk scores", link: "/predict", color: "#4f46e5", bg: "#e0e7ff" },
          { icon: "📋", title: "View History", desc: "See all past predictions", link: "/history", color: "#7c3aed", bg: "#ede9fe" },
          { icon: "🔑", title: "API Access", desc: "Integrate with your store", link: "/api-access", color: "#ea580c", bg: "#ffedd5" },
        ].map(action => (
          <a
            key={action.title}
            href={action.link}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: action.bg, border: `2px solid ${action.color}25`, textDecoration: "none" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${action.color}20` }}>
              {action.icon}
            </div>
            <div>
              <div className="font-extrabold text-sm" style={{ color: action.color }}>{action.title}</div>
              <div className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{action.desc}</div>
            </div>
          </a>
        ))}
      </div>

    </DashboardLayout>
  );
}