const API_URL = "http://127.0.0.1:8000";

// Common headers (NO TOKEN)
const getHeaders = () => ({
  "Content-Type": "application/json",
});

// ── AUTH ──
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
    credentials: "include", // 🔥 VERY IMPORTANT
  });
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

export async function getCurrentUser() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
    });

    if (res.status === 401) return null;

    return await res.json();
  } catch (err) {
    console.error("Auth error:", err);
    return null;
  }
}

// ── USAGE ──
export const getUsage = async () => {
  const res = await fetch(`${API_URL}/usage`, {
    credentials: "include",
  });
  return res.json();
};

// ── STATS ──
export const getStats = async () => {
  const res = await fetch(`${API_URL}/api/stats`, {
    credentials: "include",
  });
  return res.json();
};

// ── PREDICTION HISTORY ──
export const getPredictionHistory = async () => {
  const res = await fetch(`${API_URL}/api/prediction-history`, {
    credentials: "include",
  });
  return res.json();
};

// ── API LOGS ──
export const getApiLogs = async () => {
  const res = await fetch(`${API_URL}/api/logs`, {
    credentials: "include",
  });
  return res.json();
};

// ── API KEY (SAFE NOW - backend controlled) ──
export const getApiKey = async () => {
  const res = await fetch(`${API_URL}/api/key`, {
    credentials: "include",
  });
  return res.json();
};

export const regenerateApiKey = async () => {
  const res = await fetch(`${API_URL}/api/regenerate-key`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

export const enableApiKey = async () => {
  const res = await fetch(`${API_URL}/api/key/enable`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

export const disableApiKey = async () => {
  const res = await fetch(`${API_URL}/api/key/disable`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

// ── ADMIN ──
export const getAdminAnalytics = async () => {
  const res = await fetch(`${API_URL}/admin/analytics`, {
    credentials: "include",
  });
  return res.json();
};

// ── PREDICT (CSV) ──
export const predictOrders = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    credentials: "include", // 🔥 important
    body: formData,
  });

  return res.json();
};