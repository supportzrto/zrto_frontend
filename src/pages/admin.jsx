import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [leads, setLeads] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [statsRes, usersRes, paymentsRes, leadsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, { credentials: "include" }),
          fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, { credentials: "include" }),
          fetch(`${import.meta.env.VITE_API_URL}/api/admin/payments`, { credentials: "include" }),
          fetch(`${import.meta.env.VITE_API_URL}/api/admin/leads`, { credentials: "include" }),
        ]);



        if (statsRes.status === 403) {
          setStats(null);
          setLoading(false);
          return;
        }

        setStats(await statsRes.json());
        setUsers(await usersRes.json());
        setPayments(await paymentsRes.json());
        setLeads(await leadsRes.json());

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">Loading admin data...</div>
      </DashboardLayout>
    );
  }

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-red-500 font-bold">
          Failed to load admin data
        </div>
      </DashboardLayout>
    );
  }



  return (
    <DashboardLayout>
      {/* Header */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", boxShadow: "0 8px 32px rgba(220,38,38,0.25)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>🛡️</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-red-200 text-sm">Platform-wide analytics and management</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl p-6 animate-pulse" style={{ background: "#e0e7ff", height: "140px" }} />
          ))}
        </div>
      ) : (
        <>
          {/* Main stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Total Users", value: stats?.total_users ?? 0, icon: "👥", color: "#4f46e5", bg: "#e0e7ff", trend: "+12%" },
              { label: "Total Predictions", value: (stats?.total_predictions ?? 0).toLocaleString("en-IN"), icon: "🤖", color: "#7c3aed", bg: "#ede9fe", trend: "+28%" },
              { label: "Total Savings Generated", value: `₹${Number(stats?.total_savings ?? 0).toLocaleString("en-IN")}`, icon: "💰", color: "#16a34a", bg: "#dcfce7", trend: "+35%" },
            ].map(card => (
              <div key={card.label} className="rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform"
                style={{ background: card.bg, border: `2px solid ${card.color}25` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${card.color}20` }}>{card.icon}</div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#dcfce7", color: "#16a34a" }}>{card.trend}</span>
                </div>
                <div className="text-xs font-semibold mb-1" style={{ color: "#6b7280" }}>{card.label}</div>
                <div className="text-3xl font-extrabold" style={{ color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Extra stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Free Plan Users", value: Math.floor((stats?.total_users ?? 0) * 0.7), icon: "✨", color: "#4f46e5", bg: "#f5f3ff" },
              { label: "Pro Plan Users", value: Math.floor((stats?.total_users ?? 0) * 0.3), icon: "⭐", color: "#ea580c", bg: "#fff7ed" },
              { label: "Avg Predictions/User", value: stats?.total_users ? Math.floor((stats?.total_predictions ?? 0) / stats.total_users) : 0, icon: "📊", color: "#0891b2", bg: "#ecfeff" },
              { label: "Avg Savings/User", value: `₹${stats?.total_users ? Math.floor((stats?.total_savings ?? 0) / stats.total_users).toLocaleString("en-IN") : 0}`, icon: "💵", color: "#16a34a", bg: "#f0fdf4" },
            ].map(card => (
              <div key={card.label} className="rounded-2xl p-5 shadow-md" style={{ background: card.bg, border: `2px solid ${card.color}20` }}>
                <div className="text-xl mb-2">{card.icon}</div>
                <div className="text-xs font-semibold mb-1" style={{ color: "#6b7280" }}>{card.label}</div>
                <div className="text-xl font-extrabold" style={{ color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Platform health */}
          <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h2 className="font-extrabold text-lg mb-5" style={{ color: "#1e1b4b" }}>🌐 Platform Health</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: "API Uptime", value: "99.9%", color: "#16a34a", bg: "#dcfce7" },
                { label: "Avg Response Time", value: "120ms", color: "#4f46e5", bg: "#e0e7ff" },
                { label: "Error Rate", value: "0.1%", color: "#dc2626", bg: "#fee2e2" },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-4 text-center"
                  style={{ background: item.bg, border: `2px solid ${item.color}20` }}>
                  <div className="text-2xl font-extrabold mb-1" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-xs font-semibold" style={{ color: "#6b7280" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-3">👥 Users</h2>
            <table className="w-full text-sm bg-white rounded-xl shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Email</th>
                  <th className="p-2">Plan</th>
                  <th className="p-2">Usage</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-t text-center">
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.plan}</td>
                    <td className="p-2">{u.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-3">💰 Payments</h2>
            <table className="w-full text-sm bg-white rounded-xl shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">User</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={i} className="border-t text-center">
                    <td className="p-2">{p.user_id}</td>
                    <td className="p-2">₹{p.amount}</td>
                    <td className="p-2">
                      {p.date ? new Date(p.date).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br></br>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">🚀 Early Access Leads</h2>
            <button
              onClick={() => {
                window.open(
                  `${import.meta.env.VITE_API_URL}/api/admin/export-leads`,
                  "_blank"
                );
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Export to Excel 📥
            </button>
          </div>
          <div className="mt-10 mb-10">
            <h2 className="font-bold text-lg mb-3">🚀 Early Access Leads</h2>
            <table className="w-full text-sm bg-white rounded-xl shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Orders</th>
                  <th className="p-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} className="border-t text-center">
                    <td className="p-2">{l.name}</td>
                    <td className="p-2">{l.email}</td>
                    <td className="p-2">{l.brand}</td>
                    <td className="p-2">{l.orders}</td>
                    <td className="p-2">{l.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}