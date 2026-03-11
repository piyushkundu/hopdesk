"use client";

import { demoExams } from "@/lib/demo-data";
import { Plus, Calendar, ClipboardList, Eye, Edit, Trash2 } from "lucide-react";

export default function ExamsPage() {
    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Examinations</h1>
                    <p className="page-subtitle">Manage exams, upload marks, and generate results</p>
                </div>
                <button className="btn btn-primary"><Plus size={16} /> Create Exam</button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ClipboardList size={20} style={{ color: "var(--primary-light)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Exams</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoExams.length}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Calendar size={20} style={{ color: "var(--accent-light)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Upcoming</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoExams.filter(e => e.status === "upcoming").length}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ClipboardList size={20} style={{ color: "var(--success-light)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Completed</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoExams.filter(e => e.status === "completed").length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }} className="stagger-children">
                {demoExams.map((exam) => (
                    <div key={exam.id} className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{exam.name}</h3>
                                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Class {exam.className}{(exam as any).section ? `-${(exam as any).section}` : ""}</p>
                            </div>
                            <span className={`badge ${exam.status === "upcoming" ? "badge-warning" : exam.status === "completed" ? "badge-success" : "badge-primary"}`}>
                                {exam.status}
                            </span>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                            <div style={{ padding: 10, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-sm)" }}>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Date</p>
                                <p style={{ fontSize: 13, fontWeight: 500 }}>{exam.date}</p>
                            </div>
                            <div style={{ padding: 10, background: "rgba(6, 182, 212, 0.06)", borderRadius: "var(--radius-sm)" }}>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Total Marks</p>
                                <p style={{ fontSize: 13, fontWeight: 500 }}>{(exam as any).totalMarks}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Subjects</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {((exam as any).subjects || []).map((subj: string) => (
                                    <span key={subj} className="badge badge-info" style={{ fontSize: 11 }}>{subj}</span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Eye size={14} /> View Results</button>
                            <button className="btn btn-ghost btn-sm"><Edit size={14} /></button>
                            <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }}><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
