import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getOrder, orderAction } from "../../api/whatsapp";
import { RiskBadge, StatusBadge, Card } from "../../components/whatsapp/ui";

export default function OrderDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  
  async function load() {
    setData(await getOrder(id));
  }
  useEffect(() => { load(); }, [id]);

  if (!data) return <DashboardLayout><p>Loading...</p></DashboardLayout>;
  const o = data.order;
  const Row = ({ k, v }) => <div className="flex justify-between py-1.5 border-b border-gray-50 text-sm"><span className="text-gray-400">{k}</span><span className="font-semibold">{v ?? "—"}</span></div>;

  return (
    <DashboardLayout>
      <Link to="/whatsapp/orders" className="text-sm text-indigo-600">← Back</Link>
      <h1 className="text-2xl font-extrabold text-gray-800 mt-1 mb-5">Order {o.order_id}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Details">
          <Row k="Customer" v={o.customer_name} />
          <Row k="Phone" v={o.phone_number} />
          <Row k="Amount" v={`₹${o.order_amount}`} />
          <Row k="Risk Category" v={o.risk_category} />
          <Row k="Risk Score" v={o.risk_score} />
          <Row k="Verification" v={o.verification_status} />
          <Row k="Status" v={o.order_status} />
        </Card>
        
        <Card title="Timeline">
          {data.timeline.map((t, i) => (
            <div key={i} className="mb-2 text-sm">
              <span className="font-bold">{t.event}</span> <span className="text-gray-400 text-xs">({t.time})</span>
            </div>
          ))}
        </Card>
      </div>
      
      <Card title="Actions" className="mt-4">
        <div className="flex gap-2">
          <button onClick={() => orderAction(id, "resend").then(load)} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded">Resend WhatsApp</button>
          <button onClick={() => orderAction(id, "mark_verified").then(load)} className="px-4 py-2 bg-green-600 text-white text-sm rounded">Verify</button>
          <button onClick={() => orderAction(id, "mark_rejected").then(load)} className="px-4 py-2 bg-red-600 text-white text-sm rounded">Reject</button>
        </div>
      </Card>
    </DashboardLayout>
  );
}