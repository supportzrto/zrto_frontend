import { createContext, useCallback, useContext, useRef, useState } from "react";
import { brand } from "../config/theme";

const ToastContext = createContext(null);

const ICONS = { success: "✓", error: "⚠️", info: "ℹ️" };
const PALETTE = {
  success: { bg: "#fff", border: brand.successBorder, accent: brand.success },
  error: { bg: "#fff", border: brand.errorBorder, accent: brand.error },
  info: { bg: "#fff", border: brand.infoBorder, accent: brand.primary },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const toast = {
    success: (message, duration) => show(message, "success", duration),
    error: (message, duration) => show(message, "error", duration),
    info: (message, duration) => show(message, "info", duration),
    dismiss,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div
        aria-live="polite"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          left: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => {
          const p = PALETTE[t.type] || PALETTE.info;
          return (
            <div
              key={t.id}
              role="status"
              style={{
                pointerEvents: "auto",
                width: "100%",
                maxWidth: 360,
                background: p.bg,
                border: `1.5px solid ${p.border}`,
                borderLeft: `4px solid ${p.accent}`,
                borderRadius: 14,
                padding: "12px 14px",
                boxShadow: "0 10px 30px rgba(30,27,75,0.15)",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                animation: "zrto-toast-in 0.25s ease-out",
              }}
            >
              <span style={{ color: p.accent, fontWeight: 700, flexShrink: 0, lineHeight: "18px" }}>
                {ICONS[t.type] || ICONS.info}
              </span>
              <span style={{ color: brand.ink, fontSize: 13.5, fontWeight: 500, flex: 1, lineHeight: 1.4 }}>
                {t.message}
              </span>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: brand.faint,
                  fontSize: 14,
                  lineHeight: 1,
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes zrto-toast-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}