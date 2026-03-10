"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    Users, UserCog, DollarSign, CalendarCheck, TrendingUp, TrendingDown,
    ClipboardList, Clock, Loader2, Inbox,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import * as fs from "@/lib/firestore-service";

const COLORS = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const enrollmentData = [
    { month: "Jul", students: 0 }, { month: "Aug", students: 0 }, { month: "Sep", students: 0 },
    { month: "Oct", students: 0 }, { month: "Nov", students: 0 }, { month: "Dec", students: 0 },
];
const feeCollectionData = [
    { month: "Jul", collected: 0, pending: 0 }, { month: "Aug", collected: 0, pending: 0 },
    { month: "Sep", collected: 0, pending: 0 }, { month: "Oct", collected: 0, pending: 0 },
];
const genderData = [{ name: "Male", value: 55 }, { name: "Female", value: 45 }];

export default function AdminDashboard() {
    const { userProfile } = useAuth();
    const schoolId = userProfile?.schoolId || "";
    const [stats, setStats] = useState({ totalTeachers: 0, totalStudents: 0, totalEnquiries: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!schoolId) { setLoading(false); return; }
            try {
                const s = await fs.getSchoolStats(schoolId);
                setStats(s);
            } catch (err) { console.error(err); }
            setLoading(false);
        }
        load();
    }, [schoolId]);

    if (loading) return (
        <div style={{ textAlign: "center", padding: 80 }}>
            <Loader2 size={40} className="spinner" style={{ margin: "0 auto" }} />
            <p style={{ marginTop: 16, color: "var(--text-muted)" }}>Loading dashboard...</p>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Admin Dashboard</h1>
                    <p className="page-subtitle">{userProfile?.schoolName || "School"} — Overview & Control Panel</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn btn-secondary">
                        <Clock size={16} />
                        {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid stagger-children">
                <div className="card-stat purple">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Total Students</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{stats.totalStudents}</h2>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                                <TrendingUp size={14} style={{ color: "var(--success)" }} />
                                <span style={{ fontSize: 12, color: "var(--success)" }}>Live</span>
                            </div>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Users size={24} style={{ color: "var(--primary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat cyan">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Total Teachers</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{stats.totalTeachers}</h2>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                                <TrendingUp size={14} style={{ color: "var(--success)" }} />
                                <span style={{ fontSize: 12, color: "var(--success)" }}>Live</span>
                            </div>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <UserCog size={24} style={{ color: "var(--secondary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat green">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Total Enquiries</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{stats.totalEnquiries}</h2>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                                <Inbox size={14} style={{ color: "var(--success)" }} />
                                <span style={{ fontSize: 12, color: "var(--success)" }}>Live</span>
                            </div>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CalendarCheck size={24} style={{ color: "var(--success-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat amber">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>School ID</p>
                            <h2 style={{ fontSize: 16, fontWeight: 700, wordBreak: "break-all" }}>{schoolId ? schoolId.substring(0, 10) + "..." : "N/A"}</h2>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <DollarSign size={24} style={{ color: "var(--accent-light)" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="chart-grid">
                <div className="chart-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 className="chart-title" style={{ marginBottom: 0 }}>Student Enrollment</h3>
                        <span className="badge badge-primary">This Year</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={enrollmentData}>
                            <defs>
                                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13, color: "#f1f5f9" }} />
                            <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} fill="url(#colorStudents)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 className="chart-title" style={{ marginBottom: 0 }}>Fee Collection</h3>
                        <span className="badge badge-success">₹ in thousands</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={feeCollectionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13, color: "#f1f5f9" }} />
                            <Bar dataKey="collected" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="pending" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.6} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Section */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                <div className="chart-card">
                    <h3 className="chart-title">Gender Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={genderData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={5} dataKey="value">
                                {genderData.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                            </Pie>
                            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13, color: "#f1f5f9" }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 4 }}>
                        {genderData.map((item, i) => (
                            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS[i] }} />
                                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.name}: {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chart-card">
                    <h3 className="chart-title">Quick Info</h3>
                    <div style={{ padding: 16 }}>
                        <p style={{ fontSize: 14, marginBottom: 12 }}><strong>School:</strong> {userProfile?.schoolName || "—"}</p>
                        <p style={{ fontSize: 14, marginBottom: 12 }}><strong>Admin:</strong> {userProfile?.displayName}</p>
                        <p style={{ fontSize: 14, marginBottom: 12 }}><strong>Email:</strong> {userProfile?.email}</p>
                        <p style={{ fontSize: 14, marginBottom: 12 }}><strong>Role:</strong> <span className="badge badge-primary">{userProfile?.role}</span></p>
                        <p style={{ fontSize: 14 }}><strong>Teachers:</strong> {stats.totalTeachers} | <strong>Students:</strong> {stats.totalStudents} | <strong>Enquiries:</strong> {stats.totalEnquiries}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
