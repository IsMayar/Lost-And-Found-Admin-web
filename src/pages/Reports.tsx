import { useMemo, useState } from "react";
import { useAdminStore } from "../app/AdminStore";
import { Badge } from "../shared/Badge";
import { PageHeader } from "../shared/PageHeader";

export function Reports() {
  const { reports, setReportStatus } = useAdminStore();
  const [status, setStatus] = useState("ALL");
  const filtered = useMemo(() => status === "ALL" ? reports : reports.filter((r) => r.status === status), [reports, status]);
  return <section><PageHeader title="Reports Moderation" description="Review, approve, reject, resolve, or close lost and found reports." action={<select value={status} onChange={(e)=>setStatus(e.target.value)}><option>ALL</option><option>PENDING_REVIEW</option><option>ACTIVE</option><option>MATCHED</option><option>RESOLVED</option><option>REJECTED</option></select>} />
    <div className="cards-grid">{filtered.map((r)=><article className="report-card" key={r.id}><div className="report-top"><Badge tone={r.type === "LOST" ? "danger" : "success"}>{r.type}</Badge><Badge tone={r.status === "ACTIVE" ? "success" : r.status === "PENDING_REVIEW" ? "warning" : "neutral"}>{r.status}</Badge></div><h3>{r.title}</h3><p>{r.description}</p><div className="meta"><span>{r.category}</span><span>{r.location}</span><span>Risk {r.riskScore}%</span></div><div className="actions"><button onClick={()=>setReportStatus(r.id,"ACTIVE")}>Approve</button><button onClick={()=>setReportStatus(r.id,"REJECTED")}>Reject</button><button onClick={()=>setReportStatus(r.id,"RESOLVED")}>Resolve</button><button onClick={()=>setReportStatus(r.id,"CLOSED")}>Close</button></div></article>)}</div>
  </section>;
}
