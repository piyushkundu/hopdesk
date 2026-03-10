"use client";

import { demoStudents } from "@/lib/demo-data";
import { User, Mail, Phone, MapPin, Calendar, School, Hash, CalendarCheck, BarChart3 } from "lucide-react";

export default function ChildProfilePage() {
    const student = demoStudents[0]; // Aarav Sharma - linked to parent

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Child Profile</h1>
                    <p className="page-subtitle">Your child&apos;s personal and academic details</p>
                </div>
            </div>

            <div className="profile-header">
                <div className="profile-avatar" style={{ width: 80, height: 80, fontSize: 32 }}>A</div>
                <div className="profile-info">
                    <h1>{student.name}</h1>
                    <p>Class {student.className}-{student.section} | Roll No. {student.rollNumber}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <span className="badge badge-success">Active</span>
                        <span className="badge badge-primary">{student.gender}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div className="card">
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Student Details</h3>
                    {[
                        { icon: User, label: "Name", value: student.name },
                        { icon: School, label: "Class", value: `${student.className}-${student.section}` },
                        { icon: Hash, label: "Roll Number", value: student.rollNumber },
                        { icon: Calendar, label: "Admission Date", value: student.admissionDate },
                        { icon: Phone, label: "Phone", value: student.phone },
                        { icon: Mail, label: "Email", value: student.email || "N/A" },
                        { icon: MapPin, label: "Address", value: student.address },
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < 6 ? "1px solid var(--border-light)" : "none" }}>
                            <item.icon size={16} style={{ color: "var(--text-muted)", marginTop: 2, flexShrink: 0 }} />
                            <div>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p>
                                <p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="card" style={{ marginBottom: 20 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Quick Overview</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div style={{ padding: 16, background: "rgba(16, 185, 129, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                <CalendarCheck size={20} style={{ color: "var(--success)", margin: "0 auto 8px" }} />
                                <p style={{ fontSize: 22, fontWeight: 700, color: "var(--success)" }}>92%</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Attendance</p>
                            </div>
                            <div style={{ padding: 16, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                <BarChart3 size={20} style={{ color: "var(--primary-light)", margin: "0 auto 8px" }} />
                                <p style={{ fontSize: 22, fontWeight: 700, color: "var(--primary-light)" }}>83%</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Avg. Marks</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Parent Contact</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
                            <User size={16} style={{ color: "var(--text-muted)" }} />
                            <div>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Father&apos;s Name</p>
                                <p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{student.fatherName}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
                            <Phone size={16} style={{ color: "var(--text-muted)" }} />
                            <div>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Phone</p>
                                <p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{student.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
