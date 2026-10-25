import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ requireAdmin = false }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-mont">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && role !== "admin") {
    return <Navigate to="/" replace />; // Kick non-admins out
  }

  return <Outlet />;
}