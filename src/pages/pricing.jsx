import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Pricing() {
  const [user, setUser] = useState(null);

  const currentPlan = user?.plan || "free";

  // ✅ FETCH USER PLAN
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          credentials: "include",   // 🔥 IMPORTANT
        });

        if (!res.ok) {
          console.error("User fetch failed:", res.status);
          return;
        }

        const data = await res.json();
        console.log("USER:", data); // debug

        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);


  const handlePayment = async () => {
    try {
      
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/create-order`,
        {
          method: "POST",
          credentials: "include",
        });

      const order = await res.json();

      if (!order.id) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "ZRTO AI",
        description: "Pro Plan",

        handler: async function (response) {
          const verifyRes = await fetch(
            `${import.meta.env.VITE_API_URL}/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(response),
            }
          );

          const data = await verifyRes.json();

          if (data.message) {
            alert("Payment successful 🎉");
            window.location.reload();
          } else {
            alert("Verification failed");
          }
        },

        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment error");
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
        "50 predictions/month",
        "CSV Upload",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Pro",
      desc: "Best for growing stores",
      price: "₹4999",
      color: "#f97316",
      bg: "#fff7ed",
      border: "#fdba74",
      btnBg: "linear-gradient(135deg, #f97316, #fb923c)",
      btnColor: "#fff",
      btnText: "Upgrade to Pro",
      badge: "MOST POPULAR",
      features: [
        "5,000 predictions/month",
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
            <div className="text-3xl font-extrabold mb-6">
              {plan.price}
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
              disabled={currentPlan === plan.name.toLowerCase()}
              className="w-full py-3 rounded-xl font-bold"
              style={{
                background: plan.btnBg,
                color: plan.btnColor
              }}
            >
              {currentPlan === plan.name.toLowerCase()
                ? "✓ Current Plan"
                : plan.btnText}
            </button>

          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}