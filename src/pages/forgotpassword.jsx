import { useState, useEffect } from "react";
import { API_URL } from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../components/Toast.jsx";
import { brand, inputStyle, focusBorder, blurBorder } from "../config/theme";

const STEPS = [
  { n: 1, label: "Email" },
  { n: 2, label: "Verify" },
  { n: 3, label: "Reset" },
];

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!resetDone) return;
    const timer = setTimeout(() => navigate("/login"), 1800);
    return () => clearTimeout(timer);
  }, [resetDone, navigate]);

  const sendOTP = async () => {
    if (!email) return toast.error("Enter your email");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.message) {
        setStep(2);
        toast.success("Code sent — check your inbox.");
      } else {
        toast.error(data.error || "Could not send OTP");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) return toast.error("Enter the OTP");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.message) {
        if (!data.token || data.token === "undefined") {
          toast.error("Something went wrong verifying your code. Please try again.");
          return;
        }
        localStorage.setItem("reset_token", data.token);
        setStep(3);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    const token = localStorage.getItem("reset_token");

    if (!token || token === "undefined" || token.split(".").length !== 3) {
      toast.error("Your session expired. Please restart the process.");
      setStep(1);
      return;
    }

    if (!newPassword || !confirmPassword) {
      return toast.error("Fill in both password fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, new_password: newPassword }),
      });

      const data = await res.json();

      if (data.message) {
        localStorage.removeItem("reset_token");
        setResetDone(true);
        toast.success("Password reset successfully.");
      } else {
        toast.error(data.error || "Could not reset password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{ background: brand.pageGradient }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="text-3xl">🛡️</span>
          <span className="font-extrabold text-xl" style={{ color: brand.ink }}>
            ZRTO <span style={{ color: brand.accent }}>AI</span>
          </span>
        </div>

        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: "#fff", border: `2px solid ${brand.border}` }}>
          {resetDone ? (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"
                style={{ background: brand.successBg }}
              >
                ✅
              </div>
              <h2 className="text-2xl font-extrabold mb-2" style={{ color: brand.ink }}>
                Password Reset!
              </h2>
              <p className="text-sm mb-6" style={{ color: brand.muted }}>
                Taking you to login...
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all"
                style={{ background: brand.gradient, boxShadow: "0 4px 16px rgba(79,70,229,0.35)", cursor: "pointer" }}
              >
                Continue to Login →
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-7">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all"
                      style={{
                        background: step >= s.n ? brand.gradient : brand.border,
                        color: step >= s.n ? "#fff" : brand.faint,
                      }}
                    >
                      {step > s.n ? "✓" : s.n}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-8 h-0.5" style={{ background: step > s.n ? brand.primaryDark : brand.border }} />
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-extrabold mb-1 text-center" style={{ color: brand.ink }}>
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Set New Password"}
              </h2>
              <p className="text-sm mb-7 text-center" style={{ color: brand.muted }}>
                {step === 1 && "Enter your email and we'll send you a code."}
                {step === 2 && `We've sent a code to ${email || "your email"}.`}
                {step === 3 && "Choose a new password for your account."}
              </p>

              {step === 1 && (
                <>
                  <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@yourbrand.com"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none mb-6"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendOTP()}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />

                  <button
                    onClick={sendOTP}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all"
                    style={{
                      background: loading ? brand.disabled : brand.gradient,
                      boxShadow: loading ? "none" : "0 4px 16px rgba(79,70,229,0.35)",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "⏳ Sending..." : "Send OTP →"}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>
                    One-Time Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 rounded-xl text-sm text-center tracking-[0.4em] font-bold focus:outline-none mb-4"
                    style={inputStyle}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && verifyOTP()}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />

                  <button
                    onClick={verifyOTP}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all mb-3"
                    style={{
                      background: loading ? brand.disabled : brand.gradient,
                      boxShadow: loading ? "none" : "0 4px 16px rgba(79,70,229,0.35)",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "⏳ Verifying..." : "Verify OTP →"}
                  </button>

                  <p className="text-xs text-center" style={{ color: brand.faint }}>
                    Didn't get it?{" "}
                    <span onClick={sendOTP} className="font-bold cursor-pointer" style={{ color: brand.primary }}>
                      Resend
                    </span>
                  </p>
                </>
              )}

              {step === 3 && (
                <>
                  <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>
                    New Password
                  </label>
                  <div className="relative mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pr-12 rounded-xl text-sm focus:outline-none"
                      style={inputStyle}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[13px] cursor-pointer text-lg">
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>

                  <label className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none mb-6"
                    style={inputStyle}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && resetPassword()}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />

                  <button
                    onClick={resetPassword}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-extrabold text-white transition-all"
                    style={{
                      background: loading ? brand.disabled : `linear-gradient(135deg, ${brand.success}, #22c55e)`,
                      boxShadow: loading ? "none" : "0 4px 16px rgba(22,163,74,0.35)",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "⏳ Updating..." : "Reset Password →"}
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-5">
          <Link to="/login" className="text-xs font-semibold" style={{ color: brand.muted }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}