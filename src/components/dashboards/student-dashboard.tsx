"use client";

import { CalendarCheck, BookOpenCheck, ClipboardList, DollarSign, Bell, User, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { studentAttendanceMonthly, studentResults, studentFeeData, demoHomework, demoNotices } from "@/lib/role-data";

export default function StudentDashboard() {
    const totalPresent = studentAttendanceMonthly.reduce((a, b) => a + b.present, 0);
    const totalDays = studentAttendanceMonthly.reduce((a, b) => a + b.present + b.absent + b.leave, 0);
    const attendancePercent = Math.round((totalPresent / totalDays) * 100);
    const pendingHW = demoHomework.filter(h => h.status === "active" && h.className === "10").length;
    const pendingFee = studentFeeData.filter(f => f.status === "pending").length;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Student Dashboard</h1>
                    <p className="page-subtitle">Welcome, Aarav! Here&apos;s your academic overview</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="badge badge-primary" style={{ fontSize: 12, padding: "6px 14px" }}>Class 10-A • Roll No. 01</span>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid stagger-children">
                <div className="card-stat green">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>My Attendance</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--success)" }}>{attendancePercent}%</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>{totalPresent}/{totalDays} days present</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CalendarCheck size={24} style={{ color: "var(--success-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat purple">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Pending Homework</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{pendingHW}</h2>
                            <p style={{ fontSize: 12, color: "var(--danger)", marginTop: 8 }}>Complete soon!</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <BookOpenCheck size={24} style={{ color: "var(--primary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat cyan">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Upcoming Exams</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>2</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>Mid-Term, Annual</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ClipboardList size={24} style={{ color: "var(--secondary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat amber">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Fee Status</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{pendingFee > 0 ? "₹5K" : "✓"}</h2>
                            <p style={{ fontSize: 12, color: pendingFee > 0 ? "var(--danger)" : "var(--success)", marginTop: 8 }}>{pendingFee > 0 ? "Pending" : "All paid"}</p>
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
                            <Bar dataKey="leave" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Leave" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Latest Results */}
                <div className="chart-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 className="chart-title" style={{ marginBottom: 0 }}>Latest Results - Unit Test 1</h3>
                        <BarChart3 size={18} style={{ color: "var(--text-muted)" }} />
                    </div>
                    {studentResults.map((r, i) => (
                        <div key={r.subject} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < studentResults.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{r.subject}</p>
                            </div>
                            <div style={{ width: 140, height: 8, borderRadius: 4, background: "var(--bg-card-hover)", overflow: "hidden" }}>
                                <div style={{ width: `${r.marks}%`, height: "100%", borderRadius: 4, background: r.marks >= 80 ? "var(--success)" : r.marks >= 60 ? "var(--primary)" : "var(--danger)" }} />
                            </div>
                            <div style={{ width: 60, textAlign: "right" }}>
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{r.marks}/{r.total}</span>
                            </div>
                            <span className="badge badge-primary" style={{ fontSize: 11 }}>{r.grade}</span>
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, padding: "12px 0", borderTop: "1px solid var(--border-color)" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Total</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--primary-light)" }}>{studentResults.reduce((a, b) => a + b.marks, 0)}/{studentResults.reduce((a, b) => a + b.total, 0)}</span>
                    </div>
                </div>
            </div>

            {/* Homework & Notices */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                <div className="chart-card">
                    <h3 className="chart-title">My Homework</h3>
                    {demoHomework.filter(h => h.className === "10" && h.section === "A").map((hw) => (
                        <div key={hw.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: hw.status === "overdue" ? "rgba(239, 68, 68, 0.15)" : "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <BookOpenCheck size={18} style={{ color: hw.status === "overdue" ? "var(--danger)" : "var(--primary-light)" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{hw.title}</h4>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{hw.subject} • Due: {hw.dueDate}</p>
                            </div>
                            <span className={`badge ${hw.status === "active" ? "badge-primary" : "badge-danger"}`} style={{ fontSize: 10 }}>{hw.status}</span>
                        </div>
                    ))}
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">School Notices</h3>
                    {demoNotices.filter(n => n.visibleTo.includes("student")).slice(0, 4).map((notice) => (
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
