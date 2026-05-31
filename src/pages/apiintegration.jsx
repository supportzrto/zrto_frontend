import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const platforms = [
  { key: "shopify", label: "Shopify", icon: "🛍️", color: "#16a34a", bg: "#f0fdf4", border: "#86efac" },
  { key: "woocommerce", label: "WooCommerce", icon: "🏪", color: "#7c3aed", bg: "#faf5ff", border: "#d8b4fe" },
  { key: "custom", label: "Custom API", icon: "⚡", color: "#ea580c", bg: "#fff7ed", border: "#fdba74" },
  { key: "csv", label: "CSV Upload", icon: "📁", color: "#0891b2", bg: "#ecfeff", border: "#67e8f9" },
];

export default function ApiIntegration() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("api_key") || "");
  const [platform, setPlatform] = useState("shopify");
  const [codeLang, setCodeLang] = useState("javascript");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://zrtobackend-production.up.railway.app/api/key", { headers: { token } })
      .then(res => res.json())
      .then(data => { if (data.api_key) setApiKey(data.api_key); })
      .catch(() => { });
  }, []);

  const key = apiKey || "YOUR_API_KEY";

  const platformContent = {
    shopify: {
      title: "Shopify Integration",
      desc: "Integrate RTO Shield AI into your Shopify store to automatically score every COD order at checkout in real time.",
      steps: [
        { title: "Set Up a Webhook", desc: "In Shopify Admin → Settings → Notifications → Webhooks → Add webhook for 'Order creation'." },
        { title: "Point to Your Backend", desc: "Your webhook URL should be your server endpoint that calls our API." },
        { title: "Add the Code Below", desc: "Use the code snippet to call RTO Shield AI from your webhook handler." },
        { title: "Test with a COD Order", desc: "Place a test COD order and check the risk score in your RTO Shield AI dashboard." },
      ],
      tips: [
        "Only call the API for COD orders — skip prepaid to save predictions.",
        "Use Shopify Flow to auto-tag or cancel high-risk orders.",
        "Test on a staging store before going live.",
      ],
      code: {
        javascript: `// Shopify Webhook Handler — Node.js / Express
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/webhook/shopify/order', async (req, res) => {
  const order = req.body;

  // Only check COD orders
  if (order.payment_gateway !== 'cash_on_delivery') {
    return res.sendStatus(200);
  }

  try {
    const rtoRes = await fetch(
      'https://zrtobackend-production.up.railway.app/api/predict-order',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: '${key}',
          order_id: order.id,
          order_value: parseFloat(order.total_price),
          payment_type: 'COD',
          pincode: order.shipping_address.zip,
          customer_city: order.shipping_address.city,
          device_type: 'Mobile',
          order_channel: 'Shopify'
        })
      }
    );

    const risk = await rtoRes.json();
    console.log('Risk:', risk.decision, risk.risk_score);

    if (risk.decision === 'BLOCK_COD') {
      // Cancel or hold order via Shopify Admin API
      console.log('HIGH RISK — Action:', risk.action);
    }

  } catch (err) {
    console.error('RTO check failed:', err);
  }

  res.sendStatus(200);
});`,
        python: `# Shopify Webhook Handler — Python / Flask
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook/shopify/order', methods=['POST'])
def handle_shopify_order():
    order = request.json

    # Only check COD orders
    if order.get('payment_gateway') != 'cash_on_delivery':
        return '', 200

    try:
        rto_res = requests.post(
            'https://zrtobackend-production.up.railway.app/api/predict-order',
            json={
                'api_key': '${key}',
                'order_id': order['id'],
                'order_value': float(order['total_price']),
                'payment_type': 'COD',
                'pincode': order['shipping_address']['zip'],
                'customer_city': order['shipping_address']['city'],
                'device_type': 'Mobile',
                'order_channel': 'Shopify'
            },
            timeout=5
        )
        risk = rto_res.json()
        print(f"Decision: {risk['decision']} | Score: {risk['risk_score']}")

        if risk['decision'] == 'BLOCK_COD':
            cancel_shopify_order(order['id'])

    except Exception as e:
        print(f"RTO check failed: {e}")

    return '', 200`,
      },
    },

    woocommerce: {
      title: "WooCommerce Integration",
      desc: "Hook into WooCommerce order events to score COD orders in real time using PHP actions or a webhook.",
      steps: [
        { title: "Add Code to functions.php", desc: "Open your theme's functions.php or create a custom plugin and add the PHP snippet below." },
        { title: "Enter Your API Key", desc: `Replace YOUR_API_KEY in the code with: ${key.slice(0, 12)}...` },
        { title: "Set COD Action", desc: "Choose what happens with BLOCK_COD: cancel automatically or change order status to 'on-hold'." },
        { title: "Test the Integration", desc: "Place a test COD order from your store and check the result in your dashboard." },
      ],
      tips: [
        "Use wp_remote_post() to call our API — it handles timeouts gracefully.",
        "Set the order status to 'on-hold' instead of cancelling, to manually review edge cases.",
        "Log all API responses to WooCommerce order notes for easy debugging.",
      ],
      code: {
        javascript: `// WooCommerce REST API — JavaScript (Node.js)
// Called after receiving WooCommerce webhook

async function checkWooCommerceOrder(order) {
  // Only process COD orders
  if (order.payment_method !== 'cod') return;

  const res = await fetch(
    'https://zrtobackend-production.up.railway.app/api/predict-order',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: '${key}',
        order_id: order.id,
        order_value: parseFloat(order.total),
        payment_type: 'COD',
        pincode: order.shipping.postcode,
        customer_city: order.shipping.city,
        device_type: 'Mobile',
        order_channel: 'WooCommerce'
      })
    }
  );

  const risk = await res.json();

  if (risk.decision === 'BLOCK_COD') {
    // Update WooCommerce order status
    await updateOrderStatus(order.id, 'cancelled');
    console.log('Order blocked:', risk.action);
  } else if (risk.decision === 'VERIFY') {
    await updateOrderStatus(order.id, 'on-hold');
    console.log('Order needs verification');
  }
}`,
        python: `<?php
// WooCommerce PHP Hook — Add to functions.php

add_action(
  'woocommerce_checkout_order_processed',
  'rto_shield_check_order',
  10, 3
);

function rto_shield_check_order($order_id, $posted_data, $order) {

  // Only check COD orders
  if ($order->get_payment_method() !== 'cod') return;

  $response = wp_remote_post(
    'https://zrtobackend-production.up.railway.app/api/predict-order',
    array(
      'timeout' => 5,
      'headers' => array('Content-Type' => 'application/json'),
      'body'    => json_encode(array(
        'api_key'       => '${key}',
        'order_id'      => $order_id,
        'order_value'   => (float) $order->get_total(),
        'payment_type'  => 'COD',
        'pincode'       => $order->get_shipping_postcode(),
        'customer_city' => $order->get_shipping_city(),
        'device_type'   => 'Mobile',
        'order_channel' => 'WooCommerce'
      ))
    )
  );

  if (is_wp_error($response)) return;

  $risk = json_decode(
    wp_remote_retrieve_body($response), true
  );

  if ($risk['decision'] === 'BLOCK_COD') {
    $order->update_status(
      'cancelled',
      'RTO Shield AI: High risk COD order blocked.'
    );
  } elseif ($risk['decision'] === 'VERIFY') {
    $order->update_status(
      'on-hold',
      'RTO Shield AI: Verification required.'
    );
  }
}
?>`,
      },
    },

    custom: {
      title: "Custom API Integration",
      desc: "Use our REST API from any platform, backend, or custom storefront. Works with any language or framework.",
      steps: [
        { title: "Get Your API Key", desc: "Copy your API key from the API Access page or your Account page." },
        { title: "Call from Your Backend", desc: "Always call from server-side code — never expose your API key in browser JavaScript." },
        { title: "Handle the Response", desc: "Parse decision: BLOCK_COD → cancel, VERIFY → hold and verify, ALLOW → ship." },
        { title: "Automate Actions", desc: "Trigger order cancellation, SMS verification, or courier holds based on the decision." },
      ],
      tips: [
        "Always call from server-side — never from the browser (exposes your API key).",
        "Set a 5-second timeout so a slow API call never blocks your checkout.",
        "Log all decisions to your database for future analysis.",
      ],
      code: {
        javascript: `// Custom Integration — Node.js / Express
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/orders/new', async (req, res) => {
  const { orderId, amount, pincode, city, paymentType } = req.body;

  // Only check COD
  if (paymentType !== 'COD') {
    return res.json({ status: 'confirmed' });
  }

  try {
    const rtoRes = await fetch(
      'https://zrtobackend-production.up.railway.app/api/predict-order',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: '${key}',
          order_id: orderId,
          order_value: amount,
          payment_type: 'COD',
          pincode: pincode,
          customer_city: city,
          device_type: 'Mobile',
          order_channel: 'Website'
        })
      }
    );

    const { risk_score, decision, action } = await rtoRes.json();

    if (decision === 'BLOCK_COD') {
      return res.json({ status: 'blocked', reason: action });
    } else if (decision === 'VERIFY') {
      await sendVerificationSMS(orderId);
      return res.json({ status: 'pending_verification' });
    }

    return res.json({ status: 'confirmed', risk_score });

  } catch (err) {
    // Fail open — don't block orders if API is down
    console.error('RTO check failed:', err);
    return res.json({ status: 'confirmed' });
  }
});`,
        python: `# Custom Integration — Python / FastAPI
import httpx
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class OrderRequest(BaseModel):
    order_id: int
    amount: float
    pincode: int
    city: str
    payment_type: str

@app.post("/orders/new")
async def create_order(order: OrderRequest):

    # Only check COD
    if order.payment_type != "COD":
        return {"status": "confirmed"}

    try:
        async with httpx.AsyncClient(timeout=5) as client:
            rto_res = await client.post(
                "https://zrtobackend-production.up.railway.app/api/predict-order",
                json={
                    "api_key": "${key}",
                    "order_id": order.order_id,
                    "order_value": order.amount,
                    "payment_type": "COD",
                    "pincode": order.pincode,
                    "customer_city": order.city,
                    "device_type": "Mobile",
                    "order_channel": "Website"
                }
            )

        risk = rto_res.json()

        if risk["decision"] == "BLOCK_COD":
            return {"status": "blocked", "reason": risk["action"]}
        elif risk["decision"] == "VERIFY":
            await send_verification(order.order_id)
            return {"status": "pending_verification"}

        return {"status": "confirmed", "risk_score": risk["risk_score"]}

    except Exception:
        # Fail open — don't block orders if API is down
        return {"status": "confirmed"}`,
      },
    },

    csv: {
      title: "CSV Bulk Upload",
      desc: "No coding needed. Export your COD orders as CSV and upload directly from the Predict Orders page for instant bulk predictions.",
      steps: [
        { title: "Export Your Orders", desc: "Export COD orders from Shopify, WooCommerce, or your system as a CSV file." },
        { title: "Check Column Names", desc: "Make sure your CSV has the required columns shown in the template below." },
        { title: "Upload on Dashboard", desc: "Go to Predict Orders page → drag and drop your CSV → click Run AI Prediction." },
        { title: "Download Results", desc: "Download the enriched CSV with risk_score and decision added for every order." },
      ],
      tips: [
        "Max 10,000 orders per CSV upload on the Pro plan.",
        "Pincode must be a 6-digit number with no spaces or dashes.",
        "The CSV must include a header row with exact column names shown below.",
      ],
      code: {
        javascript: `// ── Required CSV Format ──────────────────────
//
// Column          Description
// ─────────────── ──────────────────────────────
// order_id        Unique order number
// order_value     Amount in INR (numbers only)
// payment_type    Must be "COD"
// pincode         6-digit delivery pincode
// customer_city   City name (e.g. "Hyderabad")
// device_type     Mobile / Desktop / App
// order_channel   Website / App / WhatsApp
//
// ── Sample CSV Content ───────────────────────

order_id,order_value,payment_type,pincode,customer_city,device_type,order_channel
1001,2500,COD,500081,Hyderabad,Mobile,Website
1002,1800,COD,400001,Mumbai,Desktop,App
1003,3200,COD,600001,Chennai,Mobile,WhatsApp
1004,950,COD,110001,Delhi,Mobile,Website
1005,4500,COD,560001,Bangalore,App,Website

// ── Output CSV will include these extra columns:
// risk_score   → 0.0 to 1.0
// decision     → BLOCK_COD / VERIFY / ALLOW
// action       → Recommended next step`,
        python: `# Python: Generate a CSV ready for upload
import pandas as pd

orders = [
    {
        "order_id": 1001,
        "order_value": 2500,
        "payment_type": "COD",
        "pincode": 500081,
        "customer_city": "Hyderabad",
        "device_type": "Mobile",
        "order_channel": "Website"
    },
    {
        "order_id": 1002,
        "order_value": 1800,
        "payment_type": "COD",
        "pincode": 400001,
        "customer_city": "Mumbai",
        "device_type": "Desktop",
        "order_channel": "App"
    },
    # Add more orders...
]

df = pd.DataFrame(orders)
df.to_csv("orders_upload.csv", index=False)
print(f"✅ CSV ready: {len(df)} orders exported")
print("Now upload this file on the Predict Orders page.")`,
      },
    },
  };

  const content = platformContent[platform];
  const activePlatform = platforms.find(p => p.key === platform);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}>⚡</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">API Integration</h1>
          <p className="text-indigo-200 text-sm">Connect RTO Shield AI to your store in minutes</p>
        </div>
      </div>

      {/* Platform tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {platforms.map(p => (
          <button key={p.key}
            onClick={() => { setPlatform(p.key); setCodeLang("javascript"); }}
            className="rounded-2xl p-4 text-left transition-all hover:scale-105"
            style={{
              background: platform === p.key ? p.bg : "#fff",
              border: `2px solid ${platform === p.key ? p.color : "#e0e7ff"}`,
              boxShadow: platform === p.key ? `0 4px 16px ${p.color}25` : "none",
            }}>
            <div className="text-2xl mb-2">{p.icon}</div>
            <div className="text-sm font-extrabold"
              style={{ color: platform === p.key ? p.color : "#374151" }}>{p.label}</div>
            {platform === p.key && (
              <div className="text-xs mt-1 font-semibold" style={{ color: p.color }}>● Active</div>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        {/* Left — info */}
        <div className="space-y-5">
          <div className="rounded-2xl p-6 shadow-md"
            style={{ background: activePlatform.bg, border: `2px solid ${activePlatform.border}` }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{activePlatform.icon}</span>
              <h2 className="font-extrabold text-lg" style={{ color: activePlatform.color }}>{content.title}</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{content.desc}</p>
          </div>

          <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
            <h3 className="font-extrabold mb-4" style={{ color: "#1e1b4b" }}>📋 Setup Steps</h3>
            <div className="space-y-4">
              {content.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0 mt-0.5"
                    style={{ background: activePlatform.color }}>{i + 1}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: activePlatform.color }}>{step.title}</div>
                    <div className="text-xs leading-relaxed mt-0.5" style={{ color: "#6b7280" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5 shadow-md" style={{ background: "#fef3c7", border: "2px solid #fde68a" }}>
            <h3 className="font-extrabold mb-3 text-sm" style={{ color: "#92400e" }}>💡 Pro Tips</h3>
            <div className="space-y-2">
              {content.tips.map((tip, i) => (
                <div key={i} className="flex gap-2 text-xs" style={{ color: "#78350f" }}>
                  <span className="flex-shrink-0 mt-0.5">→</span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — code */}
        <div className="md:col-span-2">
          <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: "2px solid #1e1b4b" }}>
            <div className="flex items-center" style={{ background: "#1e1b4b" }}>
              {[
                { key: "javascript", label: "JavaScript", icon: "🟨" },
                { key: "python", label: "Python / PHP", icon: "🐍" },
              ].map(tab => (
                <button key={tab.key} onClick={() => setCodeLang(tab.key)}
                  className="px-5 py-3 text-sm font-bold flex items-center gap-2 transition-all"
                  style={{
                    background: codeLang === tab.key ? "#4f46e5" : "transparent",
                    color: codeLang === tab.key ? "#fff" : "#a5b4fc",
                  }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
              <div className="flex-1" />
              <button
                onClick={() => navigator.clipboard.writeText(content.code[codeLang])}
                className="px-4 py-3 text-xs font-bold mr-2"
                style={{ color: "#a5b4fc" }}>
                📋 Copy Code
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed"
              style={{ background: "#0f172a", color: "#a5f3fc", maxHeight: "480px" }}>
              <code>{content.code[codeLang]}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Decision reference */}
      <div className="rounded-2xl p-6 shadow-md" style={{ background: "#fff", border: "2px solid #e0e7ff" }}>
        <h2 className="font-extrabold text-lg mb-5" style={{ color: "#1e1b4b" }}>📊 Risk Decision Reference</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { decision: "BLOCK_COD", score: "0.70 – 1.00", icon: "🚨", desc: "High risk. Cancel or hold order. Request prepaid payment.", color: "#dc2626", bg: "#fee2e2", border: "#fca5a5" },
            { decision: "VERIFY", score: "0.40 – 0.69", icon: "⚠️", desc: "Medium risk. Call or message customer to confirm before dispatch.", color: "#d97706", bg: "#fef3c7", border: "#fde68a" },
            { decision: "ALLOW", score: "0.00 – 0.39", icon: "✅", desc: "Low risk. Safe to dispatch without extra verification.", color: "#16a34a", bg: "#dcfce7", border: "#86efac" },
          ].map(d => (
            <div key={d.decision} className="rounded-2xl p-5"
              style={{ background: d.bg, border: `2px solid ${d.border}` }}>
              <div className="text-2xl mb-2">{d.icon}</div>
              <div className="font-extrabold mb-1" style={{ color: d.color }}>{d.decision}</div>
              <div className="text-xs font-bold mb-2 px-2 py-0.5 rounded-full inline-block"
                style={{ background: `${d.color}20`, color: d.color }}>Score: {d.score}</div>
              <p className="text-xs leading-relaxed" style={{ color: "#4b5563" }}>{d.desc}</p>
            </div>
          ))}
        </div>

        {/* API Request Fields */}
        <div
          className="rounded-2xl p-6 shadow-md mt-6"
          style={{ background: "#fff", border: "2px solid #e0e7ff" }}
        >
          <h2
            className="font-extrabold text-lg mb-5"
            style={{ color: "#1e1b4b" }}
          >
            📥 Required Request Fields
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background: "#f5f3ff",
                    color: "#4f46e5"
                  }}
                >
                  <th className="p-3 text-left">Field</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ["order_id", "number", "Unique order number"],
                  ["order_value", "number", "Order amount in INR"],
                  ["payment_type", "string", "COD or Prepaid"],
                  ["pincode", "number", "Delivery pincode"],
                  ["customer_city", "string", "Customer city"],
                  ["device_type", "string", "Mobile / Desktop / App"],
                  ["order_channel", "string", "Website / App / WhatsApp"]
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #e5e7eb"
                    }}
                  >
                    <td className="p-3 font-mono">{row[0]}</td>
                    <td className="p-3">{row[1]}</td>
                    <td className="p-3">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How Integration Works */}
        <div
          className="rounded-2xl p-6 shadow-md mt-6"
          style={{ background: "#fff", border: "2px solid #e0e7ff" }}
        >
          <h2
            className="font-extrabold text-lg mb-6"
            style={{ color: "#1e1b4b" }}
          >
            🚀 How Integration Works
          </h2>

          <div className="grid md:grid-cols-5 gap-4 text-center">

            {[
              "Customer Places COD Order",
              "Store Sends API Request",
              "ZRTO AI Scores Order",
              "Decision Generated",
              "Store Takes Action"
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{
                  background: "#f5f3ff",
                  border: "2px solid #c4b5fd"
                }}
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                  style={{ background: "#4f46e5" }}
                >
                  {i + 1}
                </div>

                <p
                  className="text-xs font-semibold"
                  style={{ color: "#4b5563" }}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* API Performance */}
        <div
          className="rounded-2xl p-6 shadow-md mt-6"
          style={{ background: "#fff7ed", border: "2px solid #fed7aa" }}
        >
          <h2
            className="font-extrabold text-lg mb-5"
            style={{ color: "#c2410c" }}
          >
            ⚡ API Performance
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            {[
              {
                label: "Avg Response",
                value: "< 500ms"
              },
              {
                label: "Availability",
                value: "99.9%"
              },
              {
                label: "Rate Limit",
                value: "60/min"
              },
              {
                label: "Recommended Timeout",
                value: "5 sec"
              }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "#fff",
                  border: "2px solid #fed7aa"
                }}
              >
                <div
                  className="font-extrabold text-xl"
                  style={{ color: "#ea580c" }}
                >
                  {item.value}
                </div>

                <div
                  className="text-xs mt-1"
                  style={{ color: "#6b7280" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Use Cases */}
        <div
          className="rounded-2xl p-6 shadow-md mt-6 mb-6"
          style={{ background: "#fff", border: "2px solid #e0e7ff" }}
        >
          <h2
            className="font-extrabold text-lg mb-5"
            style={{ color: "#1e1b4b" }}
          >
            💼 Common Use Cases
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            {[
              {
                icon: "🛍️",
                title: "Shopify Stores",
                desc: "Reduce COD RTO losses automatically"
              },
              {
                icon: "🏪",
                title: "WooCommerce",
                desc: "Auto-hold risky COD orders"
              },
              {
                icon: "🚀",
                title: "D2C Brands",
                desc: "Increase prepaid conversions"
              },
              {
                icon: "📞",
                title: "Call Centers",
                desc: "Verify risky customers before shipping"
              }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-5"
                style={{
                  background: "#f8fafc",
                  border: "2px solid #e2e8f0"
                }}
              >
                <div className="text-3xl mb-3">
                  {item.icon}
                </div>

                <h3
                  className="font-extrabold mb-2"
                  style={{ color: "#4f46e5" }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#6b7280" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </DashboardLayout>
  );
}