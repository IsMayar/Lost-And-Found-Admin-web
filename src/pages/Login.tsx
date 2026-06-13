import { ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminStore } from "../app/AdminStore";

export function Login() {
  const { login, currentAdmin } = useAdminStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@findly.local");
  const [password, setPassword] = useState("Password123!");
  if (currentAdmin) return <Navigate to="/dashboard" replace />;
  const submit = (event: FormEvent) => { event.preventDefault(); if (login(email, password)) navigate("/dashboard"); };
  return <div className="login-page"><form className="login-card" onSubmit={submit}><div className="login-icon"><ShieldCheck size={34} /></div><h1>Findly Admin</h1><p>Sign in to moderate reports, users, claims, and AI matches.</p><label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /></label><label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" /></label><button className="primary" type="submit">Login to dashboard</button><small>Demo mode: any non-empty email and password works.</small></form></div>;
}
