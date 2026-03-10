"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Modal from "@/components/ui/modal";
import { Plus, Eye, Edit, Trash2, Search, AlertTriangle, Copy, Check, Loader2, Users } from "lucide-react";
import * as fs from "@/lib/firestore-service";

const emptyTeacher = {
    name: "", subject: "", phone: "", email: "", joiningDate: new Date().toISOString().split("T")[0],
    qualification: "", salary: 0, status: "active",
};

export default function TeachersPage() {
    const { userProfile } = useAuth();
    const schoolId = userProfile?.schoolId || "";
    const [teachers, setTeachers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<{ type: string; teacher?: any } | null>(null);
    const [form, setForm] = useState<any>({ ...emptyTeacher });
    const [toast, setToast] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [generatedId, setGeneratedId] = useState("");
    const [generatedPin, setGeneratedPin] = useState("");
    const [copied, setCopied] = useState("");

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 4000); };

    const loadTeachers = async () => {
        if (!schoolId) return;
        setLoading(true);
        try { setTeachers(await fs.getTeachersBySchool(schoolId)); } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { loadTeachers(); }, [schoolId]);

    const filtered = teachers.filter(t =>
        (t.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (t.teacherId || "").toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = async () => {
        const tid = await fs.getNextTeacherId(schoolId);
        const pin = String(Math.floor(1000 + Math.random() * 9000));
        setGeneratedId(tid);
        setGeneratedPin(pin);
        setForm({ ...emptyTeacher });
        setModal({ type: "add" });
    };

    const openView = (t: any) => setModal({ type: "view", teacher: t });
    const openEdit = (t: any) => { setForm({ ...t }); setModal({ type: "edit", teacher: t }); };

    const handleSave = async () => {
        if (!form.name) return;
        setSaving(true);
        try {
            if (modal?.type === "add") {
                // Create teacher in teachers collection
                await fs.addTeacher({
                    ...form, schoolId, teacherId: generatedId, pin: generatedPin,
                });
                // Create user entry for login
                await fs.addUser({
                    email: form.email || "", password: generatedPin,
                    displayName: form.name, name: form.name,
                    role: "teacher", schoolId,
                    schoolName: userProfile?.schoolName || "",
                    teacherId: generatedId, pin: generatedPin,
                    phone: form.phone,
                });
                showToast(`Teacher added! ID: ${generatedId} | PIN: ${generatedPin}`);
            } else if (modal?.type === "edit" && modal.teacher) {
                await fs.updateTeacher(modal.teacher.id, {
                    name: form.name, subject: form.subject, phone: form.phone,
                    email: form.email, qualification: form.qualification,
                    salary: form.salary, status: form.status,
                });
                showToast("Teacher updated!");
            }
            await loadTeachers();
        } catch (err: any) { showToast("Error: " + err.message); }
        setSaving(false);
        setModal(null);
    };

    const handleDelete = async () => {
        if (!modal?.teacher) return;
        await fs.deleteTeacher(modal.teacher.id);
        showToast("Teacher deleted!");
        await loadTeachers();
        setModal(null);
    };

    const copyToClip = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(""), 2000);
    };

    const updateForm = (key: string, val: any) => setForm({ ...form, [key]: val });

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Teachers</h1>
                    <p className="page-subtitle">{teachers.length} teachers in your school</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Teacher</button>
            </div>

            <div className="filter-bar">
                <div className="filter-search"><Search size={18} style={{ color: "var(--text-muted)" }} /><input placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Loader2 size={32} className="spinner" style={{ margin: "0 auto" }} /><p style={{ marginTop: 12, color: "var(--text-muted)" }}>Loading teachers...</p></div>
            ) : teachers.length === 0 ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Users size={48} style={{ margin: "0 auto 12px", color: "var(--text-muted)" }} /><p style={{ color: "var(--text-muted)", fontSize: 16 }}>No teachers yet. Click "Add Teacher" to create one with an ID & PIN.</p></div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <table className="data-table">
                        <thead><tr><th>Teacher</th><th>ID</th><th>Subject</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{(t.name || "T").charAt(0)}</div>
                                            <div><div style={{ fontWeight: 500, fontSize: 13 }}>{t.name}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.email}</div></div>
                                        </div>
                                    </td>
                                    <td><code style={{ fontSize: 12, color: "var(--primary)" }}>{t.teacherId}</code></td>
                                    <td>{t.subject}</td>
                                    <td style={{ fontSize: 12 }}>{t.phone}</td>
                                    <td><span className={`badge ${t.status === "active" ? "badge-success" : "badge-danger"}`}>{t.status}</span></td>
                                    <td>
                                        <div style={{ display: "flex", gap: 3 }}>
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openView(t)}><Eye size={14} /></button>
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(t)}><Edit size={14} /></button>
                                            <button className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--danger)" }} onClick={() => setModal({ type: "delete", teacher: t })}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VIEW */}
            <Modal open={modal?.type === "view"} onClose={() => setModal(null)} title="Teacher Details" width={480}>
                {modal?.teacher && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 50, height: 50, borderRadius: 10, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700 }}>{(modal.teacher.name || "T").charAt(0)}</div>
                            <div><h2 style={{ fontSize: 18, fontWeight: 700 }}>{modal.teacher.name}</h2><code style={{ fontSize: 12, color: "var(--primary)" }}>{modal.teacher.teacherId}</code></div>
                        </div>
                        {[
                            { l: "Subject", v: modal.teacher.subject },
                            { l: "Phone", v: modal.teacher.phone },
                            { l: "Email", v: modal.teacher.email },
                            { l: "Qualification", v: modal.teacher.qualification },
                            { l: "Salary", v: `₹${modal.teacher.salary?.toLocaleString?.() || 0}` },
                            { l: "Joining Date", v: modal.teacher.joiningDate },
                            { l: "PIN", v: modal.teacher.pin },
                        ].map((r) => (
                            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-light)", fontSize: 13 }}>
                                <span style={{ color: "var(--text-muted)" }}>{r.l}</span>
                                <span style={{ fontWeight: 500 }}>{r.v || "—"}</span>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>

            {/* ADD/EDIT */}
            <Modal open={modal?.type === "add" || modal?.type === "edit"} onClose={() => setModal(null)} title={modal?.type === "add" ? "Add New Teacher" : "Edit Teacher"} width={600}>
                {modal?.type === "add" && (
                    <div style={{ marginBottom: 16, padding: 14, background: "rgba(99,102,241,0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(99,102,241,0.15)" }}>
                        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🔑 Generated Credentials</p>
                        <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "var(--bg-main)", padding: "8px 12px", borderRadius: "var(--radius-md)" }}>
                                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>ID:</span>
                                <code style={{ fontSize: 16, fontWeight: 700, color: "var(--primary)" }}>{generatedId}</code>
                                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => copyToClip(generatedId, "id")} style={{ marginLeft: "auto" }}>{copied === "id" ? <Check size={14} style={{ color: "var(--success)" }} /> : <Copy size={14} />}</button>
                            </div>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "var(--bg-main)", padding: "8px 12px", borderRadius: "var(--radius-md)" }}>
                                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>PIN:</span>
                                <code style={{ fontSize: 16, fontWeight: 700, color: "var(--success)" }}>{generatedPin}</code>
                                <button className="btn btn-ghost btn-icon btn-sm" onClick={() => copyToClip(generatedPin, "pin")} style={{ marginLeft: "auto" }}>{copied === "pin" ? <Check size={14} style={{ color: "var(--success)" }} /> : <Copy size={14} />}</button>
                            </div>
                        </div>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>Teacher will use this ID & PIN to login. Share these credentials securely.</p>
                    </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={(e) => updateForm("name", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Subject</label><input className="form-input" value={form.subject} onChange={(e) => updateForm("subject", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Qualification</label><input className="form-input" value={form.qualification} onChange={(e) => updateForm("qualification", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Salary (₹)</label><input className="form-input" type="number" value={form.salary} onChange={(e) => updateForm("salary", Number(e.target.value))} /></div>
                    <div className="form-group"><label className="form-label">Joining Date</label><input className="form-input" type="date" value={form.joiningDate} onChange={(e) => updateForm("joiningDate", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Status</label>
                        <select className="form-select" value={form.status} onChange={(e) => updateForm("status", e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select>
                    </div>
                </div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? <><Loader2 size={14} className="spinner" /> Saving...</> : modal?.type === "add" ? "Create Teacher" : "Save Changes"}
                    </button>
                </div>
            </Modal>

            {/* DELETE */}
            <Modal open={modal?.type === "delete"} onClose={() => setModal(null)} title="Delete Teacher" width={420}>
                <div className="confirm-delete"><AlertTriangle size={48} style={{ color: "var(--danger)", margin: "0 auto 16px" }} /><p className="name">{modal?.teacher?.name}</p><p>Are you sure? This action cannot be undone.</p></div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </Modal>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>✅ {toast}</div>}
        </div>
    );
}
