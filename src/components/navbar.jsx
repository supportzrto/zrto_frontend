import { useNavigate, useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": { title: "Dashboard", icon: "📊" },
  "/predict": { title: "Predict Orders", icon: "🤖" },
  "/pricing": { title: "Pricing", icon: "💎" },
  "/history": { title: "Prediction History", icon: "📋" },
  "/api-access": { title: "API Access", icon: "🔑" },
  "/usage": { title: "Usage", icon: "📈" },
  "/api": { title: "API Integration", icon: "⚡" },
  "/account": { title: "Account", icon: "👤" },
  "/admin": { title: "Admin Dashboard", icon: "🛡️" },
};

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: "Dashboard", icon: "📊" };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("api_key");
    localStorage.removeItem("plan");
    navigate("/login");
  };

  return (
    <div
      className="flex items-center justify-between px-6 py-4 sticky top-0 z-40"
      style={{ background: "#fff", borderBottom: "2px solid #e0e7ff", boxShadow: "0 2px 12px rgba(79,70,229,0.06)" }}
    >
      {/* Page title */}
      <div className="flex items-center gap-3">
        <span className="text-xl">{page.icon}</span>
        <h2 className="font-extrabold text-lg" style={{ color: "#1e1b4b" }}>{page.title}</h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Plan badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: "#e0e7ff", color: "#4338ca" }}>
          ✨ Free Plan
        </div>

        {/* User avatar */}
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm text-white"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
          U
        </div>

        <div>
          Plan: {user?.plan || "free"}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style={{ background: "#fee2e2", color: "#dc2626" }}
          onMouseEnter={e => e.currentTarget.style.background = "#fecaca"}
          onMouseLeave={e => e.currentTarget.style.background = "#fee2e2"}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}