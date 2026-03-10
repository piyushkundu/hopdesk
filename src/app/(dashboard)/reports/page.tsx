"use client";

import { FileText, Download, Printer, Users, CalendarCheck, DollarSign, ClipboardList } from "lucide-react";

const reports = [
    { id: "REP001", title: "Student Report", description: "Complete student data with class, section, and status information", icon: Users, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.15)", type: "student" },
    { id: "REP002", title: "Attendance Report", description: "Daily, monthly, and class-wise attendance analysis with charts", icon: CalendarCheck, color: "var(--success)", bg: "rgba(16, 185, 129, 0.15)", type: "attendance" },
    { id: "REP003", title: "Fee Collection Report", description: "Detailed fee collection, pending dues, and payment history", icon: DollarSign, color: "var(--accent)", bg: "rgba(245, 158, 11, 0.15)", type: "fee" },
    { id: "REP004", title: "Exam Result Report", description: "Subject-wise marks, grades, pass/fail analysis per class", icon: ClipboardList, color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.15)", type: "exam" },
    { id: "REP005", title: "Teacher Report", description: "Teacher list with subjects, assigned classes, and salary details", icon: Users, color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.15)", type: "teacher" },
    { id: "REP006", title: "Class Report", description: "Class-wise student distribution, performance, and attendance summary", icon: FileText, color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)", type: "class" },
];

export default function ReportsPage() {
    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Reports</h1>
                    <p className="page-subtitle">Generate and download comprehensive school reports</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }} className="stagger-children">
                {reports.map((report) => (
                    <div key={report.id} className="card">
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 12, background: report.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <report.icon size={22} style={{ color: report.color }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{report.title}</h3>
                                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{report.description}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}><FileText size={14} /> Generate</button>
                            <button className="btn btn-secondary btn-sm"><Download size={14} /> PDF</button>
                            <button className="btn btn-ghost btn-sm"><Printer size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
