"use client";

import { useState } from "react";
import { demoStudents, demoClasses, demoAttendance } from "@/lib/demo-data";
import { CalendarCheck, Save, CheckCircle, XCircle, Clock } from "lucide-react";

type AttendanceStatus = "present" | "absent" | "leave";

export default function AttendancePage() {
    const [selectedClass, setSelectedClass] = useState("CLS005");
    const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
        const init: Record<string, AttendanceStatus> = {};
        demoAttendance.forEach((a) => { init[a.studentId] = a.status as AttendanceStatus; });
        return init;
    });

    const classStudents = demoStudents.filter((s) => {
        const cls = demoClasses.find((c) => c.id === selectedClass);
        return cls && s.className === cls.className;
    });

    const setStatus = (studentId: string, status: AttendanceStatus) => {
        setAttendance((prev) => ({ ...prev, [studentId]: status }));
    };

    const presentCount = Object.values(attendance).filter((s) => s === "present").length;
    const absentCount = Object.values(attendance).filter((s) => s === "absent").length;
    const leaveCount = Object.values(attendance).filter((s) => s === "leave").length;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Attendance</h1>
                    <p className="page-subtitle">Mark daily attendance for students</p>
                </div>
                <button className="btn btn-primary" onClick={() => alert("Attendance saved! (Demo mode)")}>
                    <Save size={16} /> Save Attendance
                </button>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div className="form-group" style={{ marginBottom: 0, minWidth: 200 }}>
                    <label className="form-label">Select Class</label>
                    <select className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        {demoClasses.map((cls) => (
                            <option key={cls.id} value={cls.id}>Class {cls.className}-{cls.section}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0, minWidth: 200 }}>
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" value={selectedDate} readOnly />
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CalendarCheck size={20} style={{ color: "var(--primary)" }} />
                        <div>
                            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Total</p>
                            <p style={{ fontSize: 18, fontWeight: 700 }}>{classStudents.length}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle size={20} style={{ color: "var(--success)" }} />
                        <div>
                            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Present</p>
                            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--success)" }}>{presentCount}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <XCircle size={20} style={{ color: "var(--danger)" }} />
                        <div>
                            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Absent</p>
                            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--danger)" }}>{absentCount}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Clock size={20} style={{ color: "var(--warning)" }} />
                        <div>
                            <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Leave</p>
                            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--warning)" }}>{leaveCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance List */}
            <div className="attendance-grid">
                {classStudents.map((student, i) => (
                    <div key={student.id} className="attendance-row" style={{ animationDelay: `${i * 0.03}s` }}>
                        <div className="attendance-student-info">
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "white" }}>
                                {student.name.charAt(0)}
                            </div>
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{student.name}</p>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Roll No. {student.rollNumber}</p>
                            </div>
                        </div>
                        <div className="attendance-actions">
                            <button className={`attendance-btn ${attendance[student.id] === "present" ? "present" : ""}`} onClick={() => setStatus(student.id, "present")}>Present</button>
                            <button className={`attendance-btn ${attendance[student.id] === "absent" ? "absent" : ""}`} onClick={() => setStatus(student.id, "absent")}>Absent</button>
                            <button className={`attendance-btn ${attendance[student.id] === "leave" ? "leave" : ""}`} onClick={() => setStatus(student.id, "leave")}>Leave</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
