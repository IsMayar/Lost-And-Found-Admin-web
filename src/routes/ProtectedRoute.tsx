import { Navigate } from "react-router-dom";
import { useAdminStore } from "../app/AdminStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentAdmin } = useAdminStore();
  if (!currentAdmin) return <Navigate to="/login" replace />;
  return children;
}
