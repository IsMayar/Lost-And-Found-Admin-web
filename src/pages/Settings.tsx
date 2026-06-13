import { FormEvent, useState } from "react";
import { useAdminStore } from "../app/AdminStore";
import { PageHeader } from "../shared/PageHeader";

export function Settings() {
  const { settings, updateSettings } = useAdminStore();
  const [draft, setDraft] = useState(settings);
  const submit = (event: FormEvent) => { event.preventDefault(); updateSettings(draft); };
  return <section><PageHeader title="Settings" description="Configure moderation and platform behavior." />
    <form className="settings-form" onSubmit={submit}><label>Moderation mode<select value={draft.moderationMode} onChange={(e)=>setDraft({...draft, moderationMode: e.target.value as "manual" | "auto"})}><option value="manual">Manual review</option><option value="auto">Auto approve low risk</option></select></label><label>Minimum match score<input type="number" min={0} max={100} value={draft.minMatchScore} onChange={(e)=>setDraft({...draft, minMatchScore: Number(e.target.value)})} /></label><label className="check"><input type="checkbox" checked={draft.uploadsEnabled} onChange={(e)=>setDraft({...draft, uploadsEnabled: e.target.checked})} /> Uploads enabled</label><label className="check"><input type="checkbox" checked={draft.publicReportsEnabled} onChange={(e)=>setDraft({...draft, publicReportsEnabled: e.target.checked})} /> Public reports enabled</label><button className="primary">Save settings</button></form>
  </section>;
}
