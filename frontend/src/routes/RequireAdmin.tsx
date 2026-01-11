import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAdmin() {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn || userRole !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
