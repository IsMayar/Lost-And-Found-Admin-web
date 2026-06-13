import { useAdminStore } from "../app/AdminStore";
import { PageHeader } from "../shared/PageHeader";
import { StatCard } from "../shared/StatCard";
import { Badge } from "../shared/Badge";

export function Dashboard() {
  const { users, reports, claims, matches, auditLogs } = useAdminStore();
  const pendingReports = reports.filter((r) => r.status === "PENDING_REVIEW").length;
  const activeClaims = claims.filter((c) => c.status === "PENDING" || c.status === "NEEDS_MORE_INFO").length;
  const highMatches = matches.filter((m) => m.score >= 70).length;
  return <section><PageHeader title="Admin Dashboard" description="Operational overview for lost and found moderation." />
    <div className="stats-grid"><StatCard label="Users" value={users.length} hint="Registered accounts" /><StatCard label="Reports" value={reports.length} hint={`${pendingReports} pending review`} /><StatCard label="Active claims" value={activeClaims} hint="Need moderation" /><StatCard label="High AI matches" value={highMatches} hint="Score >= 70" /></div>
    <div className="grid-2"><div className="panel"><h2>Reports needing review</h2>{reports.filter((r)=>r.status==="PENDING_REVIEW").map((r)=><div className="list-row" key={r.id}><div><strong>{r.title}</strong><span>{r.location}</span></div><Badge tone="warning">{r.status}</Badge></div>)}</div><div className="panel"><h2>Recent audit logs</h2>{auditLogs.slice(0,5).map((log)=><div className="list-row" key={log.id}><div><strong>{log.action}</strong><span>{log.actor} - {new Date(log.createdAt).toLocaleString()}</span></div><Badge tone="info">{log.entityType}</Badge></div>)}</div></div>
  </section>;
}
