import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAnalytics } from "../../api/whatsapp";
import { Card, BarChart, DonutChart, StatCard } from "../../components/whatsapp/ui";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then(setData);
  }, []);

  if (!data) return <DashboardLayout><p>Loading...</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-extrabold mb-6">Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Verification Rate" value={`${data.verification_rate}%`} />
        <StatCard label="Cancel Rate" value={`${data.cancellation_rate}%`} />
        <StatCard label="Revenue Saved" value={`₹${data.revenue_saved}`} />
        <StatCard label="Avg Response Time" value={`${data.average_response_time_minutes}m`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Risk Distribution">
          <DonutChart segments={[
            { label: "Low", value: data.risk_distribution.LOW, color: "#22c55e" },
            { label: "Medium", value: data.risk_distribution.MEDIUM, color: "#f59e0b" },
            { label: "High", value: data.risk_distribution.HIGH, color: "#ef4444" }
          ]} />
        </Card>
      </div>
    </DashboardLayout>
  );
}