import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";

export default function Account() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("api_key") || "");
  const [plan, setPlan] = useState(localStorage.getItem("plan") || "free");
  const [usage, setUsage] = useState(null);
  const [showKey, setShowKey] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState(null);
  const [pwLoading, setPwLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [deleteStatus, setDeleteStatus] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;



  let userId = "—";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.user_id || "—";
  } catch { }

  useEffect(() => {
    fetch(`${API_URL}/usage`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setUsage(data);
        if (data.plan) { setPlan(data.plan); localStorage.setItem("plan", data.plan); }
      }).catch(() => { });

    fetch(`${API_URL}/api/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => { });

    fetch(`${API_URL}/api/key`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.api_key) { setApiKey(data.api_key); localStorage.setItem("api_key", data.api_key); }
      }).catch(() => { });
  }, []);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleChangePassword = async () => {
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
      setPwStatus({ type: "error", msg: "Please fill in all fields." });
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwStatus({ type: "error", msg: "New passwords do not match." });
      return;
    }
    if (pwForm.newPw.length < 6) {
      setPwStatus({ type: "error", msg: "Password must be at least 6 characters." });
      return;
    }
    setPwLoading(true);
    setPwStatus(null);
    try {
      const res = await fetch(`${API_URL}/change-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({
          current_password: pwForm.current,
          new_password: pwForm.newPw
        }),
      });
      const data = await res.json();
      if (data.message) {
        setPwStatus({ type: "success", msg: "✅ Password changed successfully!" });
        setPwForm({ current: "", newPw: "", confirm: "" });
      } else {
        setPwStatus({ type: "error", msg: data.error || "Failed to change password." });
      }
    } catch {
      setPwStatus({ type: "error", msg: "Server error. Please try again." });
    } finally {
      setPwLoading(false);
    }
  };

  const used = usage?.used ?? 0;
  const limit = typeof usage?.limit === "number" ? usage.limit : 50;
  const percent = Math.min((used / limit) * 100, 100);

  const getBarColor = () => {
    if (percent >= 90) return "#dc2626";
    if (percent >= 70) return "#f97316";
    return "#4f46e5";
  };

  const handleDeleteAccount = async () => {
    if (deleteStatus !== "confirm") {
      setDeleteStatus("confirm"); // first click shows confirmation
      return;
    }

    // second click — actually delete
    setDeleteStatus("deleting");
    try {
      const res = await fetch(`${API_URL}/delete-account`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.message) {
        setDeleteStatus("done");
        // Clear everything from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("api_key");
        localStorage.removeItem("plan");
        // Redirect to home after 2 seconds
        setTimeout(() => navigate("/"), 2000);
      } else {
        setDeleteStatus(null);
        alert(data.error || "Failed to delete account.");
      }
    } catch {
      setDeleteStatus(null);
      alert("Server error. Please try again.");
    }
  };


  return (
    <DashboardLayout>
      {/* Header */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>👤</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">My Account</h1>
          <p className="text-indigo-200 text-sm">Manage your profile, API key and security settings</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* ── LEFT: Profile card ── */}
        <div className="space-y-5">

          {/* Avatar + plan */}
          {/* Avatar + plan */}
          <div
            className="rounded-2xl p-6 shadow-md text-center"
            style={{
              background: "#fff",
              border: "2px solid #e0e7ff"
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold text-white mx-auto mb-4"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)"
              }}
            >
              {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h3
              className="font-extrabold text-xl mb-1"
              style={{ color: "#1e1b4b" }}
            >
              {user?.first_name || "User"}
            </h3>

            <p
              className="text-sm mb-1"
              style={{ color: "#6b7280" }}
            >
              {user?.email}
            </p>

            {user?.company_name && (
              <p
                className="text-sm mb-4"
                style={{ color: "#6b7280" }}
              >
                🏢 {user.company_name}
              </p>
            )}

            <span
              className="inline-block px-4 py-2 rounded-full text-xs font-extrabold uppercase"
              style={{
                background: plan === "pro" ? "#fff7ed" : "#e0e7ff",
                color: plan === "pro" ? "#ea580c" : "#4338ca"
              }}
            >
              {plan === "pro" ? "⭐ Pro Plan" : "✨ Free Plan"}
            </span>
          </div>


          {/* Usage summary */}
          <div className="rounded-2xl p-5 shadow-md"
            style={{ background: "#f5f3ff", border: "2px solid #c4b5fd" }}>
            <h3 className="font-extrabold mb-4 text-sm" style={{ color: "#4f46e5" }}>📈 Usage This Month</h3>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span style={{ color: "#6b7280" }}>{used} used</span>
              <span style={{ color: "#4f46e5" }}>{limit} limit</span>
            </div>
            <div className="w-full h-3 rounded-full mb-2" style={{ background: "#e0e7ff" }}>
              <div className="h-3 rounded-full transition-all"
                style={{ width: `${percent}%`, background: getBarColor() }} />
            </div>
            <p className="text-xs" style={{ color: "#6b7280" }}>
              {limit - used} predictions remaining
            </p>
            {plan === "free" && (
              <Link to="/pricing"
                className="mt-3 block text-center text-xs font-extrabold py-2 rounded-lg"
                style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#fff" }}>
                Upgrade to Pro →
              </Link>
            )}
          </div>

          {/* Account info */}
          <div className="rounded-2xl p-5 shadow-md"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h3 className="font-extrabold mb-4 text-sm" style={{ color: "#1e1b4b" }}>📋 Account Info</h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  label: "Plan",
                  value: plan.charAt(0).toUpperCase() + plan.slice(1),
                  icon: "💎"
                },
                {
                  label: "Company",
                  value: user?.company_name || "-",
                  icon: "🏢"
                },
                {
                  label: "Phone",
                  value: user?.phone || "-",
                  icon: "📱"
                },
                {
                  label: "Email Verified",
                  value: "Yes ✅",
                  icon: "📧"
                },
                {
                  label: "API Access",
                  value: plan === "pro" ? "Enabled ✅" : "Upgrade Required 🔒",
                  icon: "⚡"
                }
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1"
                  style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ color: "#6b7280" }}>{item.icon} {item.label}</span>
                  <span className="font-bold text-xs" style={{ color: "#1e1b4b" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Main content ── */}
        <div className="md:col-span-2 space-y-6">

          API Key
          <div className="rounded-2xl p-6 shadow-md"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h2 className="font-extrabold text-lg mb-5" style={{ color: "#1e1b4b" }}>🔑 Your API Key</h2>

            <div className="rounded-xl p-4 flex items-center gap-3 mb-3"
              style={{ background: "#f5f3ff", border: "2px solid #c4b5fd" }}>
              <span className="flex-1 font-mono text-sm truncate" style={{ color: "#4f46e5" }}>
                {apiKey
                  ? showKey
                    ? apiKey
                    : "•".repeat(36)
                  : "Upgrade to Pro to get API Access"}
              </span>
              {apiKey && (
                <>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0"
                    style={{ background: "#e0e7ff", color: "#4338ca" }}
                  >
                    {showKey ? "🙈 Hide" : "👁️ Show"}
                  </button>

                  <button
                    onClick={copyKey}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0 transition-all"
                    style={{
                      background: keyCopied ? "#dcfce7" : "#e0e7ff",
                      color: keyCopied ? "#16a34a" : "#4338ca"
                    }}
                  >
                    {keyCopied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </>
              )}
            </div>
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              🔒 Keep this key secret. Never share it publicly or commit to version control.
            </p>

            <div className="mt-4 flex gap-3">
              <Link to="/api-access"
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: "#e0e7ff", color: "#4338ca" }}>
                🔑 Manage API Key
              </Link>
              <Link to="/api"
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={{ background: "#fff7ed", color: "#ea580c" }}>
                ⚡ Integration Guide
              </Link>
            </div>
          </div>

          {/* Plan details */}
          <div className="rounded-2xl p-6 shadow-md"
            style={{ background: plan === "pro" ? "#fff7ed" : "#f5f3ff", border: `2px solid ${plan === "pro" ? "#fed7aa" : "#c4b5fd"}` }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-lg" style={{ color: plan === "pro" ? "#c2410c" : "#4f46e5" }}>
                {plan === "pro" ? "⭐ Pro Plan" : "✨ Free Plan"}
              </h2>
              {plan === "free" && (
                <Link to="/pricing"
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                  Upgrade →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Predictions", value: plan === "pro" ? "5,000" : "50", icon: "🤖" },
                { label: "CSV Upload", value: "✅ Yes", icon: "📁" },
                { label: "API Access", value: " NO", icon: "⚡" },
                { label: "Support", value: plan === "pro" ? "Priority" : "Basic", icon: "💬" },
              ].map(item => (
                <div key={item.label} className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "#6b7280" }}>{item.label}</div>
                  <div className="text-sm font-extrabold" style={{ color: plan === "pro" ? "#c2410c" : "#4f46e5" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-2xl p-6 shadow-md"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h2 className="font-extrabold text-lg mb-5" style={{ color: "#1e1b4b" }}>🔐 Change Password</h2>

            <div className="space-y-4">
              {[
                { label: "Current Password", key: "current", placeholder: "Enter current password" },
                { label: "New Password", key: "newPw", placeholder: "Enter new password (min 6 chars)" },
                { label: "Confirm New Password", key: "confirm", placeholder: "Re-enter new password" },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                    style={{ color: "#6b7280" }}>{field.label}</label>
                  <input
                    type="password"
                    placeholder={field.placeholder}
                    value={pwForm[field.key]}
                    onChange={e => setPwForm({ ...pwForm, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    style={{ background: "#f5f3ff", border: "2px solid #e0e7ff", color: "#1e1b4b" }}
                  />
                </div>
              ))}

              {pwStatus && (
                <div className="px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: pwStatus.type === "success" ? "#dcfce7" : "#fee2e2",
                    color: pwStatus.type === "success" ? "#16a34a" : "#dc2626",
                    border: `1px solid ${pwStatus.type === "success" ? "#86efac" : "#fca5a5"}`
                  }}>
                  {pwStatus.msg}
                </div>
              )}

              <button
                onClick={handleChangePassword}
                disabled={pwLoading}
                className="w-full py-3.5 rounded-xl font-extrabold text-white text-sm transition-all hover:scale-105 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 4px 16px rgba(79,70,229,0.35)"
                }}>
                {pwLoading ? "⏳ Changing..." : "🔐 Change Password"}
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl p-6 shadow-md"
            style={{ background: "#fff5f5", border: "2px solid #fecaca" }}>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: "#dc2626" }}>
              ⚠️ Danger Zone
            </h2>
            <p className="text-sm mb-5" style={{ color: "#7f1d1d" }}>
              Once you delete your account, all your data, predictions, and API keys
              will be permanently removed. This action cannot be undone.
            </p>

            {/* Step 1 — initial button */}
            {!deleteStatus && (
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#fee2e2", color: "#dc2626", border: "2px solid #fca5a5" }}>
                🗑️ Delete My Account
              </button>
            )}

            {/* Step 2 — confirmation */}
            {deleteStatus === "confirm" && (
              <div className="rounded-xl p-4"
                style={{ background: "#fee2e2", border: "2px solid #fca5a5" }}>
                <p className="font-bold text-sm mb-4" style={{ color: "#dc2626" }}>
                  ⚠️ Are you absolutely sure? This cannot be undone!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-5 py-2.5 rounded-xl font-extrabold text-sm text-white transition-all hover:scale-105"
                    style={{ background: "#dc2626", boxShadow: "0 4px 12px rgba(220,38,38,0.4)" }}>
                    ✓ Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setDeleteStatus(null)}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                    style={{ background: "#e0e7ff", color: "#4338ca" }}>
                    ✗ Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — deleting spinner */}
            {deleteStatus === "deleting" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "#fee2e2" }}>
                <div className="text-xl animate-spin">⏳</div>
                <span className="font-bold text-sm" style={{ color: "#dc2626" }}>
                  Deleting your account...
                </span>
              </div>
            )}

            {/* Step 4 — success */}
            {deleteStatus === "done" && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "#dcfce7", border: "2px solid #86efac" }}>
                <div className="text-xl">✅</div>
                <span className="font-bold text-sm" style={{ color: "#16a34a" }}>
                  Account deleted. Redirecting you...
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}