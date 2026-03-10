"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Building2, Plus, Eye, Edit, Trash2, Search, Power, PowerOff, AlertTriangle, RotateCcw, Users, UserCog, Calendar, Loader2 } from "lucide-react";
import * as fs from "@/lib/firestore-service";

interface School {
    id: string; name: string; code: string; adminName: string; adminEmail: string; adminPhone: string;
    adminPassword: string; address: string; city: string; state: string; plan: string; status: string;
    expiryDate: string; createdAt: any;
}

const planBadge: Record<string, string> = { Enterprise: "badge-danger", Premium: "badge-primary", Standard: "badge-warning", Basic: "badge-info" };
const statusBadge: Record<string, string> = { active: "badge-success", inactive: "badge-danger", suspended: "badge-warning" };

const emptyForm = { name: "", code: "", adminName: "", adminEmail: "", adminPhone: "", adminPassword: "", address: "", city: "", state: "", plan: "Standard", status: "active", expiryDate: "" };

export default function SchoolsPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [modal, setModal] = useState<{ type: string; school?: School } | null>(null);
    const [form, setForm] = useState<any>({ ...emptyForm });
    const [toast, setToast] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const loadSchools = async () => {
        setLoading(true);
        try {
            const data = await fs.getSchools();
            setSchools(data as any);
        } catch (err) {
            console.error("Error loading schools:", err);
        }
        setLoading(false);
    };

    useEffect(() => { loadSchools(); }, []);

    const filtered = schools.filter(s => {
        const match = (s.name || "").toLowerCase().includes(search.toLowerCase()) || (s.code || "").toLowerCase().includes(search.toLowerCase());
        const st = statusFilter ? s.status === statusFilter : true;
        return match && st;
    });

    const openAdd = async () => {
        let code = "SCH001";
        try { code = await fs.getNextSchoolCode(); } catch (err) { console.error("Code gen error:", err); }
        setForm({ ...emptyForm, code, adminPassword: Math.random().toString(36).slice(-8) });
        setModal({ type: "add" });
    };
    const openView = (s: School) => setModal({ type: "view", school: s });
    const openEdit = (s: School) => { setForm({ ...s }); setModal({ type: "edit", school: s }); };

    const handleSave = async () => {
        if (!form.name || !form.adminEmail) return;
        setSaving(true);
        try {
            if (modal?.type === "add") {
                // Create school
                const schoolId = await fs.addSchool({
                    name: form.name, code: form.code, adminName: form.adminName,
                    adminEmail: form.adminEmail, adminPhone: form.adminPhone,
                    address: form.address, city: form.city, state: form.state,
                    plan: form.plan, status: form.status, expiryDate: form.expiryDate,
                });
                // Create school admin user in users collection
                await fs.addUser({
                    email: form.adminEmail, password: form.adminPassword,
                    displayName: form.adminName, name: form.adminName,
                    role: "admin", schoolId, schoolName: form.name,
                    phone: form.adminPhone,
                });
                showToast(`School "${form.name}" created! Admin: ${form.adminEmail} / ${form.adminPassword}`);
            } else if (modal?.type === "edit" && modal.school) {
                await fs.updateSchool(modal.school.id, {
                    name: form.name, adminName: form.adminName, adminEmail: form.adminEmail,
                    adminPhone: form.adminPhone, address: form.address, city: form.city,
                    state: form.state, plan: form.plan, status: form.status, expiryDate: form.expiryDate,
                });
                showToast("School updated!");
            }
            await loadSchools();
        } catch (err: any) {
            showToast("Error: " + err.message);
        }
        setSaving(false);
        setModal(null);
    };

    const toggleStatus = async (school: School, newStatus: string) => {
        await fs.updateSchool(school.id, { status: newStatus });
        showToast(`${school.name} → ${newStatus}!`);
        await loadSchools();
        setModal(null);
    };

    const handleDelete = async (school: School) => {
        await fs.deleteSchool(school.id);
        showToast(`${school.name} deleted!`);
        await loadSchools();
        setModal(null);
    };

    const activeCount = schools.filter(s => s.status === "active").length;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Schools</h1>
                    <p className="page-subtitle">Manage all registered schools — {schools.length} total, {activeCount} active</p>
                </div>
                <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} onClick={openAdd}><Plus size={16} /> Add School</button>
            </div>

            <div className="filter-bar">
                <div className="filter-search"><Search size={18} style={{ color: "var(--text-muted)" }} /><input placeholder="Search by name or code..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="suspended">Suspended</option>
                </select>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Loader2 size={32} className="spinner" style={{ margin: "0 auto" }} /><p style={{ marginTop: 12, color: "var(--text-muted)" }}>Loading schools...</p></div>
            ) : schools.length === 0 ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Building2 size={48} style={{ margin: "0 auto 12px", color: "var(--text-muted)" }} /><p style={{ color: "var(--text-muted)", fontSize: 16 }}>No schools yet. Click "Add School" to get started!</p></div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <table className="data-table">
                        <thead><tr><th>School</th><th>Code</th><th>Plan</th><th>Status</th><th>Admin</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{(s.name || "S").charAt(0)}</div>
                                            <div><div style={{ fontWeight: 500, fontSize: 13 }}>{s.name}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.city}, {s.state}</div></div>
                                        </div>
                                    </td>
                                    <td><code style={{ fontSize: 12, color: "#6366f1" }}>{s.code}</code></td>
                                    <td><span className={`badge ${planBadge[s.plan] || "badge-info"}`}>{s.plan}</span></td>
                                    <td><span className={`badge ${statusBadge[s.status] || "badge-info"}`}>{s.status}</span></td>
                                    <td style={{ fontSize: 12 }}>{s.adminEmail}</td>
                                    <td>
                                        <div style={{ display: "flex", gap: 3 }}>
                                            <button className="btn btn-ghost btn-icon btn-sm" title="View" onClick={() => openView(s)}><Eye size={14} /></button>
                                            <button className="btn btn-ghost btn-icon btn-sm" title="Edit" onClick={() => openEdit(s)}><Edit size={14} /></button>
                                            {s.status === "active" ? (
                                                <button className="btn btn-ghost btn-icon btn-sm" title="Deactivate" style={{ color: "var(--danger)" }} onClick={() => toggleStatus(s, "inactive")}><PowerOff size={14} /></button>
                                            ) : (
                                                <button className="btn btn-ghost btn-icon btn-sm" title="Activate" style={{ color: "var(--success)" }} onClick={() => toggleStatus(s, "active")}><Power size={14} /></button>
                                            )}
                                            <button className="btn btn-ghost btn-icon btn-sm" title="Delete" style={{ color: "var(--danger)" }} onClick={() => setModal({ type: "delete", school: s })}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VIEW MODAL */}
            <Modal open={modal?.type === "view"} onClose={() => setModal(null)} title="School Details" width={520}>
                {modal?.school && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: 14, background: "#eef2ff", borderRadius: "var(--radius-md)" }}>
                            <div style={{ width: 50, height: 50, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 22, fontWeight: 700 }}>{(modal.school.name || "S").charAt(0)}</div>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 700 }}>{modal.school.name}</h2>
                                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                                    <code style={{ fontSize: 12, color: "#6366f1" }}>{modal.school.code}</code>
                                    <span className={`badge ${planBadge[modal.school.plan] || ""}`}>{modal.school.plan}</span>
                                    <span className={`badge ${statusBadge[modal.school.status] || ""}`}>{modal.school.status}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: 14 }}>
                            <p style={{ fontSize: 13, marginBottom: 6 }}><strong>Admin:</strong> {modal.school.adminName}</p>
                            <p style={{ fontSize: 13, marginBottom: 6 }}><strong>Email:</strong> {modal.school.adminEmail}</p>
                            <p style={{ fontSize: 13, marginBottom: 6 }}><strong>Phone:</strong> {modal.school.adminPhone}</p>
                            <p style={{ fontSize: 13, marginBottom: 6 }}><strong>Address:</strong> {modal.school.address}, {modal.school.city}, {modal.school.state}</p>
                            <p style={{ fontSize: 13 }}><strong>Expiry:</strong> {modal.school.expiryDate}</p>
                        </div>
                        <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 14 }}>
                            {modal.school.status === "active" ? (
                                <button className="btn btn-danger" onClick={() => toggleStatus(modal.school!, "inactive")}><PowerOff size={14} /> Deactivate</button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => toggleStatus(modal.school!, "active")}><Power size={14} /> Activate</button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            {/* ADD/EDIT MODAL */}
            <Modal open={modal?.type === "add" || modal?.type === "edit"} onClose={() => setModal(null)} title={modal?.type === "add" ? "Add New School" : "Edit School"} width={640}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group"><label className="form-label">School Name *</label><input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">School Code</label><input className="form-input" value={form.code} readOnly style={{ opacity: 0.7 }} /></div>
                    <div className="form-group"><label className="form-label">Admin Name *</label><input className="form-input" value={form.adminName} onChange={(e) => setForm({ ...form, adminName: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Admin Email *</label><input className="form-input" type="email" value={form.adminEmail} onChange={(e) => setForm({ ...form, adminEmail: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Admin Phone</label><input className="form-input" value={form.adminPhone} onChange={(e) => setForm({ ...form, adminPhone: e.target.value })} /></div>
                    {modal?.type === "add" && (
                        <div className="form-group"><label className="form-label">Admin Password</label><input className="form-input" value={form.adminPassword} onChange={(e) => setForm({ ...form, adminPassword: e.target.value })} /><p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Auto-generated. Admin uses this to login.</p></div>
                    )}
                    <div className="form-group"><label className="form-label">Plan</label>
                        <select className="form-select" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}><option>Basic</option><option>Standard</option><option>Premium</option><option>Enterprise</option></select>
                    </div>
                    <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">State</label><input className="form-input" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Address</label><input className="form-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Expiry Date</label><input className="form-input" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Status</label>
                        <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select>
                    </div>
                </div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} onClick={handleSave} disabled={saving}>
                        {saving ? <><Loader2 size={14} className="spinner" /> Saving...</> : modal?.type === "add" ? "Create School" : "Save Changes"}
                    </button>
                </div>
            </Modal>

            {/* DELETE MODAL */}
            <Modal open={modal?.type === "delete"} onClose={() => setModal(null)} title="Delete School" width={420}>
                <div className="confirm-delete">
                    <AlertTriangle size={48} style={{ color: "var(--danger)", margin: "0 auto 16px" }} />
                    <p className="name">{modal?.school?.name}</p>
                    <p>This will permanently delete this school. This action cannot be undone.</p>
                </div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => modal?.school && handleDelete(modal.school)}>Delete School</button>
                </div>
            </Modal>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>✅ {toast}</div>}
        </div>
    );
}
