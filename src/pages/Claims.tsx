import { useAdminStore } from "../app/AdminStore";
import { Badge } from "../shared/Badge";
import { PageHeader } from "../shared/PageHeader";

export function Claims() {
  const { claims, approveClaim, rejectClaim } = useAdminStore();
  return <section><PageHeader title="Claims" description="Moderate ownership claims and evidence." />
    <div className="cards-grid">{claims.map((c)=><article className="report-card" key={c.id}><div className="report-top"><Badge tone={c.status === "PENDING" ? "warning" : c.status === "APPROVED" ? "success" : "danger"}>{c.status}</Badge><span>{new Date(c.createdAt).toLocaleDateString()}</span></div><h3>{c.reportTitle}</h3><p>{c.proofDescription}</p><div className="meta"><span>Claimant: {c.claimantName}</span><span>Owner: {c.ownerName}</span><span>{c.contact}</span></div><div className="actions"><button onClick={()=>approveClaim(c.id)}>Approve</button><button onClick={()=>rejectClaim(c.id)}>Reject</button></div></article>)}</div>
  </section>;
}
