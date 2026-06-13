import { useAdminStore } from "../app/AdminStore";
import { Badge } from "../shared/Badge";
import { PageHeader } from "../shared/PageHeader";

export function AuditLogs() {
  const { auditLogs } = useAdminStore();
  return <section><PageHeader title="Audit Logs" description="Trace sensitive admin actions for accountability." />
    <div className="table-card"><table><thead><tr><th>Actor</th><th>Action</th><th>Entity</th><th>IP</th><th>Date</th></tr></thead><tbody>{auditLogs.map((log)=><tr key={log.id}><td>{log.actor}</td><td><Badge tone="info">{log.action}</Badge></td><td>{log.entityType} / {log.entityId}</td><td>{log.ipAddress}</td><td>{new Date(log.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>
  </section>;
}
