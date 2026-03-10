"use client";

import { useState } from "react";
import { demoStudents } from "@/lib/demo-data";
import { Save, ClipboardList } from "lucide-react";

const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Biology"];

export default function MarksEntryPage() {
    const className = "10";
    const section = "A";
    const classStudents = demoStudents.filter((s) => s.className === className && s.section === section);
    const [selectedExam, setSelectedExam] = useState("Mid-Term");
    const [selectedSubject, setSelectedSubject] = useState("Mathematics");
    const [marks, setMarks] = useState<Record<string, number>>(() => {
        const init: Record<string, number> = {};
        classStudents.forEach((s) => { init[s.id] = Math.floor(Math.random() * 30) + 65; });
        return init;
    });

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Marks Entry</h1>
                    <p className="page-subtitle">Enter and manage student examination marks</p>
                </div>
                <button className="btn btn-primary" onClick={() => alert("Marks saved! (Demo mode)")}><Save size={16} /> Save Marks</button>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div className="form-group" style={{ marginBottom: 0, minWidth: 200 }}>
                    <label className="form-label">Exam</label>
                    <select className="form-select" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                        <option>Unit Test 1</option><option>Mid-Term</option><option>Unit Test 2</option><option>Annual Exam</option>
                    </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0, minWidth: 180 }}>
                    <label className="form-label">Class</label>
                    <select className="form-select"><option>Class 10-A</option><option>Class 10-B</option></select>
                </div>
                <div className="form-group" style={{ marginBottom: 0, minWidth: 180 }}>
                    <label className="form-label">Subject</label>
                    <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {subjects.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Info Bar */}
            <div className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, marginBottom: 20, background: "rgba(99, 102, 241, 0.05)" }}>
                <ClipboardList size={20} style={{ color: "var(--primary-light)" }} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    Entering marks for <strong style={{ color: "var(--text-primary)" }}>{selectedExam}</strong> — <strong style={{ color: "var(--primary-light)" }}>{selectedSubject}</strong> — Class {className}-{section} | Total Marks: 100
                </span>
            </div>

            {/* Marks Table */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Student Name</th>
                            <th>Marks (out of 100)</th>
                            <th>Grade</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classStudents.map((student) => {
                            const m = marks[student.id] || 0;
                            const grade = m >= 90 ? "A+" : m >= 80 ? "A" : m >= 70 ? "B+" : m >= 60 ? "B" : m >= 50 ? "C" : "F";
                            const gradeColor = m >= 80 ? "badge-success" : m >= 60 ? "badge-primary" : m >= 50 ? "badge-warning" : "badge-danger";
                            return (
                                <tr key={student.id}>
                                    <td style={{ fontWeight: 500 }}>{student.rollNumber}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 30, height: 30, borderRadius: 6, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>
                                                {student.name.charAt(0)}
                                            </div>
                                            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{student.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-input"
                                            style={{ width: 100, padding: "6px 10px", textAlign: "center" }}
                                            value={m}
                                            min={0}
                                            max={100}
                                            onChange={(e) => setMarks({ ...marks, [student.id]: parseInt(e.target.value) || 0 })}
                                        />
                                    </td>
                                    <td><span className={`badge ${gradeColor}`}>{grade}</span></td>
                                    <td><span className={`badge ${m >= 50 ? "badge-success" : "badge-danger"}`}>{m >= 50 ? "Pass" : "Fail"}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="card" style={{ marginTop: 20, display: "flex", gap: 32, justifyContent: "center", padding: 16 }}>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Average</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "var(--primary-light)" }}>{Math.round(Object.values(marks).reduce((a, b) => a + b, 0) / classStudents.length)}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Highest</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "var(--success)" }}>{Math.max(...Object.values(marks))}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Lowest</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "var(--danger)" }}>{Math.min(...Object.values(marks))}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Pass Rate</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "var(--success)" }}>{Math.round(Object.values(marks).filter(m => m >= 50).length / classStudents.length * 100)}%</p>
                </div>
            </div>
        </div>
    );
}
