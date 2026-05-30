import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";

export default function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}