import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ background: "linear-gradient(135deg, #1a1a6e 0%, #2d2d9b 40%, #4f46e5 100%)", borderBottom: "1px solid rgba(255,255,255,0.1)" }} className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="font-extrabold text-xl text-white tracking-tight">
            Z<span style={{ color: "#fb923c" }}>RTO</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-2">
          {[
            { label: "Home", path: "/" },
            { label: "Pricing", path: "/pricing" },
            { label: "About US", path: "/about" },
            { label: "Contact US", path: "/contact" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                color: isActive(item.path) ? "#fff" : "#c7d2fe",
                background: isActive(item.path) ? "rgba(255,255,255,0.15)" : "transparent",
              }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.target.style.background = isActive(item.path) ? "rgba(255,255,255,0.15)" : "transparent"}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
            style={{ color: "#e0e7ff", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#e0e7ff"; }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-xl text-sm font-extrabold transition-all"
            style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#fff", boxShadow: "0 4px 16px rgba(249,115,22,0.45)" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            Register Free →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {[
            { label: "Home", path: "/" },
            { label: "Pricing", path: "/pricing" },
            { label: "About US", path: "/about" },
            { label: "Contact US", path: "/contact" },
            { label: "Login", path: "/login" },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold"
              style={{ color: "#c7d2fe" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { navigate("/register"); setMenuOpen(false); }}
            className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-extrabold mt-2"
            style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#fff" }}
          >
            Register Free →
          </button>
        </div>
      )}
    </nav>
  );
}