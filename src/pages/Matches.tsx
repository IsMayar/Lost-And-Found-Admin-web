import { useAdminStore } from "../app/AdminStore";
import { Badge } from "../shared/Badge";
import { PageHeader } from "../shared/PageHeader";

export function Matches() {
  const { matches, confirmMatch, rejectMatch } = useAdminStore();
  return <section><PageHeader title="AI Matches" description="Review generated lost/found pair suggestions before users act on them." />
    <div className="cards-grid">{matches.map((m)=><article className="report-card" key={m.id}><div className="report-top"><Badge tone={m.score >= 70 ? "success" : m.score >= 40 ? "warning" : "danger"}>{m.score}%</Badge><Badge tone={m.status === "CONFIRMED" ? "success" : m.status === "REJECTED" ? "danger" : "info"}>{m.status}</Badge></div><h3>{m.lostTitle} ↔ {m.foundTitle}</h3><p>{m.evidence.join(" • ")}</p><div className="actions"><button onClick={()=>confirmMatch(m.id)}>Confirm</button><button onClick={()=>rejectMatch(m.id)}>Reject</button></div></article>)}</div>
  </section>;
}
