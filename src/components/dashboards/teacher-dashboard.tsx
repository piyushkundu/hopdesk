"use client";

import Link from "next/link";
import { School, CalendarCheck, ClipboardList, BookOpenCheck, Calendar, Bell, Users, Clock } from "lucide-react";
import { teacherClasses, demoHomework, demoNotices } from "@/lib/role-data";

export default function TeacherDashboard() {
    const todayClasses = teacherClasses.reduce((a, b) => a + b.todayPeriods, 0);
    const totalStudents = teacherClasses.reduce((a, b) => a + b.studentCount, 0);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Teacher Dashboard</h1>
                    <p className="page-subtitle">Welcome back, John! Here&apos;s your teaching overview</p>
                </div>
                <div className="btn btn-secondary">
                    <Clock size={16} />
                    {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid stagger-children">
                <div className="card-stat purple">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>My Classes</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{teacherClasses.length}</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>Assigned classes</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <School size={24} style={{ color: "var(--primary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat cyan">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Today&apos;s Classes</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{todayClasses}</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>periods today</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Calendar size={24} style={{ color: "var(--secondary-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat green">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Total Students</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>{totalStudents}</h2>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>across all classes</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Users size={24} style={{ color: "var(--success-light)" }} />
                        </div>
                    </div>
                </div>
                <div className="card-stat amber">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>Pending Attendance</p>
                            <h2 style={{ fontSize: 32, fontWeight: 700 }}>1</h2>
                            <p style={{ fontSize: 12, color: "var(--danger)", marginTop: 8 }}>Mark now →</p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CalendarCheck size={24} style={{ color: "var(--accent-light)" }} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* My Classes */}
                <div className="chart-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 className="chart-title" style={{ marginBottom: 0 }}>My Classes</h3>
                        <Link href="/my-classes" className="btn btn-ghost btn-sm">View All</Link>
                    </div>
                    {teacherClasses.map((cls) => (
                        <div key={cls.classId} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "white" }}>
                                {cls.className}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Class {cls.className}-{cls.section}</h4>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{cls.subject} • {cls.studentCount} students</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--primary-light)" }}>{cls.todayPeriods} periods</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>today</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Assigned Homework */}
                <div className="chart-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <h3 className="chart-title" style={{ marginBottom: 0 }}>Recent Homework</h3>
                        <Link href="/homework" className="btn btn-primary btn-sm"><BookOpenCheck size={14} /> Assign New</Link>
                    </div>
                    {demoHomework.filter(h => h.teacherName === "Dr. Meena Iyer" || h.teacherName === "Rajiv Menon").slice(0, 4).map((hw) => (
                        <div key={hw.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{hw.title}</h4>
                                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Class {hw.className}-{hw.section} • {hw.subject}</p>
                                </div>
                                <span className={`badge ${hw.status === "active" ? "badge-primary" : hw.status === "overdue" ? "badge-danger" : "badge-success"}`} style={{ fontSize: 10 }}>{hw.status}</span>
                            </div>
                            <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Due: {hw.dueDate}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notices & Upcoming Exams */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                <div className="chart-card">
                    <h3 className="chart-title">Upcoming Exams</h3>
                    <div style={{ padding: "16px", background: "rgba(245, 158, 11, 0.06)", borderRadius: "var(--radius-md)", marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Mid-Term Examination</h4>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Class 10-A • Mathematics</p>
                            </div>
                            <span className="badge badge-warning">Mar 15</span>
                        </div>
                    </div>
                    <div style={{ padding: "16px", background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-md)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Annual Exam</h4>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Class 10-B • Mathematics</p>
                            </div>
                            <span className="badge badge-primary">Apr 01</span>
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">School Notices</h3>
                    {demoNotices.filter(n => n.visibleTo.includes("teacher")).slice(0, 3).map((notice) => (
                        <div key={notice.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <Bell size={14} style={{ color: notice.priority === "high" ? "var(--danger)" : "var(--text-muted)" }} />
                                <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{notice.title}</h4>
                            </div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>{notice.message.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
