import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

export default function DashboardLayout({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}