import { useAdminStore } from "../app/AdminStore";
import { Badge } from "../shared/Badge";
import { PageHeader } from "../shared/PageHeader";

export function Notifications() {
  const { notifications, markNotificationRead } = useAdminStore();
  return <section><PageHeader title="Notifications" description="Monitor user-facing system notifications." />
    <div className="panel">{notifications.map((n)=><div className="list-row" key={n.id}><div><strong>{n.title}</strong><span>{n.message}</span><small>{n.userName} - {new Date(n.createdAt).toLocaleString()}</small></div><div className="actions"><Badge tone={n.isRead ? "neutral" : "info"}>{n.isRead ? "READ" : "UNREAD"}</Badge>{!n.isRead && <button onClick={()=>markNotificationRead(n.id)}>Mark read</button>}</div></div>)}</div>
  </section>;
}
