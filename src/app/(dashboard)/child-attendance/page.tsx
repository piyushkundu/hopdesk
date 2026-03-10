"use client";

import { CalendarCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { studentAttendanceMonthly } from "@/lib/role-data";

export default function ChildAttendancePage() {
    const totalPresent = studentAttendanceMonthly.reduce((a, b) => a + b.present, 0);
    const totalAbsent = studentAttendanceMonthly.reduce((a, b) => a + b.absent, 0);
    const totalLeave = studentAttendanceMonthly.reduce((a, b) => a + b.leave, 0);
    const totalDays = totalPresent + totalAbsent + totalLeave;
    const percent = Math.round((totalPresent / totalDays) * 100);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Child&apos;s Attendance</h1>
                    <p className="page-subtitle">Aarav Sharma - Class 10-A</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: `conic-gradient(var(--success) ${percent}%, var(--bg-card-hover) ${percent}%)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                        <div style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--success)" }}>{percent}%</span>
                        </div>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Overall</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <CalendarCheck size={24} style={{ color: "var(--success)", margin: "0 auto 8px" }} />
                    <p style={{ fontSize: 22, fontWeight: 700, color: "var(--success)" }}>{totalPresent}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Present</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <CalendarCheck size={24} style={{ color: "var(--danger)", margin: "0 auto 8px" }} />
                    <p style={{ fontSize: 22, fontWeight: 700, color: "var(--danger)" }}>{totalAbsent}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Absent</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: "center" }}>
                    <CalendarCheck size={24} style={{ color: "var(--warning)", margin: "0 auto 8px" }} />
                    <p style={{ fontSize: 22, fontWeight: 700, color: "var(--warning)" }}>{totalLeave}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Leave</p>
                </div>
            </div>

            <div className="chart-card" style={{ marginBottom: 24 }}>
                <h3 className="chart-title">Monthly Attendance</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={studentAttendanceMonthly}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13, color: "#f1f5f9" }} />
                        <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} name="Present" />
                        <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead><tr><th>Month</th><th>Present</th><th>Absent</th><th>Leave</th><th>Attendance %</th></tr></thead>
                    <tbody>
                        {studentAttendanceMonthly.map((m) => {
                            const total = m.present + m.absent + m.leave;
                            const pct = total > 0 ? Math.round((m.present / total) * 100) : 0;
                            return (
                                <tr key={m.month}>
                                    <td style={{ fontWeight: 500 }}>{m.month}</td>
                                    <td style={{ color: "var(--success)" }}>{m.present}</td>
                                    <td style={{ color: "var(--danger)" }}>{m.absent}</td>
                                    <td style={{ color: "var(--warning)" }}>{m.leave}</td>
                                    <td><span style={{ fontWeight: 600, color: pct >= 80 ? "var(--success)" : "var(--danger)" }}>{pct}%</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
