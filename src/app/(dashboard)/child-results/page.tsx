"use client";

import { studentResults } from "@/lib/role-data";
import { Trophy } from "lucide-react";

export default function ChildResultsPage() {
    const total = studentResults.reduce((a, b) => a + b.marks, 0);
    const maxTotal = studentResults.reduce((a, b) => a + b.total, 0);
    const avg = Math.round(total / studentResults.length);
    const grade = avg >= 90 ? "A+" : avg >= 80 ? "A" : avg >= 70 ? "B+" : "B";

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Child&apos;s Results</h1>
                    <p className="page-subtitle">Aarav Sharma - Class 10-A • Exam Performance</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: 24, padding: 24, display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Trophy size={30} style={{ color: "white" }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700 }}>Unit Test 1</h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>February 2025</p>
                </div>
                <div style={{ display: "flex", gap: 24 }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 24, fontWeight: 700, color: "var(--primary-light)" }}>{total}/{maxTotal}</p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 24, fontWeight: 700, color: "var(--success)" }}>{avg}%</p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Average</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)" }}>{grade}</p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Grade</p>
                    </div>
                </div>
            </div>

            {/* Subject Performance */}
            <div className="card" style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Subject Performance</h3>
                {studentResults.map((r, i) => (
                    <div key={r.subject} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < studentResults.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                        <p style={{ width: 100, fontSize: 13, fontWeight: 500 }}>{r.subject}</p>
                        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "var(--bg-card-hover)", overflow: "hidden" }}>
                            <div style={{ width: `${r.marks}%`, height: "100%", borderRadius: 5, background: r.marks >= 80 ? "var(--success)" : r.marks >= 60 ? "var(--primary)" : "var(--danger)", transition: "width 0.6s ease" }} />
                        </div>
                        <span style={{ width: 50, textAlign: "right", fontWeight: 600 }}>{r.marks}/{r.total}</span>
                        <span className="badge badge-primary" style={{ width: 36, textAlign: "center" }}>{r.grade}</span>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead><tr><th>Subject</th><th>Marks</th><th>Total</th><th>Grade</th><th>Status</th></tr></thead>
                    <tbody>
                        {studentResults.map((r) => (
                            <tr key={r.subject}>
                                <td style={{ fontWeight: 500 }}>{r.subject}</td>
                                <td>{r.marks}</td>
                                <td>{r.total}</td>
                                <td><span className="badge badge-primary">{r.grade}</span></td>
                                <td><span className={`badge ${r.marks >= 50 ? "badge-success" : "badge-danger"}`}>{r.marks >= 50 ? "Pass" : "Fail"}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
