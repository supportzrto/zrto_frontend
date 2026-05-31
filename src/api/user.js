const API_URL = import.meta.env.VITE_API_URL;

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