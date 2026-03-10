"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Modal from "@/components/ui/modal";
import { Check, X, Eye, Search, Loader2, UserCog, Users, GraduationCap, UserCheck, Shield, Clock, AlertTriangle } from "lucide-react";
import * as fs from "@/lib/firestore-service";

const roleBadge: Record<string, { label: string; class: string; icon: any }> = {
    teacher: { label: "Teacher", class: "badge-primary", icon: UserCog },
    student: { label: "Student", class: "badge-info", icon: GraduationCap },
    parent: { label: "Parent", class: "badge-warning", icon: Users },
};

export default function ApprovalsPage() {
    const { userProfile } = useAuth();
    const schoolId = userProfile?.schoolId || "";
    const role = userProfile?.role || "admin";
    const [pendingUsers, setPendingUsers] = useState<any[]>([]);
    const [allApproved, setAllApproved] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
    const [modal, setModal] = useState<{ type: string; user?: any } | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const loadUsers = async () => {
        if (!schoolId) return;
        setLoading(true);
        try {
            const users = await fs.getUsersBySchool(schoolId);
            // Admin can see all users, Teacher can only see student/parent
            const filterable = role === "teacher"
                ? users.filter((u: any) => u.role === "student" || u.role === "parent")
                : users.filter((u: any) => u.role !== "admin");

            setPendingUsers(filterable.filter((u: any) => u.status === "pending"));
            setAllApproved(filterable.filter((u: any) => u.status === "approved" || !u.status));
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => { loadUsers(); }, [schoolId]);

    const handleApprove = async (user: any) => {
        try {
            // Generate teacher ID and PIN if approving a teacher
            if (user.role === "teacher") {
                const teacherId = await fs.getNextTeacherId(schoolId);
                const pin = String(Math.floor(1000 + Math.random() * 9000));
                await fs.updateUser(user.id, {
                    status: "approved", teacherId, pin,
                });
                // Also add to teachers collection
                await fs.addTeacher({
                    name: user.displayName || user.name,
                    teacherId, pin,
                    subject: "", phone: user.phone || "",
                    email: user.email, schoolId,
                    qualification: "", salary: 0,
                    status: "active",
                    joiningDate: new Date().toISOString().split("T")[0],
                });
                showToast(`✅ Teacher approved! ID: ${teacherId} | PIN: ${pin}`);
            } else {
                await fs.updateUser(user.id, { status: "approved" });
                if (user.role === "student") {
                    const studentId = await fs.getNextStudentId(schoolId);
                    await fs.addStudent({
                        name: user.displayName || user.name,
                        fatherName: "", className: "1", section: "A",
                        rollNumber: studentId, phone: user.phone || "",
                        address: "", gender: "male", status: "active",
                        admissionDate: new Date().toISOString().split("T")[0],
                        schoolId,
                    });
                }
                showToast(`✅ ${user.role} approved successfully!`);
            }
            await loadUsers();
        } catch (err: any) { showToast("Error: " + err.message); }
        setModal(null);
    };

    const handleReject = async (user: any) => {
        try {
            await fs.updateUser(user.id, { status: "rejected" });
            showToast(`❌ ${user.displayName || user.name} rejected.`);
            await loadUsers();
        } catch (err: any) { showToast("Error: " + err.message); }
        setModal(null);
    };

    const filtered = tab === "pending"
        ? pendingUsers.filter(u => (u.displayName || u.name || "").toLowerCase().includes(search.toLowerCase()))
        : allApproved.filter(u => (u.displayName || u.name || "").toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Approvals</h1>
                    <p className="page-subtitle">{role === "admin" ? "Approve or reject user registrations" : "Approve student & parent registrations"}</p>
                </div>
                <div className="badge badge-warning" style={{ fontSize: 14, padding: "8px 16px" }}>
                    <Clock size={16} style={{ marginRight: 6, display: "inline" }} />
                    {pendingUsers.length} Pending
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: 16, cursor: "pointer", border: tab === "pending" ? "2px solid var(--primary)" : "none" }} onClick={() => setTab("pending")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Clock size={20} style={{ color: "var(--accent)" }} /></div>
                        <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>Pending</p><p style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>{pendingUsers.length}</p></div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16, cursor: "pointer", border: tab === "approved" ? "2px solid var(--success)" : "none" }} onClick={() => setTab("approved")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(16, 185, 129, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><UserCheck size={20} style={{ color: "var(--success)" }} /></div>
                        <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>Approved</p><p style={{ fontSize: 22, fontWeight: 700, color: "var(--success)" }}>{allApproved.length}</p></div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16, cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(99, 102, 241, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={20} style={{ color: "var(--primary)" }} /></div>
                        <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Users</p><p style={{ fontSize: 22, fontWeight: 700 }}>{pendingUsers.length + allApproved.length}</p></div>
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="filter-search"><Search size={18} style={{ color: "var(--text-muted)" }} /><input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}><Loader2 size={32} className="spinner" style={{ margin: "0 auto" }} /><p style={{ marginTop: 12, color: "var(--text-muted)" }}>Loading...</p></div>
            ) : filtered.length === 0 ? (
                <div className="card" style={{ textAlign: "center", padding: 60 }}>
                    <UserCheck size={48} style={{ margin: "0 auto 12px", color: "var(--text-muted)" }} />
                    <p style={{ color: "var(--text-muted)", fontSize: 16 }}>{tab === "pending" ? "No pending approvals! 🎉" : "No approved users yet."}</p>
                </div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <table className="data-table">
                        <thead><tr><th>User</th><th>Role</th><th>Email</th><th>Phone</th><th>School Code</th><th>{tab === "pending" ? "Actions" : "Status"}</th></tr></thead>
                        <tbody>
                            {filtered.map((u: any) => {
                                const r = roleBadge[u.role] || { label: u.role, class: "badge-info", icon: Users };
                                return (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{(u.displayName || u.name || "?").charAt(0)}</div>
                                                <div><div style={{ fontWeight: 500, fontSize: 13 }}>{u.displayName || u.name}</div></div>
                                            </div>
                                        </td>
                                        <td><span className={`badge ${r.class}`}>{r.label}</span></td>
                                        <td style={{ fontSize: 12 }}>{u.email}</td>
                                        <td style={{ fontSize: 12 }}>{u.phone || "—"}</td>
                                        <td><code style={{ fontSize: 12, color: "var(--primary)" }}>{u.schoolCode || "—"}</code></td>
                                        <td>
                                            {tab === "pending" ? (
                                                <div style={{ display: "flex", gap: 6 }}>
                                                    <button className="btn btn-sm" style={{ background: "var(--success)", color: "white", padding: "4px 12px", fontSize: 12, borderRadius: 6, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                                                        onClick={() => handleApprove(u)}>
                                                        <Check size={14} /> Approve
                                                    </button>
                                                    <button className="btn btn-sm" style={{ background: "var(--danger)", color: "white", padding: "4px 12px", fontSize: 12, borderRadius: 6, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                                                        onClick={() => setModal({ type: "reject", user: u })}>
                                                        <X size={14} /> Reject
                                                    </button>
                                                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setModal({ type: "view", user: u })}><Eye size={14} /></button>
                                                </div>
                                            ) : (
                                                <span className="badge badge-success">Approved</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VIEW MODAL */}
            <Modal open={modal?.type === "view"} onClose={() => setModal(null)} title="User Details" width={480}>
                {modal?.user && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 50, height: 50, borderRadius: 10, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700 }}>{(modal.user.displayName || "?").charAt(0)}</div>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 700 }}>{modal.user.displayName || modal.user.name}</h2>
                                <span className={`badge ${(roleBadge[modal.user.role] || { class: "badge-info" }).class}`}>{modal.user.role}</span>
                            </div>
                        </div>
                        {[
                            { l: "Email", v: modal.user.email },
                            { l: "Phone", v: modal.user.phone },
                            { l: "School Code", v: modal.user.schoolCode },
                            { l: "Status", v: modal.user.status },
                        ].map((r) => (
                            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-light)", fontSize: 13 }}>
                                <span style={{ color: "var(--text-muted)" }}>{r.l}</span>
                                <span style={{ fontWeight: 500 }}>{r.v || "—"}</span>
                            </div>
                        ))}
                        <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 14, display: "flex", gap: 8 }}>
                            <button className="btn" style={{ background: "var(--success)", color: "white", border: "none" }} onClick={() => handleApprove(modal.user)}>
                                <Check size={14} /> Approve
                            </button>
                            <button className="btn btn-danger" onClick={() => handleReject(modal.user)}>
                                <X size={14} /> Reject
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* REJECT CONFIRM */}
            <Modal open={modal?.type === "reject"} onClose={() => setModal(null)} title="Reject User" width={420}>
                <div className="confirm-delete">
                    <AlertTriangle size={48} style={{ color: "var(--danger)", margin: "0 auto 16px" }} />
                    <p className="name">{modal?.user?.displayName || modal?.user?.name}</p>
                    <p>Are you sure you want to reject this user? They won&apos;t be able to login.</p>
                </div>
                <div className="modal-footer" style={{ padding: "14px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                    <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => modal?.user && handleReject(modal.user)}>Reject User</button>
                </div>
            </Modal>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>{toast}</div>}
        </div>
    );
}
