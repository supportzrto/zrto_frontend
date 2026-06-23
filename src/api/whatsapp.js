const API_URL = import.meta.env.VITE_API_URL;
const jsonHeaders = { "Content-Type": "application/json" };

async function handle(res) {
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || JSON.stringify(body);
    } catch (_) {}
    throw new Error(detail);
  }
  return res.json();
}

export const getDashboard = (brandId) => fetch(`${API_URL}/api/dashboard${brandId ? `?brand_id=${brandId}` : ""}`, { credentials: "include" }).then(handle);
export const getAnalytics = (brandId) => fetch(`${API_URL}/api/analytics${brandId ? `?brand_id=${brandId}` : ""}`, { credentials: "include" }).then(handle);

export const getOrders = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
  const qs = params.toString();
  return fetch(`${API_URL}/api/orders${qs ? `?${qs}` : ""}`, { credentials: "include" }).then(handle);
};

export const getOrder = (pk) => fetch(`${API_URL}/api/orders/${pk}`, { credentials: "include" }).then(handle);
export const createOrder = (data) => fetch(`${API_URL}/api/orders`, { method: "POST", headers: jsonHeaders, credentials: "include", body: JSON.stringify(data) }).then(handle);
export const orderAction = (pk, action) => fetch(`${API_URL}/api/orders/${pk}/action`, { method: "POST", headers: jsonHeaders, credentials: "include", body: JSON.stringify({ action }) }).then(handle);
export const sendWhatsApp = (orderPk) => fetch(`${API_URL}/api/send-whatsapp`, { method: "POST", headers: jsonHeaders, credentials: "include", body: JSON.stringify({ order_pk: orderPk }) }).then(handle);
export const sendReminder = (orderPk) => fetch(`${API_URL}/api/reminder`, { method: "POST", headers: jsonHeaders, credentials: "include", body: JSON.stringify({ order_pk: orderPk }) }).then(handle);
export const predictRisk = (data) => fetch(`${API_URL}/api/predict-risk`, { method: "POST", headers: jsonHeaders, credentials: "include", body: JSON.stringify(data) }).then(handle);

export const getBrands = () => fetch(`${API_URL}/api/brands`, { credentials: "include" }).then(handle);
export const getBrand = (id) => fetch(`${API_URL}/api/brands/${id}`, { credentials: "include" }).then(handle);
export const createBrand = (data) => fetch(`${API_URL}/api/brands`, { method: "POST", headers: jsonHeaders, credentials: "include", body: JSON.stringify(data) }).then(handle);
export const updateBrand = (id, data) => fetch(`${API_URL}/api/brands/${id}`, { method: "PUT", headers: jsonHeaders, credentials: "include", body: JSON.stringify(data) }).then(handle);
export const deleteBrand = (id) => fetch(`${API_URL}/api/brands/${id}`, { method: "DELETE", credentials: "include" }).then(handle);