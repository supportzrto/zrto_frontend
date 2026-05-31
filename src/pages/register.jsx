import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const registerUser = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://zrtobackend-production.up.railway.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          email,
          phone: phone,
          password,
        }),
      });
      const data = await res.json();

      if (data.message) {
        setSuccess(true);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4"
        style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8e0ff 100%)" }}>
        <div className="rounded-3xl p-10 text-center shadow-2xl w-full max-w-md"
          style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
          <div className="text-6xl mb-5">📧</div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: "#1e1b4b" }}>
            Check Your Email!
          </h2>
          <p className="text-sm mb-2 leading-relaxed" style={{ color: "#6b7280" }}>
            We've sent a verification link to
          </p>
          <p className="font-extrabold mb-5 text-base" style={{ color: "#4f46e5" }}>
            {email}
          </p>
          <p className="text-xs mb-8 leading-relaxed" style={{ color: "#9ca3af" }}>
            Click the link in the email to activate your account.
            Didn't get it? Check your spam or junk folder.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              boxShadow: "0 4px 16px rgba(79,70,229,0.35)"
            }}>
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  // ── Register form ──
  return (
    <div className="flex min-h-screen"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8e0ff 100%)" }}>

      {/* Left — branding */}
      <div className="hidden md:flex flex-col justify-center px-16 flex-1"
        style={{ background: "linear-gradient(135deg, #1a1a6e, #4f46e5, #7c3aed)" }}>
        <div className="flex items-center gap-3 mb-10">
          <span className="text-4xl">🛡️</span>
          <span className="font-extrabold text-2xl text-white">RTO Shield <span style={{ color: "#fb923c" }}>AI</span></span>
        </div>
        <h2 className="text-4xl font-extrabold text-white leading-tight mb-5">
          Stop Losing Money<br />on COD Orders
        </h2>
        <p className="text-indigo-200 leading-relaxed mb-10">
          Join thousands of Indian e-commerce brands using AI to predict and prevent COD return losses.
        </p>
        <div className="space-y-4">
          {[
            { icon: "✅", text: "50 free predictions — no credit card needed" },
            { icon: "🤖", text: "AI-powered risk scoring in seconds" },
            { icon: "📊", text: "CSV upload or direct API integration" },
            { icon: "💰", text: "Average ₹28,000 saved per month" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-indigo-200 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center flex-1 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 justify-center mb-8 md:hidden">
            <span className="text-3xl">🛡️</span>
            <span className="font-extrabold text-xl" style={{ color: "#1e1b4b" }}>
              ZRTO <span style={{ color: "#f97316" }}>AI</span>
            </span>
          </div>

          <div className="rounded-3xl p-8 shadow-2xl"
            style={{ background: "#fff", border: "2px solid #e0e7ff" }}>

            <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#1e1b4b" }}>
              Create Free Account
            </h2>
            <p className="text-sm mb-7" style={{ color: "#6b7280" }}>
              Start with 50 free predictions. No credit card required.
            </p>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                  style={{ color: "#6b7280" }}>First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                  style={{ background: "#f5f3ff", border: "2px solid #e0e7ff", color: "#1e1b4b" }}
                  onFocus={e => e.target.style.borderColor = "#4f46e5"}
                  onBlur={e => e.target.style.borderColor = "#e0e7ff"}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                  style={{ color: "#6b7280" }}>Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                  style={{ background: "#f5f3ff", border: "2px solid #e0e7ff", color: "#1e1b4b" }}
                  onFocus={e => e.target.style.borderColor = "#4f46e5"}
                  onBlur={e => e.target.style.borderColor = "#e0e7ff"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                COMPANY NAME
              </label>

              <input
                type="text"
                placeholder="ABC Ecommerce Pvt Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email */}
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

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                PHONE NUMBER
              </label>

              <input
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                style={{ color: "#6b7280" }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={{ background: "#f5f3ff", border: "2px solid #e0e7ff", color: "#1e1b4b" }}
                onFocus={e => e.target.style.borderColor = "#4f46e5"}
                onBlur={e => e.target.style.borderColor = "#e0e7ff"}
                onKeyDown={e => e.key === "Enter" && registerUser()}
              />
            </div>

            {/* Submit button */}
            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all mb-5"
              style={{
                background: loading
                  ? "#a5b4fc"
                  : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: loading ? "none" : "0 4px 16px rgba(79,70,229,0.35)",
                cursor: loading ? "not-allowed" : "pointer",
                transform: loading ? "none" : undefined,
              }}
              onMouseEnter={e => { if (!loading) e.target.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
            >
              {loading ? "⏳ Creating your account..." : "Create Free Account →"}
            </button>

            <p className="text-xs text-center mb-4" style={{ color: "#9ca3af" }}>
              By registering you agree to our Terms of Service and Privacy Policy.
            </p>

            <p className="text-sm text-center" style={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <Link to="/login" className="font-extrabold"
                style={{ color: "#4f46e5" }}>
                Login →
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}