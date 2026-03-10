"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import { demoStudents } from "@/lib/demo-data";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, User } from "lucide-react";

export default function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const student = demoStudents.find((s) => s.id === id);
    const [activeTab, setActiveTab] = useState("info");

    if (!student) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon"><User size={36} /></div>
                <h2 className="empty-state-title">Student Not Found</h2>
                <p className="empty-state-text">The student you are looking for does not exist.</p>
                <Link href="/students" className="btn btn-primary">Back to Students</Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Link href="/students" className="btn btn-ghost btn-icon"><ArrowLeft size={20} /></Link>
                    <div>
                        <h1 className="page-title">Student Profile</h1>
                        <p className="page-subtitle">{student.id}</p>
                    </div>
                </div>
                <button className="btn btn-primary"><Edit size={16} /> Edit Student</button>
            </div>

            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar">{student.name.charAt(0)}</div>
                <div className="profile-info">
                    <h1>{student.name}</h1>
                    <p>Class {student.className}-{student.section} | Roll No. {student.rollNumber}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <span className={`badge ${student.status === "active" ? "badge-success" : "badge-danger"}`}>{student.status}</span>
                        <span className="badge badge-primary">{student.gender}</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                {["info", "attendance", "fees", "results"].map((tab) => (
                    <button key={tab} className={`profile-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)} style={{ textTransform: "capitalize" }}>{tab}</button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "info" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div className="card">
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Personal Details</h3>
                        {[
                            { icon: User, label: "Father's Name", value: student.fatherName },
                            { icon: Calendar, label: "Date of Birth", value: student.dateOfBirth || "N/A" },
                            { icon: Phone, label: "Phone", value: student.phone },
                            { icon: Mail, label: "Email", value: student.email || "N/A" },
                            { icon: MapPin, label: "Address", value: student.address },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < 4 ? "1px solid var(--border-light)" : "none" }}>
                                <item.icon size={16} style={{ color: "var(--text-muted)", marginTop: 2 }} />
                                <div>
                                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p>
                                    <p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Academic Details</h3>
                        {[
                            { label: "Class", value: `${student.className}-${student.section}` },
                            { label: "Roll Number", value: student.rollNumber },
                            { label: "Admission Date", value: student.admissionDate },
                            { label: "Student ID", value: student.id },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--border-light)" : "none" }}>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.label}</p>
                                <p style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "attendance" && (
                <div className="card">
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Attendance Summary</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                        <div style={{ textAlign: "center", padding: 16, background: "rgba(16, 185, 129, 0.08)", borderRadius: "var(--radius-md)" }}>
                            <p style={{ fontSize: 28, fontWeight: 700, color: "var(--success)" }}>85%</p>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Attendance Rate</p>
                        </div>
                        <div style={{ textAlign: "center", padding: 16, background: "rgba(99, 102, 241, 0.08)", borderRadius: "var(--radius-md)" }}>
                            <p style={{ fontSize: 28, fontWeight: 700, color: "var(--primary)" }}>170</p>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Days Present</p>
                        </div>
                        <div style={{ textAlign: "center", padding: 16, background: "rgba(239, 68, 68, 0.08)", borderRadius: "var(--radius-md)" }}>
                            <p style={{ fontSize: 28, fontWeight: 700, color: "var(--danger)" }}>30</p>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Days Absent</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "fees" && (
                <div className="card">
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Fee History</h3>
                    <table className="data-table">
                        <thead><tr><th>Month</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                            {["January", "February", "March"].map((month, i) => (
                                <tr key={month}>
                                    <td>{month} 2025</td>
                                    <td>₹5,000</td>
                                    <td><span className={`badge ${i < 2 ? "badge-success" : "badge-warning"}`}>{i < 2 ? "Paid" : "Pending"}</span></td>
                                    <td>{i < 2 ? `${5 + i * 5}/0${i + 1}/2025` : "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "results" && (
                <div className="card">
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Exam Results</h3>
                    <table className="data-table">
                        <thead><tr><th>Subject</th><th>Marks</th><th>Total</th><th>Grade</th></tr></thead>
                        <tbody>
                            {[
                                { subject: "Mathematics", marks: 85, total: 100, grade: "A" },
                                { subject: "Physics", marks: 78, total: 100, grade: "B+" },
                                { subject: "Chemistry", marks: 92, total: 100, grade: "A+" },
                                { subject: "English", marks: 88, total: 100, grade: "A" },
                                { subject: "Biology", marks: 74, total: 100, grade: "B" },
                            ].map((r) => (
                                <tr key={r.subject}>
                                    <td>{r.subject}</td>
                                    <td>{r.marks}</td>
                                    <td>{r.total}</td>
                                    <td><span className="badge badge-primary">{r.grade}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
