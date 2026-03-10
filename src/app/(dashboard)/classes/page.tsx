"use client";

import { useState } from "react";
import { demoClasses } from "@/lib/demo-data";
import { SchoolClass } from "@/types";
import Modal from "@/components/ui/modal";
import { Plus, School, Users, UserCog, DoorOpen, Eye, Edit, Trash2, AlertTriangle } from "lucide-react";

const emptyClass: Omit<SchoolClass, "id" | "createdAt" | "updatedAt"> = {
    className: "", section: "A", classTeacher: "", classTeacherName: "", roomNumber: "", studentCount: 0,
};

export default function ClassesPage() {
    const [classes, setClasses] = useState<SchoolClass[]>([...demoClasses]);
    const [modal, setModal] = useState<{ type: "view" | "add" | "edit" | "delete"; cls?: SchoolClass } | null>(null);
    const [form, setForm] = useState<any>({ ...emptyClass });
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
    const openAdd = () => { setForm({ ...emptyClass }); setModal({ type: "add" }); };
    const openView = (c: SchoolClass) => setModal({ type: "view", cls: c });
    const openEdit = (c: SchoolClass) => { setForm({ ...c }); setModal({ type: "edit", cls: c }); };
    const openDelete = (c: SchoolClass) => setModal({ type: "delete", cls: c });
    const updateForm = (key: string, val: any) => setForm({ ...form, [key]: val });

    const handleSave = () => {
        if (!form.className || !form.section) return;
        if (modal?.type === "add") {
            const newC: SchoolClass = { ...form, id: `CLS${String(classes.length + 1).padStart(3, "0")}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
            setClasses([...classes, newC]);
            showToast(`Class ${form.className}-${form.section} created!`);
        } else if (modal?.type === "edit" && modal.cls) {
            setClasses(classes.map(c => c.id === modal.cls!.id ? { ...c, ...form, updatedAt: new Date().toISOString() } : c));
            showToast(`Class ${form.className}-${form.section} updated!`);
        }
        setModal(null);
    };

    const handleDelete = () => {
        if (modal?.cls) {
            setClasses(classes.filter(c => c.id !== modal.cls!.id));
            showToast(`Class ${modal.cls.className}-${modal.cls.section} deleted!`);
        }
        setModal(null);
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">Classes & Sections</h1><p className="page-subtitle">Manage classes, sections, and assignments</p></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Create Class</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <School size={20} style={{ color: "var(--primary-light)" }} />
                        </div>
                        <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Classes</p><p style={{ fontSize: 20, fontWeight: 700 }}>{classes.length}</p></div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Users size={20} style={{ color: "var(--secondary-light)" }} />
                        </div>
                        <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Students</p><p style={{ fontSize: 20, fontWeight: 700 }}>{classes.reduce((a, b) => a + (b.studentCount || 0), 0)}</p></div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <DoorOpen size={20} style={{ color: "var(--success-light)" }} />
                        </div>
                        <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>Avg. Students/Class</p><p style={{ fontSize: 20, fontWeight: 700 }}>{classes.length ? Math.round(classes.reduce((a, b) => a + (b.studentCount || 0), 0) / classes.length) : 0}</p></div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }} className="stagger-children">
                {classes.map((cls) => (
                    <div key={cls.id} className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "white" }}>
                                    {cls.className}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Class {cls.className}-{cls.section}</h3>
                                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Room {cls.roomNumber}</p>
                                </div>
                            </div>
                            <span className="badge badge-success">Active</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                            <div style={{ padding: 12, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                    <Users size={14} style={{ color: "var(--text-muted)" }} /><span style={{ fontSize: 11, color: "var(--text-muted)" }}>Students</span>
                                </div>
                                <p style={{ fontSize: 18, fontWeight: 600 }}>{cls.studentCount}</p>
                            </div>
                            <div style={{ padding: 12, background: "rgba(6, 182, 212, 0.06)", borderRadius: "var(--radius-sm)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                    <UserCog size={14} style={{ color: "var(--text-muted)" }} /><span style={{ fontSize: 11, color: "var(--text-muted)" }}>Class Teacher</span>
                                </div>
                                <p style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cls.classTeacherName}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => openView(cls)}><Eye size={14} /> View</button>
                            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => openEdit(cls)}><Edit size={14} /> Edit</button>
                            <button className="btn btn-ghost btn-sm" style={{ flex: 1, color: "var(--danger)" }} onClick={() => openDelete(cls)}><Trash2 size={14} /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* VIEW MODAL */}
            <Modal open={modal?.type === "view"} onClose={() => setModal(null)} title="Class Details" width={480}>
                {modal?.cls && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--primary), #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "white" }}>
                                {modal.cls.className}
                            </div>
                            <div>
                                <h2 style={{ fontSize: 20, fontWeight: 700 }}>Class {modal.cls.className}-{modal.cls.section}</h2>
                                <span className="badge badge-success">Active</span>
                            </div>
                        </div>
                        {[
                            { icon: School, label: "Class", value: `${modal.cls.className}-${modal.cls.section}` },
                            { icon: DoorOpen, label: "Room Number", value: modal.cls.roomNumber || "N/A" },
                            { icon: UserCog, label: "Class Teacher", value: modal.cls.classTeacherName || "N/A" },
                            { icon: Users, label: "Student Count", value: String(modal.cls.studentCount || 0) },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--border-light)" : "none" }}>
                                <item.icon size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} /><div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p><p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p></div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>

            {/* ADD / EDIT MODAL */}
            <Modal open={modal?.type === "add" || modal?.type === "edit"} onClose={() => setModal(null)} title={modal?.type === "add" ? "Create New Class" : "Edit Class"} width={480}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group"><label className="form-label">Class *</label>
                        <select className="form-select" value={form.className} onChange={(e) => updateForm("className", e.target.value)}>
                            <option value="">Select Class</option>{["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Section *</label>
                        <select className="form-select" value={form.section} onChange={(e) => updateForm("section", e.target.value)}>
                            {["A", "B", "C", "D"].map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Room Number</label><input className="form-input" placeholder="e.g. 301" value={form.roomNumber || ""} onChange={(e) => updateForm("roomNumber", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Student Count</label><input className="form-input" type="number" value={form.studentCount || ""} onChange={(e) => updateForm("studentCount", Number(e.target.value))} /></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Class Teacher Name</label><input className="form-input" placeholder="Teacher name" value={form.classTeacherName || ""} onChange={(e) => updateForm("classTeacherName", e.target.value)} /></div>
                </div>
                <div className="modal-footer" style={{ padding: "16px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>{modal?.type === "add" ? "Create Class" : "Save Changes"}</button>
                </div>
            </Modal>

            {/* DELETE MODAL */}
            <Modal open={modal?.type === "delete"} onClose={() => setModal(null)} title="Delete Class" width={420}>
                <div className="confirm-delete">
                    <AlertTriangle size={48} style={{ color: "var(--danger)", margin: "0 auto 16px" }} />
                    <p className="name">Class {modal?.cls?.className}-{modal?.cls?.section}</p>
                    <p>Are you sure you want to delete this class? All associated data will be lost.</p>
                </div>
                <div className="modal-footer" style={{ padding: "16px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete Class</button>
                </div>
            </Modal>

            {toast && (
                <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)", animation: "slideDown 0.3s ease" }}>
                    ✅ {toast}
                </div>
            )}
        </div>
    );
}
