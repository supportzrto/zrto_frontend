export async function getUsage() {

  const res = await fetch(`${import.meta.env.VITE_API_URL}/usage`, {
    credentials: "include",
  });

  return res.json();
}

export const getProtectedData = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/protected`, {
    method: "GET",
    credentials: "include", 
  });

  return res.json();
};