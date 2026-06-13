import { useMemo, useState } from "react";
import { useAdminStore } from "../app/AdminStore";
import { Badge } from "../shared/Badge";
import { PageHeader } from "../shared/PageHeader";

export function Users() {
  const { users, setUserStatus } = useAdminStore();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => users.filter((u) => `${u.fullName} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase())), [users, query]);
  return <section><PageHeader title="Users" description="Manage accounts, roles, and suspended users." action={<input className="search" placeholder="Search users..." value={query} onChange={(e)=>setQuery(e.target.value)} />} />
    <div className="table-card"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Reports</th><th>Claims</th><th>Actions</th></tr></thead><tbody>{filtered.map((u)=><tr key={u.id}><td>{u.fullName}</td><td>{u.email}</td><td>{u.role}</td><td><Badge tone={u.status === "ACTIVE" ? "success" : u.status === "SUSPENDED" ? "warning" : "danger"}>{u.status}</Badge></td><td>{u.reportsCount}</td><td>{u.claimsCount}</td><td className="actions"><button onClick={()=>setUserStatus(u.id,"ACTIVE")}>Activate</button><button onClick={()=>setUserStatus(u.id,"SUSPENDED")}>Suspend</button></td></tr>)}</tbody></table></div>
  </section>;
}
