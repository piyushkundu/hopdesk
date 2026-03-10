"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { demoNotices } from "@/lib/role-data";
import { Megaphone, Plus, Bell, Eye, Edit, Trash2 } from "lucide-react";

const typeColors: Record<string, { color: string; bg: string }> = {
    holiday: { color: "var(--accent)", bg: "rgba(245, 158, 11, 0.15)" },
    exam: { color: "var(--primary)", bg: "rgba(99, 102, 241, 0.15)" },
    event: { color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.15)" },
    important: { color: "var(--danger)", bg: "rgba(239, 68, 68, 0.15)" },
    general: { color: "var(--text-muted)", bg: "rgba(100, 116, 139, 0.15)" },
};

export default function NoticesPage() {
    const { userProfile } = useAuth();
    const role = userProfile?.role || "admin";
    const [filter, setFilter] = useState("");

    const visibleNotices = demoNotices.filter((notice) => {
        if (role === "admin") return true;
        return notice.visibleTo.includes(role as "student" | "teacher" | "parent");
    }).filter(n => filter ? n.type === filter : true);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Notice Board</h1>
                    <p className="page-subtitle">{role === "admin" ? "Manage school announcements" : "School announcements & updates"}</p>
                </div>
                {role === "admin" && (
                    <button className="btn btn-primary"><Plus size={16} /> Post Notice</button>
                )}
            </div>

            {/* Filter Bar */}
            <div className="filter-bar" style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 8 }}>
                    {["", "holiday", "exam", "event", "important", "general"].map((type) => (
                        <button key={type} className={`btn ${filter === type ? "btn-primary" : "btn-secondary"} btn-sm`} onClick={() => setFilter(type)} style={{ textTransform: "capitalize" }}>
                            {type || "All"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notices */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {visibleNotices.map((notice) => (
                    <div key={notice.id} className="card" style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "20px 24px", borderLeft: `3px solid ${typeColors[notice.type]?.color || "var(--primary)"}` }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: typeColors[notice.type]?.bg || "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Megaphone size={20} style={{ color: typeColors[notice.type]?.color || "var(--primary)" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{notice.title}</h3>
                                <span className={`badge ${notice.priority === "high" ? "badge-danger" : notice.priority === "medium" ? "badge-warning" : "badge-info"}`} style={{ fontSize: 10 }}>{notice.priority}</span>
                                <span className="badge badge-primary" style={{ fontSize: 10, textTransform: "capitalize" }}>{notice.type}</span>
                            </div>
                            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8 }}>{notice.message}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11, color: "var(--text-muted)" }}>
                                <span>Posted by: {notice.postedBy}</span>
                                <span>Date: {notice.postedDate}</span>
                                {role === "admin" && (
                                    <span>Visible to: {notice.visibleTo.join(", ")}</span>
                                )}
                            </div>
                        </div>
                        {role === "admin" && (
                            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                                <button className="btn btn-ghost btn-icon btn-sm"><Eye size={14} /></button>
                                <button className="btn btn-ghost btn-icon btn-sm"><Edit size={14} /></button>
                                <button className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--danger)" }}><Trash2 size={14} /></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
