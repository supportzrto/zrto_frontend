// Central brand palette — used across the app so colors stay consistent.
// Update here and it propagates anywhere that imports from this file.
export const brand = {
  // Core gradient (buttons, left panel, accents)
  primary: "#4f46e5", // indigo-600
  primaryDark: "#7c3aed", // violet-600
  gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  panelGradient: "linear-gradient(135deg, #1a1a6e, #4f46e5, #7c3aed)",
  pageGradient: "linear-gradient(135deg, #f0f4ff 0%, #e8e0ff 100%)",

  // Accent (logo "AI" mark, highlights)
  accent: "#f97316", // orange-500
  accentLight: "#fb923c", // orange-400

  // Text
  ink: "#1e1b4b", // headings / primary text
  muted: "#6b7280", // secondary text
  faint: "#9ca3af", // tertiary / helper text

  // Surfaces
  surface: "#f5f3ff", // input backgrounds
  border: "#e0e7ff", // input / card borders

  // Status
  success: "#16a34a",
  successBg: "#f0fdf4",
  successBorder: "#bbf7d0",
  error: "#b91c1c",
  errorBg: "#fef2f2",
  errorBorder: "#fecaca",
  info: "#4f46e5",
  infoBg: "#f5f3ff",
  infoBorder: "#e0e7ff",

  // Disabled state
  disabled: "#a5b4fc",
};

// Shared input style used across auth forms.
export const inputStyle = {
  background: brand.surface,
  border: `2px solid ${brand.border}`,
  color: brand.ink,
};

export const focusBorder = (e) => (e.target.style.borderColor = brand.primary);
export const blurBorder = (e) => (e.target.style.borderColor = brand.border);