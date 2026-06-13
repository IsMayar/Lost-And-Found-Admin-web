import { X } from "lucide-react";
import { useAdminStore } from "../app/AdminStore";

export function ToastViewport() {
  const { toasts, dismissToast } = useAdminStore();
  return <div className="toast-viewport">{toasts.map((toast) => <div key={toast.id} className={`toast toast-${toast.type}`}><span>{toast.message}</span><button onClick={() => dismissToast(toast.id)} aria-label="Dismiss"><X size={16} /></button></div>)}</div>;
}
