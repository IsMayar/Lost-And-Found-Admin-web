import { Bell, Bot, ClipboardCheck, FileSearch, Gauge, LogOut, Menu, ScrollText, Settings, Shield, Users, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAdminStore } from "../app/AdminStore";
import { ToastViewport } from "../shared/ToastViewport";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Gauge },
  { to: "/users", label: "Users", icon: Users },
  { to: "/reports", label: "Reports", icon: FileSearch },
  { to: "/claims", label: "Claims", icon: ClipboardCheck },
  { to: "/matches", label: "AI Matches", icon: Bot },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/audit-logs", label: "Audit Logs", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { currentAdmin, logout, notifications } = useAdminStore();
  const unread = notifications.filter((n) => !n.isRead).length;
  return <div className="admin-shell">
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand"><div className="brand-icon"><Shield size={24} /></div><div><strong>Findly Admin</strong><small>Lost & Found Control</small></div></div>
      <nav>{navItems.map((item) => { const Icon=item.icon; return <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}><Icon size={18} /><span>{item.label}</span>{item.label === "Notifications" && unread > 0 && <em>{unread}</em>}</NavLink>; })}</nav>
      <button className="logout" onClick={logout}><LogOut size={18} /> Logout</button>
    </aside>
    <div className="content-shell">
      <header className="topbar"><button className="mobile-menu" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button><div><strong>{currentAdmin?.fullName}</strong><span>{currentAdmin?.role}</span></div></header>
      <main><Outlet /></main>
    </div>
    <ToastViewport />
  </div>;
}
