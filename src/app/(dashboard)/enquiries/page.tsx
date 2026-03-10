"use client";

import { useState } from "react";
import { demoEnquiries, demoTeachers } from "@/lib/demo-data";
import { Enquiry } from "@/types";
import Modal from "@/components/ui/modal";
import { useAuth } from "@/lib/auth-context";
import { Search, Plus, Eye, Edit, Trash2, Phone, Mail, MapPin, Calendar, User, UserCog, School, AlertTriangle, FileText, TrendingUp, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";

const statusLabels: Record<string, string> = { new: "New", contacted: "Contacted", visit_scheduled: "Visit Scheduled", admission_confirmed: "Admission Confirmed", rejected: "Rejected" };
const statusBadge: Record<string, string> = { new: "badge-info", contacted: "badge-primary", visit_scheduled: "badge-warning", admission_confirmed: "badge-success", rejected: "badge-danger" };

const emptyEnquiry: Omit<Enquiry, "id" | "createdAt" | "updatedAt"> = {
    studentName: "", fatherName: "", phone: "", email: "", classInterested: "Class 6",
    previousSchool: "", address: "", enquiryDate: new Date().toISOString().split("T")[0],
    status: "new", assignedTeacher: "", assignedTeacherName: "", notes: "", followUpDate: "", createdBy: "admin",
};

export default function EnquiriesPage() {
    const { userProfile } = useAuth();
    const role = userProfile?.role || "admin";
    const [enquiries, setEnquiries] = useState<Enquiry[]>([...demoEnquiries]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [modal, setModal] = useState<{ type: "view" | "add" | "edit" | "delete"; enq?: Enquiry } | null>(null);
    const [form, setForm] = useState<any>({ ...emptyEnquiry });
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
    const updateForm = (key: string, val: any) => setForm({ ...form, [key]: val });

    // Filter: Admin sees all, Teacher sees only assigned
    const visibleEnquiries = role === "teacher"
        ? enquiries.filter(e => e.assignedTeacherName === userProfile?.displayName || e.createdBy === "teacher")
        : enquiries;

    const filtered = visibleEnquiries.filter((e) => {
        const matchSearch = e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || e.phone.includes(searchQuery);
        const matchStatus = statusFilter ? e.status === statusFilter : true;
        return matchSearch && matchStatus;
    });

    const openAdd = () => { setForm({ ...emptyEnquiry, createdBy: role }); setModal({ type: "add" }); };
    const openView = (e: Enquiry) => setModal({ type: "view", enq: e });
    const openEdit = (e: Enquiry) => { setForm({ ...e }); setModal({ type: "edit", enq: e }); };
    const openDelete = (e: Enquiry) => setModal({ type: "delete", enq: e });

    const handleSave = () => {
        if (!form.studentName || !form.phone) return;
        if (modal?.type === "add") {
            const newE: Enquiry = { ...form, id: `ENQ${String(enquiries.length + 1).padStart(3, "0")}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
            setEnquiries([...enquiries, newE]);
            showToast("Enquiry added successfully!");
        } else if (modal?.type === "edit" && modal.enq) {
            setEnquiries(enquiries.map(e => e.id === modal.enq!.id ? { ...e, ...form, updatedAt: new Date().toISOString() } : e));
            showToast("Enquiry updated!");
        }
        setModal(null);
    };

    const handleDelete = () => {
        if (modal?.enq) { setEnquiries(enquiries.filter(e => e.id !== modal.enq!.id)); showToast("Enquiry deleted!"); }
        setModal(null);
    };

    const stats = [
        { label: "Total Enquiries", value: visibleEnquiries.length, icon: FileText, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.12)" },
        { label: "Today's Enquiries", value: visibleEnquiries.filter(e => e.enquiryDate === new Date().toISOString().split("T")[0]).length, icon: TrendingUp, color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.12)" },
        { label: "Admissions Confirmed", value: visibleEnquiries.filter(e => e.status === "admission_confirmed").length, icon: CheckCircle, color: "var(--success)", bg: "rgba(16, 185, 129, 0.12)" },
        { label: "Pending Follow-ups", value: visibleEnquiries.filter(e => e.followUpDate && (e.status === "new" || e.status === "contacted")).length, icon: Clock, color: "var(--accent)", bg: "rgba(245, 158, 11, 0.12)" },
    ];

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">Enquiries</h1><p className="page-subtitle">{role === "admin" ? "Manage admission enquiries" : "My assigned enquiries"}</p></div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> New Enquiry</button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                {stats.map((s) => (
                    <div key={s.label} className="card" style={{ padding: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <s.icon size={20} style={{ color: s.color }} />
                            </div>
                            <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</p><p style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</p></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="filter-search">
                    <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input placeholder="Search by name or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
            </div>

            {/* Enquiry Table */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead><tr><th>Student</th><th>Class</th><th>Phone</th><th>Status</th><th>Follow-up</th><th>Assigned To</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map((enq) => (
                            <tr key={enq.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", flexShrink: 0 }}>
                                            {enq.studentName.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{enq.studentName}</div>
                                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>F: {enq.fatherName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge badge-primary">{enq.classInterested}</span></td>
                                <td style={{ fontSize: 13 }}>{enq.phone}</td>
                                <td><span className={`badge ${statusBadge[enq.status]}`}>{statusLabels[enq.status]}</span></td>
                                <td style={{ fontSize: 12, color: enq.followUpDate ? "var(--text-primary)" : "var(--text-muted)" }}>{enq.followUpDate || "—"}</td>
                                <td style={{ fontSize: 12 }}>{enq.assignedTeacherName || <span style={{ color: "var(--text-muted)" }}>Unassigned</span>}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        <button className="btn btn-ghost btn-icon btn-sm" title="View" onClick={() => openView(enq)}><Eye size={15} /></button>
                                        <button className="btn btn-ghost btn-icon btn-sm" title="Edit" onClick={() => openEdit(enq)}><Edit size={15} /></button>
                                        {role === "admin" && <button className="btn btn-ghost btn-icon btn-sm" title="Delete" style={{ color: "var(--danger)" }} onClick={() => openDelete(enq)}><Trash2 size={15} /></button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination"><span className="pagination-info">Showing {filtered.length} of {visibleEnquiries.length} enquiries</span></div>

            {/* VIEW MODAL */}
            <Modal open={modal?.type === "view"} onClose={() => setModal(null)} title="Enquiry Details" width={560}>
                {modal?.enq && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "white" }}>
                                {modal.enq.studentName.charAt(0)}
                            </div>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 700 }}>{modal.enq.studentName}</h2>
                                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                                    <span className="badge badge-primary">{modal.enq.classInterested}</span>
                                    <span className={`badge ${statusBadge[modal.enq.status]}`}>{statusLabels[modal.enq.status]}</span>
                                </div>
                            </div>
                        </div>
                        {[
                            { icon: User, label: "Father's Name", value: modal.enq.fatherName },
                            { icon: Phone, label: "Phone", value: modal.enq.phone },
                            { icon: Mail, label: "Email", value: modal.enq.email || "N/A" },
                            { icon: School, label: "Previous School", value: modal.enq.previousSchool || "N/A" },
                            { icon: MapPin, label: "Address", value: modal.enq.address },
                            { icon: Calendar, label: "Enquiry Date", value: modal.enq.enquiryDate },
                            { icon: Calendar, label: "Follow-up Date", value: modal.enq.followUpDate || "Not set" },
                            { icon: UserCog, label: "Assigned Teacher", value: modal.enq.assignedTeacherName || "Unassigned" },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 7 ? "1px solid var(--border-light)" : "none" }}>
                                <item.icon size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                                <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p><p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p></div>
                            </div>
                        ))}
                        {modal.enq.notes && (
                            <div style={{ marginTop: 16, padding: 14, background: "rgba(99, 102, 241, 0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><MessageSquare size={14} style={{ color: "var(--text-muted)" }} /><span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Notes</span></div>
                                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{modal.enq.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* ADD / EDIT MODAL */}
            <Modal open={modal?.type === "add" || modal?.type === "edit"} onClose={() => setModal(null)} title={modal?.type === "add" ? "New Enquiry" : "Edit Enquiry"} width={600}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group"><label className="form-label">Student Name *</label><input className="form-input" placeholder="Student name" value={form.studentName} onChange={(e) => updateForm("studentName", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Father&apos;s Name *</label><input className="form-input" placeholder="Father's name" value={form.fatherName} onChange={(e) => updateForm("fatherName", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Phone *</label><input className="form-input" placeholder="9876543210" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="email@example.com" value={form.email || ""} onChange={(e) => updateForm("email", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Class Interested</label>
                        <select className="form-select" value={form.classInterested} onChange={(e) => updateForm("classInterested", e.target.value)}>
                            {["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Previous School</label><input className="form-input" placeholder="Previous school name" value={form.previousSchool || ""} onChange={(e) => updateForm("previousSchool", e.target.value)} /></div>
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Address</label><input className="form-input" placeholder="Full address" value={form.address} onChange={(e) => updateForm("address", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Status</label>
                        <select className="form-select" value={form.status} onChange={(e) => updateForm("status", e.target.value)}>
                            {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Follow-up Date</label><input className="form-input" type="date" value={form.followUpDate || ""} onChange={(e) => updateForm("followUpDate", e.target.value)} /></div>
                    {role === "admin" && (
                        <div className="form-group"><label className="form-label">Assign Teacher</label>
                            <select className="form-select" value={form.assignedTeacher || ""} onChange={(e) => {
                                const t = demoTeachers.find(t => t.id === e.target.value);
                                updateForm("assignedTeacher", e.target.value);
                                setForm((prev: any) => ({ ...prev, assignedTeacher: e.target.value, assignedTeacherName: t?.name || "" }));
                            }}>
                                <option value="">Select Teacher</option>
                                {demoTeachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    )}
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Notes</label><textarea className="form-input" placeholder="Any notes about this enquiry..." value={form.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} style={{ minHeight: 60 }} /></div>
                </div>
                <div className="modal-footer" style={{ padding: "16px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>{modal?.type === "add" ? "Add Enquiry" : "Save Changes"}</button>
                </div>
            </Modal>

            {/* DELETE MODAL */}
            <Modal open={modal?.type === "delete"} onClose={() => setModal(null)} title="Delete Enquiry" width={420}>
                <div className="confirm-delete">
                    <AlertTriangle size={48} style={{ color: "var(--danger)", margin: "0 auto 16px" }} />
                    <p className="name">{modal?.enq?.studentName}</p>
                    <p>Are you sure you want to delete this enquiry?</p>
                </div>
                <div className="modal-footer" style={{ padding: "16px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete Enquiry</button>
                </div>
            </Modal>

            {toast && (
                <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>
                    ✅ {toast}
                </div>
            )}
        </div>
    );
}
