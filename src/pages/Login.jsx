import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.message === "Login successful") {
        alert("Login success");

        localStorage.clear();

        localStorage.setItem("role", data.role || "user");


        localStorage.setItem("plan", data.plan || "free");


        if (data.token) {
          localStorage.setItem("token", data.token);
        }


        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
        }


        navigate("/dashboard");
      } else {
        alert(data.detail || data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex min-h-screen"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8e0ff 100%)" }}>


      <div className="hidden md:flex flex-col justify-center px-16 flex-1"
        style={{ background: "linear-gradient(135deg, #1a1a6e, #4f46e5, #7c3aed)" }}>

        <div className="flex items-center gap-3 mb-10">
          <span className="text-4xl">🛡️</span>
          <span className="font-extrabold text-2xl text-white">
            RTO Shield <span style={{ color: "#fb923c" }}>AI</span>
          </span>
        </div>

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
          <p className="text-indigo-100 text-sm leading-relaxed mb-3">
            "RTO Shield AI helped us reduce COD returns by 65% in the first month. Absolutely worth it!"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold text-white"
              style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}>R</div>
            <div>
              <div className="text-white text-xs font-bold">Rahul S.</div>
              <div className="text-indigo-300 text-xs">D2C Fashion Brand, Mumbai</div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-center flex-1 px-6 py-12">
        <div className="w-full max-w-md">


          <div className="flex items-center gap-2 justify-center mb-8 md:hidden">
            <span className="text-3xl">🛡️</span>
            <span className="font-extrabold text-xl" style={{ color: "#1e1b4b" }}>
              ZRTO <span style={{ color: "#f97316" }}>AI</span>
            </span>
          </div>

          <div className="rounded-3xl p-8 shadow-2xl"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}>

            <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#1e1b4b" }}>
              Login to Dashboard
            </h2>
            <p className="text-sm mb-7" style={{ color: "#6b7280" }}>
              Enter your credentials to access your account.
            </p>

            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                style={{ color: "#6b7280" }}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@yourbrand.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={{ background: "#f5f3ff", border: "2px solid #e0e7ff", color: "#1e1b4b" }}
                onFocus={e => e.target.style.borderColor = "#4f46e5"}
                onBlur={e => e.target.style.borderColor = "#e0e7ff"}
              />
            </div>

            <div className="mb-6 relative">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "#6b7280" }}>
                  Password
                </label>

     
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs font-bold cursor-pointer"
                  style={{ color: "#4f46e5" }}
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
                style={{
                  background: "#f5f3ff",
                  border: "2px solid #e0e7ff",
                  color: "#1e1b4b"
                }}
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
                background: loading
                  ? "#a5b4fc"
                  : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: loading ? "none" : "0 4px 16px rgba(79,70,229,0.35)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {loading ? "⏳ Logging in..." : "Login to Dashboard →"}
            </button>


            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: "#e0e7ff" }} />
              <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>OR</span>
              <div className="flex-1 h-px" style={{ background: "#e0e7ff" }} />
            </div>


            <div className="rounded-xl p-4 text-center"
              style={{ background: "#f5f3ff", border: "2px solid #e0e7ff" }}>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Don't have an account?{" "}
                <Link to="/register" className="font-extrabold"
                  style={{ color: "#4f46e5" }}>
                  Create Free Account →
                </Link>
              </p>
              <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                50 free predictions. No credit card required.
              </p>
            </div>

          </div>


          <div className="text-center mt-5">
            <Link to="/" className="text-xs font-semibold"
              style={{ color: "#6b7280" }}>
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}