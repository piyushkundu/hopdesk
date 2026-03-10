"use client";

import { useState, useEffect } from "react";
import { Building2, Users, UserCog, DollarSign, TrendingUp, AlertCircle, Inbox, Activity, Loader2 } from "lucide-react";
import * as fs from "@/lib/firestore-service";

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [schools, setSchools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [s, sch] = await Promise.all([fs.getGlobalStats(), fs.getSchools()]);
                setStats(s);
                setSchools(sch);
            } catch (err) { console.error(err); }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return (
        <div className="animate-fade-in" style={{ textAlign: "center", padding: 80 }}>
            <Loader2 size={40} className="spinner" style={{ margin: "0 auto", color: "#6366f1" }} />
            <p style={{ marginTop: 16, color: "#94a3b8" }}>Loading dashboard...</p>
        </div>
    );

    const statCards = [
        { label: "Total Schools", value: stats?.totalSchools || 0, icon: Building2, color: "#6366f1", bg: "#eef2ff" },
        { label: "Active Schools", value: stats?.activeSchools || 0, icon: Activity, color: "#10b981", bg: "#ecfdf5" },
        { label: "Inactive Schools", value: stats?.inactiveSchools || 0, icon: AlertCircle, color: "#f59e0b", bg: "#fffbeb" },
        { label: "Total Students", value: stats?.totalStudents || 0, icon: Users, color: "#3b82f6", bg: "#eff6ff" },
        { label: "Total Teachers", value: stats?.totalTeachers || 0, icon: UserCog, color: "#06b6d4", bg: "#ecfeff" },
        { label: "Total Users", value: stats?.totalUsers || 0, icon: DollarSign, color: "#8b5cf6", bg: "#f5f3ff" },
        { label: "Total Enquiries", value: stats?.totalEnquiries || 0, icon: Inbox, color: "#ec4899", bg: "#fdf2f8" },
    ];

    const planBadge: Record<string, string> = { Enterprise: "badge-danger", Premium: "badge-primary", Standard: "badge-warning", Basic: "badge-info" };
    const statusBadge: Record<string, string> = { active: "badge-success", inactive: "badge-danger", suspended: "badge-warning" };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title" style={{ fontSize: 26, color: "#1e293b" }}>Super Admin Dashboard</h1>
                    <p className="page-subtitle" style={{ color: "#94a3b8" }}>Multi-School ERP Overview — Live Data</p>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: 10,
                    background: "#ecfdf5",
                    border: "1px solid #bbf7d0",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#16a34a",
                }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
                    Live
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                {statCards.map((s) => (
                    <div key={s.label} style={{
                        padding: 20,
                        background: "white",
                        borderRadius: 14,
                        border: "1px solid #e8eaed",
                        transition: "all 0.2s ease",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{
                                width: 46,
                                height: 46,
                                borderRadius: 12,
                                background: s.bg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <s.icon size={22} style={{ color: s.color }} />
                            </div>
                            <div>
                                <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4, fontWeight: 500 }}>{s.label}</p>
                                <p style={{ fontSize: 24, fontWeight: 700, color: "#1e293b" }}>{s.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Schools Table */}
            <div style={{
                background: "white",
                borderRadius: 14,
                border: "1px solid #e8eaed",
                overflow: "hidden",
            }}>
                <div style={{
                    padding: "18px 24px",
                    borderBottom: "1px solid #f0f1f3",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>All Schools</h3>
                    <a href="/superadmin/schools" style={{
                        fontSize: 13,
                        color: "#6366f1",
                        textDecoration: "none",
                        fontWeight: 600,
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: "#eef2ff",
                        transition: "all 0.15s",
                    }}>Manage →</a>
                </div>
                {schools.length === 0 ? (
                    <div style={{ padding: 48, textAlign: "center" }}>
                        <Building2 size={44} style={{ margin: "0 auto 14px", color: "#cbd5e1" }} />
                        <p style={{ color: "#94a3b8", fontSize: 15 }}>No schools yet. Go to Schools to add your first one.</p>
                    </div>
                ) : (
                    <table className="data-table">
                        <thead><tr><th>School</th><th>Code</th><th>Plan</th><th>Status</th><th>Admin</th></tr></thead>
                        <tbody>
                            {schools.slice(0, 10).map((s: any) => (
                                <tr key={s.id}>
                                    <td style={{ fontWeight: 500, color: "#1e293b" }}>{s.name}</td>
                                    <td><code style={{ fontSize: 12, color: "#6366f1", background: "#eef2ff", padding: "2px 8px", borderRadius: 6 }}>{s.code}</code></td>
                                    <td><span className={`badge ${planBadge[s.plan] || "badge-info"}`}>{s.plan}</span></td>
                                    <td><span className={`badge ${statusBadge[s.status] || "badge-info"}`}>{s.status}</span></td>
                                    <td style={{ fontSize: 12, color: "#64748b" }}>{s.adminEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
