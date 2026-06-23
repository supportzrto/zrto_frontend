import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getBrand, updateBrand } from "../../api/whatsapp";
import { Card } from "../../components/whatsapp/ui";

export default function BrandSettings() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => { getBrand(id).then(res => setForm(res.brand)); }, [id]);

  const save = async (e) => {
    e.preventDefault();
    await updateBrand(id, form);
    alert("Saved!");
  };

  if (!form) return <DashboardLayout><p>Loading...</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <Link to="/whatsapp/brands" className="text-indigo-600 text-sm">← Back</Link>
      <h1 className="text-2xl font-extrabold mb-5">{form.brand_name} Settings</h1>
      
      <form onSubmit={save}>
        <Card title="API Credentials">
          <div className="space-y-3">
            <input className="border w-full p-2" value={form.whatsapp_phone_number_id} onChange={e => setForm({...form, whatsapp_phone_number_id: e.target.value})} placeholder="Phone Number ID" />
            <input className="border w-full p-2" value={form.whatsapp_access_token} onChange={e => setForm({...form, whatsapp_access_token: e.target.value})} placeholder="Access Token" />
            <input className="border w-full p-2" value={form.verify_token} onChange={e => setForm({...form, verify_token: e.target.value})} placeholder="Verify Token" />
          </div>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Save Settings</button>
        </Card>
      </form>
    </DashboardLayout>
  );
}