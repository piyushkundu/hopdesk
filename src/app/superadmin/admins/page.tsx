"use client";

import { useState } from "react";
import { UserCog, Search, Eye, Edit, RotateCcw, Mail, Phone, Building2 } from "lucide-react";
import Modal from "@/components/ui/modal";

const admins = [
    { id: "1", name: "Dr. Anand Sharma", email: "admin@dps.com", phone: "+91 98765 00001", school: "Delhi Public School", code: "SCH001", status: "active", lastLogin: "2026-03-08 09:15" },
    { id: "2", name: "Sr. Catherine", email: "admin@stmary.com", phone: "+91 98765 00002", school: "St. Mary International", code: "SCH002", status: "active", lastLogin: "2026-03-08 08:45" },
    { id: "3", name: "Mr. Rohit Kapoor", email: "admin@greenvalley.com", phone: "+91 98765 00003", school: "Green Valley Academy", code: "SCH003", status: "active", lastLogin: "2026-03-07 16:30" },
    { id: "4", name: "Mrs. Priya Nair", email: "admin@sunrise.com", phone: "+91 98765 00004", school: "Sunrise Public School", code: "SCH004", status: "inactive", lastLogin: "2026-02-15 10:00" },
    { id: "5", name: "Mr. Vikram Batra", email: "admin@modern.com", phone: "+91 98765 00005", school: "Modern Academy", code: "SCH005", status: "active", lastLogin: "2026-03-08 07:30" },
    { id: "6", name: "Fr. Thomas", email: "admin@littleflower.com", phone: "+91 98765 00006", school: "Little Flower School", code: "SCH006", status: "active", lastLogin: "2026-03-07 14:20" },
    { id: "7", name: "Mrs. Suman Devi", email: "admin@dav.com", phone: "+91 98765 00007", school: "DAV Public School", code: "SCH007", status: "active", lastLogin: "2026-03-08 08:00" },
    { id: "8", name: "Mr. Ryan Pinto", email: "admin@ryan.com", phone: "+91 98765 00008", school: "Ryan International", code: "SCH008", status: "active", lastLogin: "2026-03-08 09:00" },
    { id: "9", name: "Mrs. Geeta Rao", email: "admin@heritage.com", phone: "+91 98765 00009", school: "Heritage School", code: "SCH009", status: "suspended", lastLogin: "2026-02-28 11:00" },
    { id: "10", name: "Dr. Suresh Kumar", email: "admin@kv.com", phone: "+91 98765 00010", school: "Kendriya Vidyalaya", code: "SCH010", status: "active", lastLogin: "2026-03-07 17:00" },
    { id: "11", name: "Ms. Ritu Verma", email: "admin@sapphire.com", phone: "+91 98765 00011", school: "Sapphire International", code: "SCH011", status: "active", lastLogin: "2026-03-08 08:30" },
    { id: "12", name: "Mr. Arjun Das", email: "admin@indus.com", phone: "+91 98765 00012", school: "Indus Valley School", code: "SCH012", status: "inactive", lastLogin: "2026-03-01 10:00" },
];

export default function AdminsPage() {
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<any>(null);
    const [toast, setToast] = useState<string | null>(null);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const filtered = admins.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.includes(search));

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">School Admins</h1><p className="page-subtitle">All school administrators — {admins.length} total</p></div>
            </div>

            <div className="filter-bar">
                <div className="filter-search"><Search size={18} style={{ color: "var(--text-muted)" }} /><input placeholder="Search admins..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead><tr><th>Admin</th><th>School</th><th>Email</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map((a) => (
                            <tr key={a.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>{a.name.charAt(0)}</div>
                                        <span style={{ fontWeight: 500, fontSize: 13 }}>{a.name}</span>
                                    </div>
                                </td>
                                <td><span style={{ fontSize: 12 }}>{a.school}</span><br /><code style={{ fontSize: 11, color: "#6366f1" }}>{a.code}</code></td>
                                <td style={{ fontSize: 12 }}>{a.email}</td>
                                <td><span className={`badge ${a.status === "active" ? "badge-success" : a.status === "suspended" ? "badge-warning" : "badge-danger"}`}>{a.status}</span></td>
                                <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{a.lastLogin}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        <button className="btn btn-ghost btn-icon btn-sm" title="View" onClick={() => setModal(a)}><Eye size={14} /></button>
                                        <button className="btn btn-ghost btn-icon btn-sm" title="Reset Password" onClick={() => showToast(`Password reset for ${a.name}!`)}><RotateCcw size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal open={!!modal} onClose={() => setModal(null)} title="Admin Details" width={480}>
                {modal && (
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                            <div style={{ width: 50, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700 }}>{modal.name.charAt(0)}</div>
                            <div><h2 style={{ fontSize: 18, fontWeight: 700 }}>{modal.name}</h2><span className={`badge ${modal.status === "active" ? "badge-success" : "badge-danger"}`}>{modal.status}</span></div>
                        </div>
                        {[{ icon: Mail, l: "Email", v: modal.email }, { icon: Phone, l: "Phone", v: modal.phone }, { icon: Building2, l: "School", v: `${modal.school} (${modal.code})` }].map((r, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border-light)" }}>
                                <r.icon size={16} style={{ color: "var(--text-muted)" }} />
                                <div><p style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.l}</p><p style={{ fontSize: 14 }}>{r.v}</p></div>
                            </div>
                        ))}
                        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>Last Login: {modal.lastLogin}</p>
                    </div>
                )}
            </Modal>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>✅ {toast}</div>}
        </div>
    );
}
