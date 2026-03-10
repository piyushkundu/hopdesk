"use client";

import { User, Mail, Phone, MapPin, Calendar, School, Hash } from "lucide-react";
import { demoStudents } from "@/lib/demo-data";

export default function MyProfilePage() {
    // Using first student "Aarav Sharma" as logged-in student
    const student = demoStudents[0];

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Profile</h1>
                    <p className="page-subtitle">Your personal and academic details</p>
                </div>
            </div>

            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar" style={{ width: 80, height: 80, fontSize: 32 }}>{student.name.charAt(0)}</div>
                <div className="profile-info">
                    <h1>{student.name}</h1>
                    <p>Class {student.className}-{student.section} | Roll No. {student.rollNumber}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <span className="badge badge-success">Active</span>
                        <span className="badge badge-primary">{student.gender}</span>
                        <span className="badge badge-info">{student.id}</span>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div className="card">
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Personal Information</h3>
                    {[
                        { icon: User, label: "Full Name", value: student.name },
                        { icon: User, label: "Father's Name", value: student.fatherName },
                        { icon: Calendar, label: "Date of Birth", value: student.dateOfBirth || "15/06/2009" },
                        { icon: Phone, label: "Phone", value: student.phone },
                        { icon: Mail, label: "Email", value: student.email || "aarav.sharma@student.email" },
                        { icon: MapPin, label: "Address", value: student.address },
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < 5 ? "1px solid var(--border-light)" : "none" }}>
                            <item.icon size={16} style={{ color: "var(--text-muted)", marginTop: 2, flexShrink: 0 }} />
                            <div>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p>
                                <p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Academic Information</h3>
                    {[
                        { icon: School, label: "Class", value: `${student.className}-${student.section}` },
                        { icon: Hash, label: "Roll Number", value: student.rollNumber },
                        { icon: Calendar, label: "Admission Date", value: student.admissionDate },
                        { icon: User, label: "Student ID", value: student.id },
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0", borderBottom: i < 3 ? "1px solid var(--border-light)" : "none" }}>
                            <item.icon size={16} style={{ color: "var(--primary-light)", marginTop: 2, flexShrink: 0 }} />
                            <div>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p>
                                <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p>
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: 24 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Quick Stats</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div style={{ padding: 14, background: "rgba(16, 185, 129, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                <p style={{ fontSize: 20, fontWeight: 700, color: "var(--success)" }}>92%</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Attendance</p>
                            </div>
                            <div style={{ padding: 14, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
                                <p style={{ fontSize: 20, fontWeight: 700, color: "var(--primary-light)" }}>83%</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Avg. Marks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
