"use client";

import { useState } from "react";
import { Save, School, Shield, Users, Bell, Database, Globe, Plus, Trash2, Download, Upload, RefreshCw, Check, UserCheck } from "lucide-react";
import { demoTeachers } from "@/lib/demo-data";

const tabs = [
    { id: "school", icon: School, label: "School Info" },
    { id: "roles", icon: Shield, label: "Roles & Permissions" },
    { id: "users", icon: Users, label: "User Management" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "backup", icon: Database, label: "Data & Backup" },
    { id: "general", icon: Globe, label: "General" },
    { id: "permissions", icon: UserCheck, label: "User Permissions" },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("school");
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    // Roles & Permissions state
    const [roles] = useState([
        { name: "Admin", perms: ["Dashboard", "Students", "Teachers", "Classes", "Attendance", "Exams", "Fees", "Homework", "Notices", "Reports", "Settings"], color: "var(--danger)" },
        { name: "Teacher", perms: ["Dashboard", "My Classes", "Attendance", "Homework", "Marks", "Notices"], color: "var(--primary)" },
        { name: "Student", perms: ["Dashboard", "My Profile", "My Attendance", "My Homework", "My Results", "My Fees", "Notices"], color: "var(--success)" },
        { name: "Parent", perms: ["Dashboard", "Child Profile", "Child Attendance", "Child Results", "Child Fees", "Notices"], color: "var(--accent)" },
    ]);

    // User Management state
    const [users, setUsers] = useState([
        { id: 1, name: "Admin User", email: "admin@school.com", role: "Admin", status: "active", lastLogin: "2026-03-07" },
        { id: 2, name: "Dr. Meena Iyer", email: "meena@school.com", role: "Teacher", status: "active", lastLogin: "2026-03-06" },
        { id: 3, name: "Aarav Sharma", email: "aarav@student.com", role: "Student", status: "active", lastLogin: "2026-03-05" },
        { id: 4, name: "Rajesh Sharma", email: "parent@school.com", role: "Parent", status: "active", lastLogin: "2026-03-04" },
        { id: 5, name: "Rajiv Menon", email: "rajiv@school.com", role: "Teacher", status: "active", lastLogin: "2026-03-07" },
        { id: 6, name: "Sunita Devi", email: "sunita@school.com", role: "Teacher", status: "inactive", lastLogin: "2026-02-20" },
    ]);

    // Notification settings state
    const [notifSettings, setNotifSettings] = useState({
        emailFeeReminder: true, emailAttendance: true, emailExamResults: false, emailNewNotice: true,
        smsAbsent: true, smsFeeOverdue: true, smsExamSchedule: false,
        pushNewHomework: true, pushNotice: true, pushFeeReminder: false,
    });

    // General settings state
    const [generalSettings, setGeneralSettings] = useState({
        language: "English", timezone: "Asia/Kolkata", dateFormat: "DD-MM-YYYY",
        currency: "INR (₹)", sessionTimeout: "30", theme: "Dark",
        attendanceTime: "08:30", lateCutoff: "09:00", workingDays: "Mon-Sat",
    });

    // Teacher permissions state
    const allPermissions = [
        { key: "attendance", label: "Attendance", desc: "Take and manage attendance" },
        { key: "marks", label: "Marks Entry", desc: "Enter and manage exam marks" },
        { key: "homework", label: "Homework", desc: "Assign and manage homework" },
        { key: "student_management", label: "Student Management", desc: "Add, edit, delete students" },
        { key: "enquiry_management", label: "Enquiry Management", desc: "Manage admission enquiries" },
        { key: "fee_management", label: "Fee Management", desc: "View and manage fee records" },
        { key: "reports", label: "Reports", desc: "Access and generate reports" },
        { key: "timetable", label: "Timetable Edit", desc: "Edit class timetables" },
        { key: "notices", label: "Notice Management", desc: "Create and manage notices" },
    ];
    const defaultTeacherPerms = ["attendance", "marks", "homework"];
    const [teacherPerms, setTeacherPerms] = useState<Record<string, string[]>>(
        Object.fromEntries(demoTeachers.map(t => [t.id, [...defaultTeacherPerms]]))
    );
    const [selectedTeacher, setSelectedTeacher] = useState(demoTeachers[0]?.id || "");

    const toggleTeacherPerm = (teacherId: string, perm: string) => {
        setTeacherPerms(prev => {
            const current = prev[teacherId] || [];
            return { ...prev, [teacherId]: current.includes(perm) ? current.filter(p => p !== perm) : [...current, perm] };
        });
    };

    const toggleNotif = (key: string) => setNotifSettings({ ...notifSettings, [key]: !(notifSettings as any)[key] });
    const updateGeneral = (key: string, val: string) => setGeneralSettings({ ...generalSettings, [key]: val });

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Manage school settings and configuration</p></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 32 }}>
                {/* Sidebar Tabs */}
                <div>
                    {tabs.map((tab) => (
                        <div key={tab.id} className={`sidebar-nav-item ${activeTab === tab.id ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => setActiveTab(tab.id)}>
                            <tab.icon size={18} /><span>{tab.label}</span>
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div>
                    {/* === SCHOOL INFO === */}
                    {activeTab === "school" && (
                        <>
                            <div className="card" style={{ marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>School Information</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                                    <div className="form-group"><label className="form-label">School Name</label><input className="form-input" defaultValue="Delhi Public School" /></div>
                                    <div className="form-group"><label className="form-label">Affiliation Number</label><input className="form-input" defaultValue="CBSE-2024-12345" /></div>
                                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue="info@dpsschool.edu.in" /></div>
                                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" defaultValue="+91 11 2345 6789" /></div>
                                    <div className="form-group"><label className="form-label">Principal Name</label><input className="form-input" defaultValue="Dr. Anand Sharma" /></div>
                                    <div className="form-group"><label className="form-label">Website</label><input className="form-input" defaultValue="www.dpsschool.edu.in" /></div>
                                </div>
                                <div className="form-group"><label className="form-label">Address</label><textarea className="form-input" defaultValue="Mathura Road, New Delhi - 110003, India" /></div>
                            </div>
                            <div className="card" style={{ marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>Academic Year</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                                    <div className="form-group"><label className="form-label">Current Session</label><input className="form-input" defaultValue="2024-2025" /></div>
                                    <div className="form-group"><label className="form-label">Start Date</label><input type="date" className="form-input" defaultValue="2024-04-01" /></div>
                                    <div className="form-group"><label className="form-label">End Date</label><input type="date" className="form-input" defaultValue="2025-03-31" /></div>
                                </div>
                            </div>
                            <div className="card" style={{ marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>Fee Configuration</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                                    <div className="form-group"><label className="form-label">Tuition Fee (Monthly)</label><input type="number" className="form-input" defaultValue="5000" /></div>
                                    <div className="form-group"><label className="form-label">Transport Fee</label><input type="number" className="form-input" defaultValue="2000" /></div>
                                    <div className="form-group"><label className="form-label">Lab Fee</label><input type="number" className="form-input" defaultValue="500" /></div>
                                    <div className="form-group"><label className="form-label">Library Fee</label><input type="number" className="form-input" defaultValue="300" /></div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                                <button className="btn btn-secondary">Reset</button>
                                <button className="btn btn-primary" onClick={() => showToast("School settings saved!")}><Save size={16} /> Save Changes</button>
                            </div>
                        </>
                    )}

                    {/* === ROLES & PERMISSIONS === */}
                    {activeTab === "roles" && (
                        <div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                                {roles.map((role) => (
                                    <div key={role.name} className="card">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${role.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Shield size={18} style={{ color: role.color }} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>{role.name}</h3>
                                                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{role.perms.length} permissions</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                            {role.perms.map((p) => (
                                                <span key={p} className="badge badge-primary" style={{ fontSize: 11, background: `${role.color}15`, color: role.color }}>{p}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                                <button className="btn btn-primary" onClick={() => showToast("Roles saved!")}><Save size={16} /> Save Permissions</button>
                            </div>
                        </div>
                    )}

                    {/* === USER MANAGEMENT === */}
                    {activeTab === "users" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 600 }}>All Users ({users.length})</h3>
                                <button className="btn btn-primary" onClick={() => {
                                    const newUser = { id: users.length + 1, name: "New User", email: `user${users.length + 1}@school.com`, role: "Teacher", status: "active", lastLogin: "N/A" };
                                    setUsers([...users, newUser]);
                                    showToast("New user added!");
                                }}><Plus size={16} /> Add User</button>
                            </div>
                            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                                <table className="data-table">
                                    <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600 }}>{u.name.charAt(0)}</div>
                                                        <span style={{ fontWeight: 500 }}>{u.name}</span>
                                                    </div>
                                                </td>
                                                <td style={{ fontSize: 13 }}>{u.email}</td>
                                                <td><span className={`badge ${u.role === "Admin" ? "badge-danger" : u.role === "Teacher" ? "badge-primary" : u.role === "Student" ? "badge-success" : "badge-warning"}`}>{u.role}</span></td>
                                                <td><span className={`badge ${u.status === "active" ? "badge-success" : "badge-danger"}`}>{u.status}</span></td>
                                                <td style={{ fontSize: 13, color: "var(--text-muted)" }}>{u.lastLogin}</td>
                                                <td>
                                                    <div style={{ display: "flex", gap: 4 }}>
                                                        <button className="btn btn-ghost btn-icon btn-sm" title="Toggle Status" onClick={() => {
                                                            setUsers(users.map(usr => usr.id === u.id ? { ...usr, status: usr.status === "active" ? "inactive" : "active" } : usr));
                                                            showToast(`${u.name} ${u.status === "active" ? "deactivated" : "activated"}!`);
                                                        }}>{u.status === "active" ? <Check size={15} /> : <RefreshCw size={15} />}</button>
                                                        <button className="btn btn-ghost btn-icon btn-sm" title="Delete" style={{ color: "var(--danger)" }} onClick={() => {
                                                            setUsers(users.filter(usr => usr.id !== u.id));
                                                            showToast(`${u.name} removed!`);
                                                        }}><Trash2 size={15} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* === NOTIFICATIONS === */}
                    {activeTab === "notifications" && (
                        <div>
                            {[
                                {
                                    title: "Email Notifications", items: [
                                        { key: "emailFeeReminder", label: "Fee Payment Reminders", desc: "Send email when fee is due or overdue" },
                                        { key: "emailAttendance", label: "Attendance Alerts", desc: "Notify parents when student is absent" },
                                        { key: "emailExamResults", label: "Exam Results", desc: "Send results via email when published" },
                                        { key: "emailNewNotice", label: "New Notices", desc: "Email notification for new school notices" },
                                    ]
                                },
                                {
                                    title: "SMS Notifications", items: [
                                        { key: "smsAbsent", label: "Absence Alert", desc: "SMS to parents when student is absent" },
                                        { key: "smsFeeOverdue", label: "Fee Overdue", desc: "SMS reminder for overdue fee payments" },
                                        { key: "smsExamSchedule", label: "Exam Schedule", desc: "SMS notification for upcoming exams" },
                                    ]
                                },
                                {
                                    title: "Push Notifications", items: [
                                        { key: "pushNewHomework", label: "New Homework", desc: "Push notification for new homework assignments" },
                                        { key: "pushNotice", label: "School Notices", desc: "Push notification for important notices" },
                                        { key: "pushFeeReminder", label: "Fee Reminder", desc: "Push notification for fee reminders" },
                                    ]
                                },
                            ].map((section) => (
                                <div key={section.title} className="card" style={{ marginBottom: 20 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{section.title}</h3>
                                    {section.items.map((item, i) => (
                                        <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < section.items.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{item.label}</p>
                                                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleNotif(item.key)}
                                                style={{
                                                    width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s ease",
                                                    background: (notifSettings as any)[item.key] ? "var(--primary)" : "var(--border-color)",
                                                }}
                                            >
                                                <div style={{
                                                    width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, transition: "all 0.2s ease",
                                                    left: (notifSettings as any)[item.key] ? 25 : 3,
                                                }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button className="btn btn-primary" onClick={() => showToast("Notification settings saved!")}><Save size={16} /> Save Settings</button>
                            </div>
                        </div>
                    )}

                    {/* === DATA & BACKUP === */}
                    {activeTab === "backup" && (
                        <div>
                            <div className="card" style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Database Backup</h3>
                                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>Create a backup of all school data including students, teachers, fees, and attendance records.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
                                    {[
                                        { label: "Last Backup", value: "2026-03-06 11:30 PM", color: "var(--success)" },
                                        { label: "Backup Size", value: "24.5 MB", color: "var(--primary)" },
                                        { label: "Total Backups", value: "12", color: "var(--accent)" },
                                    ].map((s) => (
                                        <div key={s.label} style={{ padding: 16, background: `${s.color}10`, borderRadius: "var(--radius-md)", border: `1px solid ${s.color}20` }}>
                                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{s.label}</p>
                                            <p style={{ fontSize: 16, fontWeight: 600, color: s.color }}>{s.value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <button className="btn btn-primary" onClick={() => showToast("Backup created successfully!")}><Download size={16} /> Create Backup Now</button>
                                    <button className="btn btn-secondary" onClick={() => showToast("Scheduled daily backup at 11:30 PM")}><RefreshCw size={16} /> Schedule Auto Backup</button>
                                </div>
                            </div>
                            <div className="card" style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Restore Data</h3>
                                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Restore school data from a previous backup file.</p>
                                <button className="btn btn-secondary" onClick={() => showToast("Feature available in production mode")}><Upload size={16} /> Upload Backup File</button>
                            </div>
                            <div className="card">
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Backups</h3>
                                <table className="data-table">
                                    <thead><tr><th>Date</th><th>Size</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {[
                                            { date: "2026-03-06 11:30 PM", size: "24.5 MB", type: "Auto", status: "Completed" },
                                            { date: "2026-03-05 11:30 PM", size: "24.3 MB", type: "Auto", status: "Completed" },
                                            { date: "2026-03-04 02:15 PM", size: "24.1 MB", type: "Manual", status: "Completed" },
                                            { date: "2026-03-03 11:30 PM", size: "23.9 MB", type: "Auto", status: "Completed" },
                                        ].map((b, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 500 }}>{b.date}</td>
                                                <td>{b.size}</td>
                                                <td><span className={`badge ${b.type === "Auto" ? "badge-primary" : "badge-info"}`}>{b.type}</span></td>
                                                <td><span className="badge badge-success">{b.status}</span></td>
                                                <td><button className="btn btn-ghost btn-sm" onClick={() => showToast("Downloading backup...")}><Download size={14} /> Download</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* === GENERAL === */}
                    {activeTab === "general" && (
                        <div>
                            <div className="card" style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Localization</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                                    <div className="form-group"><label className="form-label">Language</label>
                                        <select className="form-select" value={generalSettings.language} onChange={(e) => updateGeneral("language", e.target.value)}>
                                            <option>English</option><option>Hindi</option><option>Tamil</option><option>Telugu</option><option>Marathi</option>
                                        </select>
                                    </div>
                                    <div className="form-group"><label className="form-label">Timezone</label>
                                        <select className="form-select" value={generalSettings.timezone} onChange={(e) => updateGeneral("timezone", e.target.value)}>
                                            <option>Asia/Kolkata</option><option>Asia/Mumbai</option><option>UTC</option>
                                        </select>
                                    </div>
                                    <div className="form-group"><label className="form-label">Date Format</label>
                                        <select className="form-select" value={generalSettings.dateFormat} onChange={(e) => updateGeneral("dateFormat", e.target.value)}>
                                            <option>DD-MM-YYYY</option><option>MM-DD-YYYY</option><option>YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>System</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                                    <div className="form-group"><label className="form-label">Currency</label>
                                        <select className="form-select" value={generalSettings.currency} onChange={(e) => updateGeneral("currency", e.target.value)}>
                                            <option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option>
                                        </select>
                                    </div>
                                    <div className="form-group"><label className="form-label">Session Timeout (min)</label>
                                        <input className="form-input" type="number" value={generalSettings.sessionTimeout} onChange={(e) => updateGeneral("sessionTimeout", e.target.value)} />
                                    </div>
                                    <div className="form-group"><label className="form-label">Default Theme</label>
                                        <select className="form-select" value={generalSettings.theme} onChange={(e) => updateGeneral("theme", e.target.value)}>
                                            <option>Dark</option><option>Light</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Attendance Settings</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                                    <div className="form-group"><label className="form-label">Attendance Start Time</label>
                                        <input className="form-input" type="time" value={generalSettings.attendanceTime} onChange={(e) => updateGeneral("attendanceTime", e.target.value)} />
                                    </div>
                                    <div className="form-group"><label className="form-label">Late Mark After</label>
                                        <input className="form-input" type="time" value={generalSettings.lateCutoff} onChange={(e) => updateGeneral("lateCutoff", e.target.value)} />
                                    </div>
                                    <div className="form-group"><label className="form-label">Working Days</label>
                                        <select className="form-select" value={generalSettings.workingDays} onChange={(e) => updateGeneral("workingDays", e.target.value)}>
                                            <option>Mon-Sat</option><option>Mon-Fri</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                                <button className="btn btn-secondary">Reset Defaults</button>
                                <button className="btn btn-primary" onClick={() => showToast("General settings saved!")}><Save size={16} /> Save Changes</button>
                            </div>
                        </div>
                    )}

                    {/* === USER PERMISSIONS === */}
                    {activeTab === "permissions" && (
                        <div>
                            <div className="card" style={{ marginBottom: 20 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Assign Teacher Permissions</h3>
                                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>Select a teacher and toggle their permissions. Default permissions: Attendance, Marks, Homework.</p>
                                <div className="form-group">
                                    <label className="form-label">Select Teacher</label>
                                    <select className="form-select" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                                        {demoTeachers.map(t => <option key={t.id} value={t.id}>{t.name} — {t.subject}</option>)}
                                    </select>
                                </div>
                            </div>

                            {selectedTeacher && (
                                <div className="card" style={{ marginBottom: 20 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 700 }}>
                                            {demoTeachers.find(t => t.id === selectedTeacher)?.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: 16, fontWeight: 600 }}>{demoTeachers.find(t => t.id === selectedTeacher)?.name}</h3>
                                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{demoTeachers.find(t => t.id === selectedTeacher)?.subject} • {(teacherPerms[selectedTeacher] || []).length} permissions</p>
                                        </div>
                                    </div>
                                    {allPermissions.map((perm, i) => {
                                        const currentPerms = teacherPerms[selectedTeacher] || [];
                                        const has = currentPerms.includes(perm.key);
                                        const isDefault = defaultTeacherPerms.includes(perm.key);
                                        return (
                                            <div key={perm.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < allPermissions.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{perm.label}</p>
                                                        {isDefault && <span className="badge badge-success" style={{ fontSize: 10 }}>Default</span>}
                                                    </div>
                                                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{perm.desc}</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleTeacherPerm(selectedTeacher, perm.key)}
                                                    style={{
                                                        width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s ease",
                                                        background: has ? "var(--primary)" : "var(--border-color)",
                                                    }}
                                                >
                                                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, transition: "all 0.2s ease", left: has ? 25 : 3 }} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                                <button className="btn btn-secondary" onClick={() => {
                                    setTeacherPerms(Object.fromEntries(demoTeachers.map(t => [t.id, [...defaultTeacherPerms]])));
                                    showToast("All permissions reset to defaults!");
                                }}>Reset All</button>
                                <button className="btn btn-primary" onClick={() => showToast(`Permissions saved for ${demoTeachers.find(t => t.id === selectedTeacher)?.name}!`)}><Save size={16} /> Save Permissions</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)", animation: "slideDown 0.3s ease" }}>
                    ✅ {toast}
                </div>
            )}
        </div>
    );
}
