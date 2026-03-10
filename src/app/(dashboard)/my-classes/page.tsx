"use client";

import Link from "next/link";
import { teacherClasses } from "@/lib/role-data";
import { demoStudents } from "@/lib/demo-data";
import { School, Users, CalendarCheck, BookOpenCheck, Eye, ClipboardList } from "lucide-react";

export default function MyClassesPage() {
    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Classes</h1>
                    <p className="page-subtitle">Your assigned classes and student lists</p>
                </div>
            </div>

            {/* Class Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                {teacherClasses.map((cls) => (
                    <div key={cls.classId} className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ padding: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: "linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "white" }}>
                                    {cls.className}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>Class {cls.className}-{cls.section}</h3>
                                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{cls.subject}</p>
                                </div>
                                <span className="badge badge-success" style={{ marginLeft: "auto" }}>Active</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                                <div style={{ padding: 14, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                    <Users size={18} style={{ color: "var(--primary-light)", margin: "0 auto 6px" }} />
                                    <p style={{ fontSize: 18, fontWeight: 700 }}>{cls.studentCount}</p>
                                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Students</p>
                                </div>
                                <div style={{ padding: 14, background: "rgba(16, 185, 129, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                    <CalendarCheck size={18} style={{ color: "var(--success)", margin: "0 auto 6px" }} />
                                    <p style={{ fontSize: 18, fontWeight: 700 }}>92%</p>
                                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Attendance</p>
                                </div>
                                <div style={{ padding: 14, background: "rgba(245, 158, 11, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                    <BookOpenCheck size={18} style={{ color: "var(--accent)", margin: "0 auto 6px" }} />
                                    <p style={{ fontSize: 18, fontWeight: 700 }}>{cls.todayPeriods}</p>
                                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Today</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", borderTop: "1px solid var(--border-color)" }}>
                            <Link href="/attendance" className="btn btn-ghost" style={{ flex: 1, borderRadius: 0, padding: 14, justifyContent: "center", fontSize: 13 }}><CalendarCheck size={14} /> Attendance</Link>
                            <div style={{ width: 1, background: "var(--border-color)" }} />
                            <Link href="/marks" className="btn btn-ghost" style={{ flex: 1, borderRadius: 0, padding: 14, justifyContent: "center", fontSize: 13 }}><ClipboardList size={14} /> Marks</Link>
                            <div style={{ width: 1, background: "var(--border-color)" }} />
                            <Link href="/homework" className="btn btn-ghost" style={{ flex: 1, borderRadius: 0, padding: 14, justifyContent: "center", fontSize: 13 }}><BookOpenCheck size={14} /> Homework</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Student List for First Class */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Students - Class 10-A</h3>
                    <span className="badge badge-primary">{demoStudents.filter(s => s.className === "10").length} students</span>
                </div>
                <table className="data-table">
                    <thead>
                        <tr><th>Student</th><th>Roll No</th><th>Father&apos;s Name</th><th>Phone</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {demoStudents.filter(s => s.className === "10").map((student) => (
                            <tr key={student.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 6, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white" }}>
                                            {student.name.charAt(0)}
                                        </div>
                                        <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{student.name}</span>
                                    </div>
                                </td>
                                <td>{student.rollNumber}</td>
                                <td>{student.fatherName}</td>
                                <td>{student.phone}</td>
                                <td><span className={`badge ${student.status === "active" ? "badge-success" : "badge-danger"}`}>{student.status}</span></td>
                                <td><button className="btn btn-ghost btn-icon btn-sm"><Eye size={14} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
