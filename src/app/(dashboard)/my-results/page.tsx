"use client";

import { studentResults } from "@/lib/role-data";
import { BarChart3, Trophy } from "lucide-react";

export default function MyResultsPage() {
    const total = studentResults.reduce((a, b) => a + b.marks, 0);
    const maxTotal = studentResults.reduce((a, b) => a + b.total, 0);
    const avg = Math.round(total / studentResults.length);
    const overallGrade = avg >= 90 ? "A+" : avg >= 80 ? "A" : avg >= 70 ? "B+" : "B";

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Exam Results</h1>
                    <p className="page-subtitle">Your examination marks and grades</p>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="card" style={{ marginBottom: 24, padding: 24, display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Trophy size={36} style={{ color: "white" }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Unit Test 1 Results</h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Class 10-A • February 2025</p>
                </div>
                <div style={{ display: "flex", gap: 32 }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 28, fontWeight: 700, color: "var(--primary-light)" }}>{total}/{maxTotal}</p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Marks</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 28, fontWeight: 700, color: "var(--success)" }}>{avg}%</p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Percentage</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)" }}>{overallGrade}</p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Grade</p>
                    </div>
                </div>
            </div>

            {/* Subject Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                {studentResults.map((r) => {
                    const color = r.marks >= 80 ? "var(--success)" : r.marks >= 60 ? "var(--primary)" : "var(--danger)";
                    return (
                        <div key={r.subject} className="card" style={{ textAlign: "center", padding: 20 }}>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>{r.subject}</p>
                            <div style={{ width: 70, height: 70, borderRadius: "50%", background: `conic-gradient(${color} ${r.marks}%, var(--bg-card-hover) ${r.marks}%)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ fontSize: 18, fontWeight: 700, color }}>{r.marks}</span>
                                </div>
                            </div>
                            <span className="badge badge-primary" style={{ fontSize: 12 }}>{r.grade}</span>
                        </div>
                    );
                })}
            </div>

            {/* Detailed Table */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead><tr><th>Subject</th><th>Marks</th><th>Total</th><th>Percentage</th><th>Grade</th><th>Status</th></tr></thead>
                    <tbody>
                        {studentResults.map((r) => (
                            <tr key={r.subject}>
                                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{r.subject}</td>
                                <td>{r.marks}</td>
                                <td>{r.total}</td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--bg-card-hover)", maxWidth: 80 }}>
                                            <div style={{ width: `${r.marks}%`, height: "100%", borderRadius: 3, background: r.marks >= 80 ? "var(--success)" : r.marks >= 60 ? "var(--primary)" : "var(--danger)" }} />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 600 }}>{r.marks}%</span>
                                    </div>
                                </td>
                                <td><span className="badge badge-primary">{r.grade}</span></td>
                                <td><span className={`badge ${r.marks >= 50 ? "badge-success" : "badge-danger"}`}>{r.marks >= 50 ? "Pass" : "Fail"}</span></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={{ background: "rgba(99, 102, 241, 0.05)" }}>
                            <td style={{ fontWeight: 700, color: "var(--text-primary)" }}>Total</td>
                            <td style={{ fontWeight: 700 }}>{total}</td>
                            <td style={{ fontWeight: 700 }}>{maxTotal}</td>
                            <td style={{ fontWeight: 700, color: "var(--primary-light)" }}>{avg}%</td>
                            <td><span className="badge badge-primary">{overallGrade}</span></td>
                            <td><span className="badge badge-success">Pass</span></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
