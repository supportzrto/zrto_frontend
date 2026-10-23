import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useToast } from "../components/Toast.jsx";
import { API_URL } from "../config/api";

export default function Pricing() {
  const [user, setUser] = useState(null);
  const [paying, setPaying] = useState(false);
  const toast = useToast();

  const currentPlan = user?.plan || "free";
  const expires = user?.plan_expires ? new Date(user.plan_expires) : null;
  const expiryText = expires
    ? expires.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  // ✅ FETCH USER PLAN
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          credentials: "include",   // 🔥 IMPORTANT
        });

        if (!res.ok) {
          console.error("User fetch failed:", res.status);
          return;
        }

        const data = await res.json();

        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);


  const handlePayment = async () => {
    if (paying) return;
    setPaying(true);
    try {
      const res = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Please log in again to continue.");
        return;
      }

      const order = await res.json();

      if (!res.ok || !order.id) {
        toast.error(order.error || "Could not start the payment. Please try again.");
        return;
      }

      if (!import.meta.env.VITE_RAZORPAY_KEY || !window.Razorpay) {
        toast.error("Payments are temporarily unavailable. Please contact support.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "ZRTO",
        description: "Pro Plan: 30 days",

        handler: async function (response) {
          try {
            // The login cookie must be sent (credentials: "include"); there is no token in JS.
            const verifyRes = await fetch(`${API_URL}/verify-payment`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const data = await verifyRes.json();

            if (verifyRes.ok && data.message) {
              toast.success("Payment successful. Your Pro plan is active.");
              setTimeout(() => window.location.reload(), 1500);
            } else {
              toast.error(
                data.error ||
                  "We received your payment but couldn't confirm it yet. Your plan will activate automatically within a few minutes. If not, contact support.",
                9000
              );
            }
          } catch {
            toast.error(
              "We received your payment but couldn't confirm it yet. Your plan will activate automatically within a few minutes. If not, contact support.",
              9000
            );
          }
        },

        modal: { ondismiss: () => setPaying(false) },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment error. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  // ✅ PLANS
  const plans = [
    {
      name: "Free",
      desc: "Perfect for testing the AI",
      price: "₹0",
      color: "#4f46e5",
      bg: "#f5f3ff",
      border: "#c4b5fd",
      btnBg: "#e0e7ff",
      btnColor: "#4f46e5",
      btnText: "Current Plan",
      features: [
        "50 free predictions to start",
        "CSV Upload",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Pro",
      desc: "Best for growing stores",
      price: "₹4,999",
      priceNote: "for 30 days · renew anytime",
      color: "#f97316",
      bg: "#fff7ed",
      border: "#fdba74",
      btnBg: "linear-gradient(135deg, #f97316, #fb923c)",
      btnColor: "#fff",
      btnText: "Upgrade to Pro",
      badge: "MOST POPULAR",
      features: [
        "5,000 predictions per 30 days",
        "Prediction history",
        "Priority support",
        "Webhook support",
      ],
    },
    {
      name: "Enterprise",
      desc: "Custom solution for large brands",
      price: "Custom",
      color: "#7c3aed",
      bg: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
      border: "#d8b4fe",
      btnBg: "linear-gradient(135deg, #7c3aed, #6d28d9)",
      btnColor: "#fff",
      btnText: "Contact Sales",
      isEnterprise: true,
      features: [
        "Unlimited predictions",
        "Dedicated API access",
        "Webhook integration",
        "Dedicated support",
        "Custom SLA",
      ],
    },
  ];

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)"
        }}>
        <div className="text-3xl">💎</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Pricing Plans
          </h1>
          <p className="text-indigo-200 text-sm">
            Choose the plan that fits your business
          </p>
        </div>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-6">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl p-7 shadow-md hover:shadow-xl transition"
            style={{
              background: plan.bg,
              border: `2px solid ${plan.border}`
            }}
          >

            {/* BADGE */}
            {plan.badge && (
              <div className="mb-2 text-xs font-bold text-orange-600">
                {plan.badge}
              </div>
            )}

            {/* TITLE */}
            <h2 className="text-xl font-extrabold mb-1"
              style={{ color: plan.color }}>
              {plan.name}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {plan.desc}
            </p>

            {/* PRICE */}
            <div className="text-3xl font-extrabold mb-1">
              {plan.price}
            </div>
            <div className="text-xs text-gray-500 mb-6 min-h-[1rem]">
              {plan.priceNote || ""}
              {plan.name === "Pro" && currentPlan === "pro" && expiryText
                ? ` · active until ${expiryText}`
                : ""}
            </div>

            {/* FEATURES */}
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              onClick={() => {
                if (plan.isEnterprise) {
                  window.location.href = "/contact";
                } else if (plan.name === "Pro") {
                  handlePayment();
                }
              }}
              disabled={
                (currentPlan === plan.name.toLowerCase() && plan.name !== "Pro") ||
                (plan.name === "Pro" && paying)
              }
              className="w-full py-3 rounded-xl font-bold disabled:opacity-70"
              style={{
                background: plan.btnBg,
                color: plan.btnColor
              }}
            >
              {plan.name === "Pro" && currentPlan === "pro"
                ? "Renew for 30 more days"
                : currentPlan === plan.name.toLowerCase()
                ? "✓ Current Plan"
                : plan.name === "Pro" && paying
                ? "Opening payment..."
                : plan.btnText}
            </button>

          </div>
        ))}

      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Payments are processed securely by Razorpay. Renewing while your plan is active adds 30 days to
        your current end date. See our{" "}
        <Link to="/refund" className="underline text-indigo-600">Refund &amp; Cancellation Policy</Link>.
      </p>
    </DashboardLayout>
  );
}