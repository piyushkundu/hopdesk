"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Modal from "@/components/ui/modal";
import { Plus, Eye, Edit, Trash2, Search, AlertTriangle, Loader2, Users } from "lucide-react";
import * as fs from "@/lib/firestore-service";

const emptyStudent = {
    name: "", fatherName: "", className: "10", section: "A", rollNumber: "",
    phone: "", address: "", admissionDate: new Date().toISOString().split("T")[0],
    gender: "male", status: "active",
};

export default function StudentsPage() {
    const { userProfile } = useAuth();
    const schoolId = userProfile?.schoolId || "";
    const [students, setStudents] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [modal, setModal] = useState<{ type: string; student?: any } | null>(null);
    const [form, setForm] = useState<any>({ ...emptyStudent });
    const [toast, setToast] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const loadStudents = async () => {
        if (!schoolId) return;
        setLoading(true);
        try { setStudents(await fs.getStudentsBySchool(schoolId)); } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { loadStudents(); }, [schoolId]);

    const filtered = students.filter(s => {
        const match = (s.name || "").toLowerCase().includes(search.toLowerCase()) || (s.rollNumber || "").includes(search);
        const cls = classFilter ? s.className === classFilter : true;
        return match && cls;
    });

    const openAdd = async () => {
        const sid = await fs.getNextStudentId(schoolId);
        setForm({ ...emptyStudent, rollNumber: sid });
        setModal({ type: "add" });
    };
    const openView = (s: any) => setModal({ type: "view", student: s });
    const openEdit = (s: any) => { setForm({ ...s }); setModal({ type: "edit", student: s }); };

    const handleSave = async () => {
        if (!form.name) return;
        setSaving(true);
        try {
            if (modal?.type === "add") {
                await fs.addStudent({ ...form, schoolId });
                showToast(`Student "${form.name}" added!`);
            } else if (modal?.type === "edit" && modal.student) {
                await fs.updateStudent(modal.student.id, {
                    name: form.name, fatherName: form.fatherName, className: form.className,
                    section: form.section, rollNumber: form.rollNumber, phone: form.phone,
                    address: form.address, gender: form.gender, status: form.status,
                });
                showToast("Student updated!");
            }
            await loadStudents();
        } catch (err: any) { showToast("Error: " + err.message); }
        setSaving(false);
        setModal(null);
    };

    const handleDelete = async () => {
        if (!modal?.student) return;
        await fs.deleteStudent(modal.student.id);
        showToast("Student deleted!");
        await loadStudents();
        setModal(null);
    };

    const updateForm = (key: string, val: any) => setForm({ ...form, [key]: val });

    const classes = [...new Set(students.map(s => s.className))].sort();

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Students</h1>
                    <p className="page-subtitle">{students.length} students enrolled</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Student</button>
            </div>

            <div className="filter-bar">
                <div className="filter-search"><Search size={18} style={{ color: "var(--text-muted)" }} /><input placeholder="Search by name or roll..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                <select className="form-select" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                    <option value="">All Classes</option>
                    {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
                </select>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Loader2 size={32} className="spinner" style={{ margin: "0 auto" }} /><p style={{ marginTop: 12, color: "var(--text-muted)" }}>Loading students...</p></div>
            ) : students.length === 0 ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Users size={48} style={{ margin: "0 auto 12px", color: "var(--text-muted)" }} /><p style={{ color: "var(--text-muted)", fontSize: 16 }}>No students yet. Click "Add Student" to enroll one.</p></div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <table className="data-table">
                        <thead><tr><th>Student</th><th>Roll No</th><th>Class</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{(s.name || "S").charAt(0)}</div>
                                            <div><div style={{ fontWeight: 500, fontSize: 13 }}>{s.name}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>F: {s.fatherName}</div></div>
                                        </div>
                                    </td>
                                    <td><code style={{ fontSize: 12, color: "var(--primary)" }}>{s.rollNumber}</code></td>
                                    <td>{s.className}-{s.section}</td>
                                    <td style={{ fontSize: 12 }}>{s.phone}</td>
                                    <td><span className={`badge ${s.status === "active" ? "badge-success" : "badge-danger"}`}>{s.status}</span></td>
                                    <td>
                                        <div style={{ display: "flex", gap: 3 }}>
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openView(s)}><Eye size={14} /></button>
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(s)}><Edit size={14} /></button>
                                            <button className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--danger)" }} onClick={() => setModal({ type: "delete", student: s })}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VIEW */}
            <Modal open={modal?.type === "view"} onClose={() => setModal(null)} title="Student Details" width={480}>
                {modal?.student && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 50, height: 50, borderRadius: 10, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700 }}>{(modal.student.name || "S").charAt(0)}</div>
                            <div><h2 style={{ fontSize: 18, fontWeight: 700 }}>{modal.student.name}</h2><code style={{ fontSize: 12, color: "var(--primary)" }}>{modal.student.rollNumber}</code></div>
                        </div>
                        {[
                            { l: "Father's Name", v: modal.student.fatherName },
                            { l: "Class", v: `${modal.student.className}-${modal.student.section}` },
                            { l: "Phone", v: modal.student.phone },
                            { l: "Gender", v: modal.student.gender },
                            { l: "Address", v: modal.student.address },
                            { l: "Admission Date", v: modal.student.admissionDate },
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
            <Modal open={modal?.type === "add" || modal?.type === "edit"} onClose={() => setModal(null)} title={modal?.type === "add" ? "Add New Student" : "Edit Student"} width={600}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={(e) => updateForm("name", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Father&apos;s Name</label><input className="form-input" value={form.fatherName} onChange={(e) => updateForm("fatherName", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Class</label>
                        <select className="form-select" value={form.className} onChange={(e) => updateForm("className", e.target.value)}>
                            {[...Array(12)].map((_, i) => <option key={i + 1} value={String(i + 1)}>{i + 1}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Section</label>
                        <select className="form-select" value={form.section} onChange={(e) => updateForm("section", e.target.value)}>
                            {["A", "B", "C", "D"].map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Roll Number</label><input className="form-input" value={form.rollNumber} onChange={(e) => updateForm("rollNumber", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Gender</label>
                        <select className="form-select" value={form.gender} onChange={(e) => updateForm("gender", e.target.value)}>
                            <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Admission Date</label><input className="form-input" type="date" value={form.admissionDate} onChange={(e) => updateForm("admissionDate", e.target.value)} /></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Address</label><input className="form-input" value={form.address} onChange={(e) => updateForm("address", e.target.value)} /></div>
                </div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? <><Loader2 size={14} className="spinner" /> Saving...</> : modal?.type === "add" ? "Add Student" : "Save Changes"}
                    </button>
                </div>
            </Modal>

            {/* DELETE */}
            <Modal open={modal?.type === "delete"} onClose={() => setModal(null)} title="Delete Student" width={420}>
                <div className="confirm-delete"><AlertTriangle size={48} style={{ color: "var(--danger)", margin: "0 auto 16px" }} /><p className="name">{modal?.student?.name}</p><p>Are you sure? This action cannot be undone.</p></div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </Modal>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>✅ {toast}</div>}
        </div>
    );
}
