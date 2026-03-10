"use client";

import { useState } from "react";
import { Calendar, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import Modal from "@/components/ui/modal";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = ["8:00-8:45", "8:45-9:30", "9:30-10:15", "10:30-11:15", "11:15-12:00", "12:00-12:45", "1:30-2:15", "2:15-3:00"];

const initialTimetable: Record<string, Record<string, { subject: string; teacher: string }>> = {
    Monday: { "8:00-8:45": { subject: "Mathematics", teacher: "Dr. Meena Iyer" }, "8:45-9:30": { subject: "Physics", teacher: "Rajiv Menon" }, "9:30-10:15": { subject: "English", teacher: "Sunita Devi" }, "10:30-11:15": { subject: "Chemistry", teacher: "Amit Tiwari" }, "11:15-12:00": { subject: "Biology", teacher: "Pooja Nair" }, "12:00-12:45": { subject: "Hindi", teacher: "Rekha Sharma" }, "1:30-2:15": { subject: "P.E.", teacher: "Suresh Kumar" }, "2:15-3:00": { subject: "Art", teacher: "Maya Patel" } },
    Tuesday: { "8:00-8:45": { subject: "Physics", teacher: "Rajiv Menon" }, "8:45-9:30": { subject: "Mathematics", teacher: "Dr. Meena Iyer" }, "9:30-10:15": { subject: "Chemistry", teacher: "Amit Tiwari" }, "10:30-11:15": { subject: "English", teacher: "Sunita Devi" }, "11:15-12:00": { subject: "Hindi", teacher: "Rekha Sharma" }, "12:00-12:45": { subject: "Biology", teacher: "Pooja Nair" }, "1:30-2:15": { subject: "Computer", teacher: "Vikram Singh" }, "2:15-3:00": { subject: "Music", teacher: "Anita Joshi" } },
    Wednesday: { "8:00-8:45": { subject: "English", teacher: "Sunita Devi" }, "8:45-9:30": { subject: "Chemistry", teacher: "Amit Tiwari" }, "9:30-10:15": { subject: "Mathematics", teacher: "Dr. Meena Iyer" }, "10:30-11:15": { subject: "Physics", teacher: "Rajiv Menon" }, "11:15-12:00": { subject: "Computer", teacher: "Vikram Singh" }, "12:00-12:45": { subject: "Hindi", teacher: "Rekha Sharma" }, "1:30-2:15": { subject: "Biology", teacher: "Pooja Nair" }, "2:15-3:00": { subject: "Library", teacher: "Self Study" } },
    Thursday: { "8:00-8:45": { subject: "Chemistry", teacher: "Amit Tiwari" }, "8:45-9:30": { subject: "Biology", teacher: "Pooja Nair" }, "9:30-10:15": { subject: "Physics", teacher: "Rajiv Menon" }, "10:30-11:15": { subject: "Mathematics", teacher: "Dr. Meena Iyer" }, "11:15-12:00": { subject: "English", teacher: "Sunita Devi" }, "12:00-12:45": { subject: "Social Sc.", teacher: "Deepak Verma" }, "1:30-2:15": { subject: "P.E.", teacher: "Suresh Kumar" }, "2:15-3:00": { subject: "Hindi", teacher: "Rekha Sharma" } },
    Friday: { "8:00-8:45": { subject: "Mathematics", teacher: "Dr. Meena Iyer" }, "8:45-9:30": { subject: "English", teacher: "Sunita Devi" }, "9:30-10:15": { subject: "Biology", teacher: "Pooja Nair" }, "10:30-11:15": { subject: "Chemistry", teacher: "Amit Tiwari" }, "11:15-12:00": { subject: "Physics", teacher: "Rajiv Menon" }, "12:00-12:45": { subject: "Computer", teacher: "Vikram Singh" }, "1:30-2:15": { subject: "Art", teacher: "Maya Patel" }, "2:15-3:00": { subject: "Music", teacher: "Anita Joshi" } },
    Saturday: { "8:00-8:45": { subject: "Physics", teacher: "Rajiv Menon" }, "8:45-9:30": { subject: "Mathematics", teacher: "Dr. Meena Iyer" }, "9:30-10:15": { subject: "English", teacher: "Sunita Devi" }, "10:30-11:15": { subject: "P.E.", teacher: "Suresh Kumar" } },
};

const subjectColors: Record<string, string> = {
    Mathematics: "#6366f1", Physics: "#06b6d4", Chemistry: "#f59e0b", English: "#10b981",
    Biology: "#ec4899", Hindi: "#8b5cf6", Computer: "#3b82f6", "P.E.": "#14b8a6",
    Art: "#f97316", Music: "#a855f7", "Social Sc.": "#ef4444", Library: "#64748b",
};

const allSubjects = Object.keys(subjectColors);

export default function TimetablePage() {
    const [timetable, setTimetable] = useState(initialTimetable);
    const [isEditing, setIsEditing] = useState(false);
    const [editModal, setEditModal] = useState<{ day: string; time: string; entry?: { subject: string; teacher: string } } | null>(null);
    const [form, setForm] = useState({ subject: "", teacher: "" });
    const [selectedClass, setSelectedClass] = useState("Class 10-A");
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const openEditCell = (day: string, time: string) => {
        const entry = timetable[day]?.[time];
        setForm(entry ? { ...entry } : { subject: "", teacher: "" });
        setEditModal({ day, time, entry });
    };

    const saveCell = () => {
        if (!editModal) return;
        const updated = { ...timetable };
        if (!updated[editModal.day]) updated[editModal.day] = {};
        if (form.subject && form.teacher) {
            updated[editModal.day][editModal.time] = { ...form };
        } else {
            delete updated[editModal.day][editModal.time];
        }
        setTimetable(updated);
        setEditModal(null);
        showToast("Timetable updated!");
    };

    const clearCell = () => {
        if (!editModal) return;
        const updated = { ...timetable };
        if (updated[editModal.day]) delete updated[editModal.day][editModal.time];
        setTimetable(updated);
        setEditModal(null);
        showToast("Period cleared!");
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">Timetable</h1><p className="page-subtitle">Weekly class schedule — {selectedClass}</p></div>
                <div style={{ display: "flex", gap: 12 }}>
                    <select className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option>Class 10-A</option><option>Class 10-B</option><option>Class 9-A</option><option>Class 9-B</option><option>Class 8-A</option>
                    </select>
                    <button className={`btn ${isEditing ? "btn-primary" : "btn-secondary"}`} onClick={() => { setIsEditing(!isEditing); if (isEditing) showToast("Edit mode OFF"); }}>
                        {isEditing ? <><Save size={16} /> Done Editing</> : <><Edit size={16} /> Edit Timetable</>}
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="card" style={{ marginBottom: 20, padding: "14px 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginRight: 4 }}>Subjects:</span>
                    {allSubjects.map((sub) => (
                        <div key={sub} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: subjectColors[sub] }} />
                            <span style={{ color: "var(--text-secondary)" }}>{sub}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timetable Grid */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="timetable-grid" style={{ gridTemplateColumns: `100px repeat(${days.length}, 1fr)` }}>
                    {/* Header row */}
                    <div className="timetable-cell timetable-header"><Calendar size={16} /></div>
                    {days.map((day) => (
                        <div key={day} className="timetable-cell timetable-header">{day}</div>
                    ))}

                    {/* Time Slots */}
                    {timeSlots.map((time) => (
                        <>
                            <div key={`time-${time}`} className="timetable-cell timetable-time">{time}</div>
                            {days.map((day) => {
                                const entry = timetable[day]?.[time];
                                const color = entry ? (subjectColors[entry.subject] || "var(--primary)") : undefined;

                                if (isEditing) {
                                    return (
                                        <div
                                            key={`${day}-${time}`}
                                            className="timetable-cell"
                                            onClick={() => openEditCell(day, time)}
                                            style={{
                                                cursor: "pointer",
                                                borderLeft: entry ? `3px solid ${color}` : "3px solid transparent",
                                                background: entry ? `${color}10` : "transparent",
                                                position: "relative",
                                                transition: "all 0.15s ease",
                                            }}
                                            onMouseOver={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(99, 102, 241, 0.08)"; }}
                                            onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.background = entry ? `${color}10` : "transparent"; }}
                                        >
                                            {entry ? (
                                                <div className="timetable-subject">
                                                    <strong style={{ color }}>{entry.subject}</strong>
                                                    <span>{entry.teacher}</span>
                                                </div>
                                            ) : (
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)", fontSize: 11, opacity: 0.6 }}>
                                                    <Plus size={14} /> Add
                                                </div>
                                            )}
                                            <div style={{ position: "absolute", top: 4, right: 4, width: 18, height: 18, borderRadius: 4, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Edit size={10} style={{ color: "var(--primary)" }} />
                                            </div>
                                        </div>
                                    );
                                }

                                if (!entry) {
                                    return <div key={`${day}-${time}`} className="timetable-cell" style={{ color: "var(--text-muted)", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>—</div>;
                                }

                                return (
                                    <div key={`${day}-${time}`} className="timetable-cell timetable-subject" style={{ borderLeft: `3px solid ${color}`, background: `${color}10` }}>
                                        <div>
                                            <strong style={{ color }}>{entry.subject}</strong>
                                            <span>{entry.teacher}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            <Modal open={!!editModal} onClose={() => setEditModal(null)} title="Edit Period" width={420}>
                {editModal && (
                    <div>
                        <div style={{ marginBottom: 20, padding: 12, background: "rgba(99, 102, 241, 0.06)", borderRadius: "var(--radius-md)", display: "flex", gap: 12 }}>
                            <span className="badge badge-primary">{editModal.day}</span>
                            <span className="badge badge-info">{editModal.time}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <select className="form-select" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                                <option value="">Select Subject</option>
                                {allSubjects.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Teacher</label>
                            <input className="form-input" placeholder="Teacher name" value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} />
                        </div>
                        <div className="modal-footer" style={{ padding: "16px 0 0", borderTop: "1px solid var(--border-color)", marginTop: 8 }}>
                            {editModal.entry && (
                                <button className="btn btn-danger" onClick={clearCell} style={{ marginRight: "auto" }}><Trash2 size={14} /> Clear</button>
                            )}
                            <button className="btn btn-secondary" onClick={() => setEditModal(null)}><X size={14} /> Cancel</button>
                            <button className="btn btn-primary" onClick={saveCell}><Save size={14} /> Save</button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Toast */}
            {toast && (
                <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>
                    ✅ {toast}
                </div>
            )}
        </div>
    );
}
