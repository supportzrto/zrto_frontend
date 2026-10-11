import { brand } from "../config/theme";

// ZRTO logo: gradient shield mark + wordmark. `dark` = dark text (for light backgrounds).
export default function Logo({ size = 34, dark = false, showText = true }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="flex items-center justify-center rounded-xl shadow-lg"
        style={{ width: size, height: size, background: brand.gradient, boxShadow: "0 6px 18px rgba(79,70,229,0.45)" }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path stroke="#fff" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path stroke="#fdba74" d="m9 12 2 2 4-4" />
        </svg>
      </span>
      {showText && (
        <span className="font-extrabold tracking-tight leading-none" style={{ fontSize: size * 0.62, color: dark ? brand.ink : "#fff" }}>
          Z<span style={{ color: brand.accentLight }}>RTO</span>
        </span>
      )}
    </span>
  );
}