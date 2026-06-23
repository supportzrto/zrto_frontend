import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getBrands, createBrand, deleteBrand } from "../../api/whatsapp";
import { Card } from "../../components/whatsapp/ui";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ brand_name: "" });

  const load = () => getBrands().then(res => setBrands(res.brands || []));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createBrand(form);
    setShowForm(false);
    load();
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold">Brands</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 text-white px-4 py-2 rounded">+ Add Brand</button>
      </div>

      {showForm && (
        <Card title="New Brand">
          <form onSubmit={submit} className="flex gap-2">
            <input placeholder="Brand Name" className="border p-2 rounded" value={form.brand_name} onChange={e => setForm({ brand_name: e.target.value })} required />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {brands.map(b => (
          <Card key={b.id} title={b.brand_name}>
            <p className="text-sm text-gray-500">Enabled: {b.whatsapp_enabled ? "Yes" : "No"}</p>
            <div className="mt-4 flex gap-2">
              <Link to={`/whatsapp/brands/${b.id}`} className="text-indigo-600 text-sm">Settings →</Link>
              <button onClick={() => deleteBrand(b.id).then(load)} className="text-red-500 text-sm ml-auto">Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}