"use client";

import { BarChart3, TrendingUp, Users, Building2 } from "lucide-react";

const schoolPerformance = [
    { name: "Delhi Public School", students: 850, teachers: 65, attendance: 94, revenue: 4.2 },
    { name: "St. Mary International", students: 1200, teachers: 95, attendance: 96, revenue: 7.8 },
    { name: "Green Valley Academy", students: 430, teachers: 32, attendance: 91, revenue: 1.8 },
    { name: "Modern Academy", students: 620, teachers: 48, attendance: 93, revenue: 3.1 },
    { name: "DAV Public School", students: 550, teachers: 42, attendance: 92, revenue: 2.7 },
    { name: "Kendriya Vidyalaya", students: 720, teachers: 55, attendance: 95, revenue: 3.5 },
    { name: "Ryan International", students: 980, teachers: 75, attendance: 94, revenue: 5.6 },
    { name: "Sapphire International", students: 490, teachers: 38, attendance: 90, revenue: 2.4 },
    { name: "Little Flower School", students: 380, teachers: 28, attendance: 88, revenue: 1.5 },
];

const userGrowth = [
    { month: "Sep", students: 3200, teachers: 280 }, { month: "Oct", students: 3400, teachers: 300 },
    { month: "Nov", students: 3650, teachers: 310 }, { month: "Dec", students: 3800, teachers: 325 },
    { month: "Jan", students: 4100, teachers: 345 }, { month: "Feb", students: 4500, teachers: 360 },
    { month: "Mar", students: 4850, teachers: 380 },
];

export default function AnalyticsPage() {
    const maxStudents = Math.max(...schoolPerformance.map(s => s.students));
    const maxUG = Math.max(...userGrowth.map(u => u.students));

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">Analytics</h1><p className="page-subtitle">Global school performance & user growth metrics</p></div>
            </div>

            {/* User Growth Chart */}
            <div className="card" style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>User Growth (Students & Teachers)</h3>
                    <span className="badge badge-success">+51% Students</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 180 }}>
                    {userGrowth.map((d) => (
                        <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: "#6366f1" }}>{d.students}</span>
                            <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end" }}>
                                <div style={{ flex: 1, height: `${(d.students / maxUG) * 140}px`, background: "linear-gradient(180deg, #6366f1, #818cf8)", borderRadius: 4 }} />
                                <div style={{ flex: 1, height: `${(d.teachers / maxUG) * 140}px`, background: "linear-gradient(180deg, #6366f1, #a5b4fc)", borderRadius: 4 }} />
                            </div>
                            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{d.month}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#6366f1" }} /> Students</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#a5b4fc" }} /> Teachers</div>
                </div>
            </div>

            {/* School Performance Table */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>School Performance</h3>
                </div>
                <table className="data-table">
                    <thead><tr><th>School</th><th>Students</th><th>Teachers</th><th>Attendance %</th><th>Revenue (₹L)</th><th>Performance</th></tr></thead>
                    <tbody>
                        {schoolPerformance.map((s) => (
                            <tr key={s.name}>
                                <td style={{ fontWeight: 500 }}>{s.name}</td>
                                <td>{s.students.toLocaleString()}</td>
                                <td>{s.teachers}</td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 60, height: 6, borderRadius: 3, background: "var(--border-color)" }}>
                                            <div style={{ width: `${s.attendance}%`, height: 6, borderRadius: 3, background: s.attendance >= 93 ? "#10b981" : s.attendance >= 90 ? "#f59e0b" : "#ef4444" }} />
                                        </div>
                                        <span style={{ fontSize: 12 }}>{s.attendance}%</span>
                                    </div>
                                </td>
                                <td style={{ fontWeight: 600 }}>₹{s.revenue}L</td>
                                <td>
                                    <div style={{ width: "100%", height: 8, borderRadius: 4, background: "var(--border-color)" }}>
                                        <div style={{ width: `${(s.students / maxStudents) * 100}%`, height: 8, borderRadius: 4, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
