import { useState } from "react";
import { API_URL } from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../components/Toast.jsx";
import { brand, inputStyle, focusBorder, blurBorder } from "../config/theme";

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
  const toast = useToast();

  const registerUser = async () => {
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
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
        toast.error(data.error || "Registration failed");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4"
        style={{ background: brand.pageGradient }}>
        <div className="rounded-3xl p-10 text-center shadow-2xl w-full max-w-md"
          style={{ background: "#fff", border: `2px solid ${brand.border}` }}>
          <div className="text-6xl mb-5">📧</div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: brand.ink }}>
            Check Your Email!
          </h2>
          <p className="text-sm mb-2 leading-relaxed" style={{ color: brand.muted }}>
            We've sent a verification link to
          </p>
          <p className="font-extrabold mb-5 text-base" style={{ color: brand.primary }}>
            {email}
          </p>
          <p className="text-xs mb-8 leading-relaxed" style={{ color: brand.faint }}>
            Click the link in the email to activate your account.
            Didn't get it? Check your spam or junk folder.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all hover:scale-105"
            style={{
              background: brand.gradient,
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
      style={{ background: brand.pageGradient }}>

      {/* Left — branding */}
      <div className="hidden md:flex flex-col justify-center px-16 flex-1"
        style={{ background: brand.panelGradient }}>
        <div className="flex items-center gap-3 mb-10">
          <span className="text-4xl">🛡️</span>
          <span className="font-extrabold text-2xl text-white">RTO Shield <span style={{ color: brand.accentLight }}>AI</span></span>
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
            <span className="font-extrabold text-xl" style={{ color: brand.ink }}>
              ZRTO <span style={{ color: brand.accent }}>AI</span>
            </span>
          </div>

          <div className="rounded-3xl p-8 shadow-2xl"
            style={{ background: "#fff", border: `2px solid ${brand.border}` }}>

            <h2 className="text-2xl font-extrabold mb-1" style={{ color: brand.ink }}>
              Create Free Account
            </h2>
            <p className="text-sm mb-7" style={{ color: brand.muted }}>
              Start with 50 free predictions. No credit card required.
            </p>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                  style={{ color: brand.muted }}>First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                  style={{ color: brand.muted }}>Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>
                Company Name
              </label>

              <input
                type="text"
                placeholder="ABC Ecommerce Pvt Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            {/* Email */}
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
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block"
                style={{ color: brand.muted }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
                onKeyDown={e => e.key === "Enter" && registerUser()}
              />
            </div>

            {/* Submit button */}
            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all mb-5"
              style={{
                background: loading ? brand.disabled : brand.gradient,
                boxShadow: loading ? "none" : "0 4px 16px rgba(79,70,229,0.35)",
                cursor: loading ? "not-allowed" : "pointer",
                transform: loading ? "none" : undefined,
              }}
              onMouseEnter={e => { if (!loading) e.target.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
            >
              {loading ? "⏳ Creating your account..." : "Create Free Account →"}
            </button>

            <p className="text-xs text-center mb-4" style={{ color: brand.faint }}>
              By registering you agree to our Terms of Service and Privacy Policy.
            </p>

            <p className="text-sm text-center" style={{ color: brand.muted }}>
              Already have an account?{" "}
              <Link to="/login" className="font-extrabold"
                style={{ color: brand.primary }}>
                Login →
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}