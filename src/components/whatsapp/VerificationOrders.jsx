import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getOrders } from "../../api/whatsapp";
import { RiskBadge, StatusBadge, Card } from "../../components/whatsapp/ui";

export default function VerificationOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then(res => setOrders(res.orders || [])).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-extrabold text-gray-800">Verification Orders</h1>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Risk</th>
              <th className="px-4 py-3">Verification</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="7" className="p-4">Loading...</td></tr> : orders.map(o => (
              <tr key={o.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-semibold">{o.order_id}</td>
                <td className="px-4 py-3">{o.customer_name}</td>
                <td className="px-4 py-3">₹{o.order_amount}</td>
                <td className="px-4 py-3"><RiskBadge category={o.risk_category} score={o.risk_score} /></td>
                <td className="px-4 py-3"><StatusBadge status={o.verification_status} /></td>
                <td className="px-4 py-3"><StatusBadge status={o.order_status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/whatsapp/orders/${o.id}`} className="text-indigo-600 font-semibold">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}