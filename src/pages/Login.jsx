import { useState } from "react";
import { API_URL } from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useToast } from "../components/Toast.jsx";
import { TESTIMONIALS } from "../config/siteContent";
import { brand, inputStyle, focusBorder, blurBorder } from "../config/theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const loginUser = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.message === "Login successful") {
        localStorage.clear();

        localStorage.setItem("role", data.role || "user");


        localStorage.setItem("plan", data.plan || "free");


        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
        }


        navigate("/dashboard");
      } else {
        toast.error(data.detail || data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex min-h-screen"
      style={{ background: brand.pageGradient }}>


      <div className="hidden md:flex flex-col justify-center px-16 flex-1"
        style={{ background: brand.panelGradient }}>

        <div className="mb-10"><Logo size={44} /></div>

        <h2 className="text-4xl font-extrabold text-white leading-tight mb-5">
          Welcome Back!
        </h2>
        <p className="text-indigo-200 leading-relaxed mb-10">
          Log in to your dashboard and keep protecting your COD orders from RTO losses.
        </p>

        <div className="space-y-4">
          {[
            { icon: "📊", text: "View your prediction history and savings" },
            { icon: "🤖", text: "Upload new orders for AI risk scoring" },
            { icon: "🔑", text: "Manage your API key and integrations" },
            { icon: "💎", text: "Upgrade your plan anytime" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-indigo-200 text-sm">{item.text}</span>
            </div>
          ))}
        </div>


        <div className="mt-12 rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
          {TESTIMONIALS.length > 0 ? (
            <>
              <p className="text-indigo-100 text-sm leading-relaxed mb-3">“{TESTIMONIALS[0].quote}”</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold text-white"
                  style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})` }}>{TESTIMONIALS[0].name[0]}</div>
                <div>
                  <div className="text-white text-xs font-bold">{TESTIMONIALS[0].name}</div>
                  <div className="text-indigo-300 text-xs">{[TESTIMONIALS[0].role, TESTIMONIALS[0].company].filter(Boolean).join(", ")}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Every COD order gets one outcome</p>
              {[
                ["#4ade80", "Low risk", "Allow"],
                ["#fbbf24", "Medium risk", "Verify on WhatsApp"],
                ["#f87171", "High risk", "Block or go prepaid"],
              ].map(([c, tag, act]) => (
                <div key={tag} className="flex items-center justify-between text-sm py-1.5">
                  <span className="flex items-center gap-2 text-indigo-200"><span className="w-2 h-2 rounded-full" style={{ background: c }} />{tag}</span>
                  <span className="text-white font-semibold">{act}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>


      <div className="flex items-center justify-center flex-1 px-6 py-12">
        <div className="w-full max-w-md">


          <div className="flex justify-center mb-8 md:hidden"><Logo size={36} dark /></div>

          <div className="rounded-3xl p-8 shadow-2xl"
            style={{ background: "#fff", border: `2px solid ${brand.border}` }}>

            <h2 className="text-2xl font-extrabold mb-1" style={{ color: brand.ink }}>
              Login to Dashboard
            </h2>
            <p className="text-sm mb-5" style={{ color: brand.muted }}>
              Enter your credentials to access your account.
            </p>




            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                style={{ color: brand.muted }}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@yourbrand.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && loginUser()}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={{ background: brand.surface, border: `2px solid ${brand.border}`, color: brand.ink }}
                onFocus={e => focusBorder(e)}
                onBlur={e => blurBorder(e)}
              />
            </div>

            <div className="mb-6 relative">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: brand.muted }}>
                  Password
                </label>

     
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs font-bold cursor-pointer"
                  style={{ color: brand.primary }}
                >
                  Forgot?
                </span>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm focus:outline-none"
                style={inputStyle}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] cursor-pointer text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>


            <button
              onClick={loginUser}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all mb-5"
              style={{
                background: loading ? brand.disabled : brand.gradient,
                boxShadow: loading ? "none" : "0 4px 16px rgba(79,70,229,0.35)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {loading ? "⏳ Logging in..." : "Login to Dashboard →"}
            </button>


            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: brand.border }} />
              <span className="text-xs font-semibold" style={{ color: brand.faint }}>OR</span>
              <div className="flex-1 h-px" style={{ background: brand.border }} />
            </div>


            <div className="rounded-xl p-4 text-center"
              style={{ background: brand.surface, border: `2px solid ${brand.border}` }}>
              <p className="text-sm" style={{ color: brand.muted }}>
                Don't have an account?{" "}
                <Link to="/register" className="font-extrabold"
                  style={{ color: brand.primary }}>
                  Create Free Account →
                </Link>
              </p>
              <p className="text-xs mt-1" style={{ color: brand.faint }}>
                50 free predictions. No credit card required.
              </p>
            </div>

          </div>


          <div className="text-center mt-5">
            <Link to="/" className="text-xs font-semibold"
              style={{ color: brand.muted }}>
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}