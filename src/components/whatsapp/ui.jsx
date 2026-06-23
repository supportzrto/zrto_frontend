export function RiskBadge({ category, score }) {
  const map = {
    HIGH: { bg: "#fee2e2", fg: "#b91c1c", label: "High" },
    MEDIUM: { bg: "#fef3c7", fg: "#b45309", label: "Medium" },
    LOW: { bg: "#dcfce7", fg: "#15803d", label: "Low" },
  };
  const s = map[category] || map.LOW;
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: s.bg, color: s.fg }}>
      {s.label}{score != null ? ` · ${Math.round(score)}` : ""}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Verified: { bg: "#dcfce7", fg: "#15803d" },
    "Confirmed By Customer": { bg: "#dcfce7", fg: "#15803d" },
    Rejected: { bg: "#fee2e2", fg: "#b91c1c" },
    "Cancelled By Customer": { bg: "#fee2e2", fg: "#b91c1c" },
    Pending: { bg: "#e0e7ff", fg: "#4338ca" },
    "Awaiting Confirmation": { bg: "#e0e7ff", fg: "#4338ca" },
    "No Response": { bg: "#f3f4f6", fg: "#6b7280" },
    "On Hold": { bg: "#fef3c7", fg: "#b45309" },
    "Manual Review Required": { bg: "#fef3c7", fg: "#b45309" },
    Shipped: { bg: "#cffafe", fg: "#0e7490" },
  };
  const s = map[status] || { bg: "#f3f4f6", fg: "#6b7280" };
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={{ background: s.bg, color: s.fg }}>
      {status}
    </span>
  );
}

export function StatCard({ label, value, accent = "#4f46e5", sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-2xl font-extrabold mt-1" style={{ color: accent }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export function Card({ title, children, action }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-bold text-gray-800">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function BarChart({ data, keys, colors, height = 200 }) {
  if (!data || data.length === 0) return <p className="text-sm text-gray-400 py-8 text-center">No data yet.</p>;
  const max = Math.max(1, ...data.flatMap((d) => keys.map((k) => Number(d[k]) || 0))) || 1;
  const barGroupW = 100 / data.length;
  return (
    <svg viewBox={`0 0 100 ${height / 2}`} className="w-full" style={{ height }}>
      {data.map((d, i) => {
        const groupX = i * barGroupW, innerW = barGroupW * 0.7, bw = innerW / keys.length, offset = (barGroupW - innerW) / 2;
        return (
          <g key={i}>
            {keys.map((k, j) => {
              const h = ((Number(d[k]) || 0) / max) * (height / 2 - 12);
              return <rect key={k} x={groupX + offset + j * bw} y={height / 2 - 8 - h} width={bw * 0.85} height={h} rx="0.6" fill={colors[j]} />;
            })}
            <text x={groupX + barGroupW / 2} y={height / 2 - 1} fontSize="2.4" textAnchor="middle" fill="#9ca3af">{String(d.label).slice(5)}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({ segments, size = 160 }) {
  const total = segments.reduce((s, x) => s + (Number(x.value) || 0), 0);
  if (total === 0) return <p className="text-sm text-gray-400 py-8 text-center">No data yet.</p>;
  let acc = 0; const c = 2 * Math.PI * 60;
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <svg width={size} height={size} viewBox="0 0 160 160">
        <g transform="rotate(-90 80 80)">
          {segments.map((s, i) => {
            const dash = ((Number(s.value) || 0) / total) * c;
            const el = <circle key={i} cx="80" cy="80" r="60" fill="none" stroke={s.color} strokeWidth="22" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-acc} />;
            acc += dash; return el;
          })}
        </g>
        <text x="80" y="86" textAnchor="middle" fontSize="26" fontWeight="800" fill="#1f2937">{total}</text>
      </svg>
      <div className="space-y-1.5">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: s.color }} />
            <span className="text-gray-600">{s.label}</span>
            <span className="font-bold text-gray-800">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}