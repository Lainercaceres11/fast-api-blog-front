import { Navigate, Outlet } from "react-router";
import { useUser } from "../context/user-context";

export function ProtectedRoute() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
