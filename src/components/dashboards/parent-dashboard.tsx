"use client";

import { CalendarCheck, ClipboardList, DollarSign, Bell, Baby, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { studentAttendanceMonthly, studentResults, studentFeeData, demoNotices } from "@/lib/role-data";

export default function ParentDashboard() {
    const totalPresent = studentAttendanceMonthly.reduce((a, b) => a + b.present, 0);
    const totalDays = studentAttendanceMonthly.reduce((a, b) => a + b.present + b.absent + b.leave, 0);
    const attendancePercent = Math.round((totalPresent / totalDays) * 100);
    const pendingFees = studentFeeData.filter(f => f.status === "pending");
    const paidFees = studentFeeData.filter(f => f.status === "paid");
    const avgMarks = Math.round(studentResults.reduce((a, b) => a + b.marks, 0) / studentResults.length);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Parent Dashboard</h1>
                    <p className="page-subtitle">Welcome, Rajesh! Here&apos;s your child&apos;s progress</p>
                </div>
            </div>

            {/* Child Info Bar */}
            <div className="card" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, padding: "20px 24px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "white" }}>A</div>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>Aarav Sharma</h2>
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Class 10-A • Roll No. 01 • Admission: 2024</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <span className="badge badge-success" style={{ padding: "6px 14px" }}>Active Student</span>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid stagger-children">
                <div className="card-stat green">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Attendance</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--success)" }}>{attendancePercent}%</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>{totalPresent} days present</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CalendarCheck size={24} style={{ color: "var(--success-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat purple">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Academic Performance</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{avgMarks}%</h2>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                                <TrendingUp size={14} style={{ color: "var(--success)" }} />
                                <span style={{ fontSize: 12, color: "var(--success)" }}>Grade A</span>
                            </div>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ClipboardList size={24} style={{ color: "var(--primary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat cyan">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Upcoming Exams</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>2</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>Next: Mar 15</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Baby size={24} style={{ color: "var(--secondary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat amber">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Fee Status</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{pendingFees.length > 0 ? `₹${pendingFees[0].amount.toLocaleString()}` : "✓"}</h2>
                            <p style={{ fontSize: 12, color: pendingFees.length > 0 ? "var(--danger)" : "var(--success)", marginTop: 8 }}>{pendingFees.length > 0 ? "Pending" : "All paid"}</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <DollarSign size={24} style={{ color: "var(--accent-light)" }} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Attendance Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">Monthly Attendance</h3>
                    <ResponsiveContainer width="100%" height={250}>
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

                {/* Subject Performance */}
                <div className="chart-card">
                    <h3 className="chart-title">Subject Performance</h3>
                    {studentResults.map((r, i) => (
                        <div key={r.subject} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < studentResults.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", width: 90 }}>{r.subject}</p>
                            <div style={{ flex: 1, height: 8, borderRadius: 4, background: "var(--bg-card-hover)", overflow: "hidden" }}>
                                <div style={{ width: `${r.marks}%`, height: "100%", borderRadius: 4, background: r.marks >= 80 ? "var(--success)" : r.marks >= 60 ? "var(--primary)" : "var(--danger)" }} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, width: 50, textAlign: "right" }}>{r.marks}%</span>
                            <span className="badge badge-primary" style={{ fontSize: 10 }}>{r.grade}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fees & Notices */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                <div className="chart-card">
                    <h3 className="chart-title">Fee Payment History</h3>
                    <table className="data-table">
                        <thead><tr><th>Month</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                            {studentFeeData.slice(-4).map((fee) => (
                                <tr key={fee.month}>
                                    <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{fee.month}</td>
                                    <td>₹{fee.amount.toLocaleString()}</td>
                                    <td><span className={`badge ${fee.status === "paid" ? "badge-success" : "badge-danger"}`}>{fee.status}</span></td>
                                    <td>{fee.date || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pendingFees.length > 0 && (
                        <button className="btn btn-primary" style={{ width: "100%", marginTop: 16 }}>
                            <DollarSign size={16} /> Pay ₹{pendingFees[0].amount.toLocaleString()} Now
                        </button>
                    )}
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">School Notices</h3>
                    {demoNotices.filter(n => n.visibleTo.includes("parent")).slice(0, 4).map((notice) => (
                        <div key={notice.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <Bell size={14} style={{ color: notice.priority === "high" ? "var(--danger)" : "var(--text-muted)" }} />
                                <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{notice.title}</h4>
                                <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: "auto" }}>{notice.postedDate}</span>
                            </div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>{notice.message.substring(0, 80)}...</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
