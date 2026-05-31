import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config/api";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/protected`, {
          credentials: "include",
        });

        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  // ⏳ while checking
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  // ❌ not authenticated
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // ✅ authenticated
  return children;
}