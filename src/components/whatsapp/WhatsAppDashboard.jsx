import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getDashboard, getBrands } from "../../api/whatsapp";
import { StatCard, Card } from "../../components/whatsapp/ui";

export default function WhatsAppDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboard(brandId || undefined), getBrands()])
      .then(([m, b]) => { setMetrics(m); setBrands(b.brands || []); })
      .finally(() => setLoading(false));
  }, [brandId]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">WhatsApp Verification 🟢</h1>
          <p className="text-sm text-gray-500">COD orders auto-verified before shipping to cut RTO losses.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option value="">All Brands</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.brand_name}</option>)}
          </select>
          <Link to="/whatsapp/orders" className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-indigo-600">View Orders →</Link>
        </div>
      </div>
      {loading || !metrics ? <p>Loading...</p> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Orders" value={metrics.total_orders} />
            <StatCard label="Risky Orders" value={metrics.risky_orders} accent="#b45309" />
            <StatCard label="Verified" value={metrics.verified_orders} accent="#15803d" />
            <StatCard label="Rejected" value={metrics.rejected_orders} accent="#b91c1c" />
            <StatCard label="Verification Rate" value={`${metrics.verification_rate}%`} accent="#0e7490" />
            <StatCard label="Revenue Saved" value={`₹${metrics.revenue_saved}`} accent="#15803d" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Average Response Time">
              <p className="text-3xl font-extrabold text-indigo-600">{metrics.average_response_time_minutes} min</p>
            </Card>
            <Card title="Quick Links">
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/whatsapp/orders" className="text-indigo-600">📋 Orders</Link>
                <Link to="/whatsapp/analytics" className="text-indigo-600">📈 Analytics</Link>
                <Link to="/whatsapp/brands" className="text-indigo-600">🏷️ Brands</Link>
              </div>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}