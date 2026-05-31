import { useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  
  const sendOTP = async () => {
    if (!email) return alert("Enter your email");

    setLoading(true);
    try {
      const res = await fetch("https://zrtobackend-production.up.railway.app/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.message) {
        alert("OTP sent to your email");
        setStep(2);
      } else {
        alert(data.error);
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };


  const verifyOTP = async () => {
    const res = await fetch("https://zrtobackend-production.up.railway.app/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

  

    if (data.message) {
      if (!data.token || data.token === "undefined") {
        alert("Token not received properly ❌");
        return;
      }


      localStorage.setItem("reset_token", data.token);



      setStep(3);
    } else {
      alert(data.error);
    }
  };

  const resetPassword = async () => {
    const token = localStorage.getItem("reset_token");

 


    if (!token || token === "undefined" || token.split(".").length !== 3) {
      alert("Invalid or missing token ❌");
      return;
    }

    if (!newPassword || !confirmPassword) {
      return alert("Fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch("https://zrtobackend-production.up.railway.app/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          token,
          new_password: newPassword
        })
      });

      const data = await res.json();



      if (data.message) {
        alert("Password reset successful");

        localStorage.removeItem("reset_token"); 
        
        setTimeout(() =>{
          Navigate("/login")
        },1500);
      
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md w-[350px]">
        <h2 className="text-xl font-bold mb-4 text-center">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>


        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}


        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}


        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border rounded mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}