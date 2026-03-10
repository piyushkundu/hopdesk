"use client";

import { demoHomework } from "@/lib/role-data";
import { BookOpenCheck, Calendar, Clock, User } from "lucide-react";

export default function MyHomeworkPage() {
    const homework = demoHomework.filter(h => h.className === "10" && h.section === "A");
    const active = homework.filter(h => h.status === "active");
    const overdue = homework.filter(h => h.status === "overdue");

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Homework</h1>
                    <p className="page-subtitle">View your homework assignments</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <p style={{ fontSize: 24, fontWeight: 700, color: "var(--primary-light)" }}>{homework.length}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Assignments</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <p style={{ fontSize: 24, fontWeight: 700, color: "var(--success)" }}>{active.length}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Active</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <p style={{ fontSize: 24, fontWeight: 700, color: "var(--danger)" }}>{overdue.length}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Overdue</p>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {homework.map((hw) => (
                    <div key={hw.id} className="card" style={{ borderLeft: `3px solid ${hw.status === "overdue" ? "var(--danger)" : "var(--primary)"}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{hw.title}</h3>
                                <div style={{ display: "flex", gap: 6 }}>
                                    <span className="badge badge-primary" style={{ fontSize: 10 }}>{hw.subject}</span>
                                    <span className={`badge ${hw.status === "active" ? "badge-success" : "badge-danger"}`} style={{ fontSize: 10 }}>{hw.status}</span>
                                </div>
                            </div>
                            <BookOpenCheck size={22} style={{ color: hw.status === "overdue" ? "var(--danger)" : "var(--primary-light)" }} />
                        </div>
                        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>{hw.description}</p>
                        <div style={{ display: "flex", gap: 24, fontSize: 12, color: "var(--text-muted)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={14} /> Assigned: {hw.assignedDate}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} /> Due: <span style={{ color: hw.status === "overdue" ? "var(--danger)" : undefined, fontWeight: 600 }}>{hw.dueDate}</span></div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><User size={14} /> {hw.teacherName}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
