import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Users } from "../pages/Users";
import { Reports } from "../pages/Reports";
import { Claims } from "../pages/Claims";
import { Matches } from "../pages/Matches";
import { Notifications } from "../pages/Notifications";
import { AuditLogs } from "../pages/AuditLogs";
import { Settings } from "../pages/Settings";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "reports", element: <Reports /> },
      { path: "claims", element: <Claims /> },
      { path: "matches", element: <Matches /> },
      { path: "notifications", element: <Notifications /> },
      { path: "audit-logs", element: <AuditLogs /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
