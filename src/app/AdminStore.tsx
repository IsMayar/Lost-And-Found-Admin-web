import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AdminUser, AuditLog, Claim, Match, Notification, Report, ReportStatus, UserStatus } from "../types/domain";
import { auditLogsSeed, claimsSeed, matchesSeed, notificationsSeed, reportsSeed, usersSeed } from "./mockData";

type ToastType = "success" | "error" | "info";
type Toast = { id: string; type: ToastType; message: string };
type Settings = { moderationMode: "manual" | "auto"; minMatchScore: number; uploadsEnabled: boolean; publicReportsEnabled: boolean };

type AdminStore = {
  currentAdmin: AdminUser | null;
  users: AdminUser[];
  reports: Report[];
  claims: Claim[];
  matches: Match[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  settings: Settings;
  toasts: Toast[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setUserStatus: (id: string, status: UserStatus) => void;
  setReportStatus: (id: string, status: ReportStatus) => void;
  approveClaim: (id: string) => void;
  rejectClaim: (id: string) => void;
  confirmMatch: (id: string) => void;
  rejectMatch: (id: string) => void;
  markNotificationRead: (id: string) => void;
  updateSettings: (settings: Settings) => void;
  dismissToast: (id: string) => void;
};

const AdminStoreContext = createContext<AdminStore | undefined>(undefined);

function id(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem("findly_admin");
    return stored ? JSON.parse(stored) as AdminUser : null;
  });
  const [users, setUsers] = useState(usersSeed);
  const [reports, setReports] = useState(reportsSeed);
  const [claims, setClaims] = useState(claimsSeed);
  const [matches, setMatches] = useState(matchesSeed);
  const [notifications, setNotifications] = useState(notificationsSeed);
  const [auditLogs, setAuditLogs] = useState(auditLogsSeed);
  const [settings, setSettings] = useState<Settings>({ moderationMode: "manual", minMatchScore: 70, uploadsEnabled: true, publicReportsEnabled: true });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (message: string, type: ToastType = "success") => {
    const toast = { id: id("toast"), type, message };
    setToasts((prev) => [toast, ...prev].slice(0, 4));
  };

  const addAudit = (action: string, entityType: string, entityId: string) => {
    setAuditLogs((prev) => [{ id: id("audit"), actor: currentAdmin?.fullName ?? "System", action, entityType, entityId, ipAddress: "127.0.0.1", createdAt: new Date().toISOString() }, ...prev]);
  };

  const value = useMemo<AdminStore>(() => ({
    currentAdmin, users, reports, claims, matches, notifications, auditLogs, settings, toasts,
    login: (email: string, password: string) => {
      if (!email || !password) { pushToast("Email and password are required", "error"); return false; }
      const admin = users.find((u) => u.role === "SUPER_ADMIN") ?? users[0];
      setCurrentAdmin(admin);
      localStorage.setItem("findly_admin", JSON.stringify(admin));
      pushToast("Admin login successful");
      return true;
    },
    logout: () => { setCurrentAdmin(null); localStorage.removeItem("findly_admin"); pushToast("Logged out", "info"); },
    setUserStatus: (userId, status) => { setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status } : u)); addAudit(`USER_${status}`, "USER", userId); pushToast(`User status changed to ${status}`); },
    setReportStatus: (reportId, status) => { setReports((prev) => prev.map((r) => r.id === reportId ? { ...r, status } : r)); addAudit(`REPORT_${status}`, "REPORT", reportId); pushToast(`Report ${status.toLowerCase().replace("_", " ")}`); },
    approveClaim: (claimId) => { setClaims((prev) => prev.map((c) => c.id === claimId ? { ...c, status: "APPROVED" } : c)); addAudit("APPROVE_CLAIM", "CLAIM", claimId); pushToast("Claim approved"); },
    rejectClaim: (claimId) => { setClaims((prev) => prev.map((c) => c.id === claimId ? { ...c, status: "REJECTED" } : c)); addAudit("REJECT_CLAIM", "CLAIM", claimId); pushToast("Claim rejected", "info"); },
    confirmMatch: (matchId) => { setMatches((prev) => prev.map((m) => m.id === matchId ? { ...m, status: "CONFIRMED" } : m)); addAudit("CONFIRM_MATCH", "MATCH", matchId); pushToast("Match confirmed"); },
    rejectMatch: (matchId) => { setMatches((prev) => prev.map((m) => m.id === matchId ? { ...m, status: "REJECTED" } : m)); addAudit("REJECT_MATCH", "MATCH", matchId); pushToast("Match rejected", "info"); },
    markNotificationRead: (notificationId) => { setNotifications((prev) => prev.map((n) => n.id === notificationId ? { ...n, isRead: true } : n)); },
    updateSettings: (next) => { setSettings(next); addAudit("UPDATE_SETTINGS", "SETTINGS", "platform"); pushToast("Settings saved"); },
    dismissToast: (toastId) => setToasts((prev) => prev.filter((t) => t.id !== toastId)),
  }), [currentAdmin, users, reports, claims, matches, notifications, auditLogs, settings, toasts]);

  return <AdminStoreContext.Provider value={value}>{children}</AdminStoreContext.Provider>;
}

export function useAdminStore() {
  const context = useContext(AdminStoreContext);
  if (!context) throw new Error("useAdminStore must be used inside AdminStoreProvider");
  return context;
}
