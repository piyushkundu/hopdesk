"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { BookOpenCheck, Plus, Calendar, Clock, Search, Edit, Trash2 } from "lucide-react";
import { demoHomework } from "@/lib/role-data";

export default function HomeworkPage() {
    const { userProfile } = useAuth();
    const role = userProfile?.role || "admin";
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = demoHomework.filter((hw) =>
        hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hw.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusColors: Record<string, string> = { active: "badge-primary", overdue: "badge-danger", completed: "badge-success" };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Homework</h1>
                    <p className="page-subtitle">{role === "admin" || role === "teacher" ? "Assign and manage homework" : "View your homework assignments"}</p>
                </div>
                {(role === "admin" || role === "teacher") && (
                    <button className="btn btn-primary"><Plus size={16} /> Assign Homework</button>
                )}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <BookOpenCheck size={20} style={{ color: "var(--primary-light)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoHomework.length}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Clock size={20} style={{ color: "var(--success)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Active</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoHomework.filter(h => h.status === "active").length}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Calendar size={20} style={{ color: "var(--danger)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Overdue</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoHomework.filter(h => h.status === "overdue").length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="filter-search">
                    <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input placeholder="Search homework..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <select className="form-select"><option value="">All Subjects</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option><option>English</option><option>Biology</option></select>
            </div>

            {/* Homework Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }} className="stagger-children">
                {filtered.map((hw) => (
                    <div key={hw.id} className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{hw.title}</h3>
                                <div style={{ display: "flex", gap: 6 }}>
                                    <span className="badge badge-primary" style={{ fontSize: 10 }}>{hw.subject}</span>
                                    <span className="badge badge-info" style={{ fontSize: 10 }}>Class {hw.className}-{hw.section}</span>
                                </div>
                            </div>
                            <span className={`badge ${statusColors[hw.status]}`}>{hw.status}</span>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 14 }}>{hw.description}</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                            <div style={{ padding: 10, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-sm)" }}>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Assigned</p>
                                <p style={{ fontSize: 13, fontWeight: 500 }}>{hw.assignedDate}</p>
                            </div>
                            <div style={{ padding: 10, background: hw.status === "overdue" ? "rgba(239, 68, 68, 0.06)" : "rgba(245, 158, 11, 0.06)", borderRadius: "var(--radius-sm)" }}>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Due Date</p>
                                <p style={{ fontSize: 13, fontWeight: 500, color: hw.status === "overdue" ? "var(--danger)" : undefined }}>{hw.dueDate}</p>
                            </div>
                        </div>
                        {(role === "teacher" || role === "admin") && (
                            <div style={{ display: "flex", gap: 8 }}>
                                <p style={{ flex: 1, fontSize: 12, color: "var(--text-muted)" }}>By: {hw.teacherName}</p>
                                <button className="btn btn-ghost btn-sm"><Edit size={14} /></button>
                                <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }}><Trash2 size={14} /></button>
                            </div>
                        )}
                        {role === "teacher" || role === "admin" ? null : (
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Assigned by: {hw.teacherName}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
