const API_URL = "http://127.0.0.1:8000";

export async function getProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/me`, {
  credentials: "include",
});

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
}