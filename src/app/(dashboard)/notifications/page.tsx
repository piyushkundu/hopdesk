"use client";

import { Bell, Check, Trash2, Mail, MessageSquare, AlertCircle } from "lucide-react";

const notifications = [
    { id: 1, type: "fee", title: "Fee Payment Received", message: "Aarav Sharma has paid January 2025 fee of ₹5,000", time: "2 minutes ago", read: false },
    { id: 2, type: "attendance", title: "Low Attendance Alert", message: "Ishita Reddy attendance dropped below 75% this month", time: "15 minutes ago", read: false },
    { id: 3, type: "exam", title: "Exam Schedule Published", message: "Mid-Term Examination schedule for Class 10 has been published", time: "1 hour ago", read: false },
    { id: 4, type: "admission", title: "New Admission", message: "New student Vivaan Joshi admitted to Class 8-B", time: "3 hours ago", read: true },
    { id: 5, type: "fee", title: "Fee Reminder Sent", message: "Fee reminder sent to 12 students with pending dues", time: "5 hours ago", read: true },
    { id: 6, type: "system", title: "System Update", message: "School ERP system updated to version 2.1.0", time: "1 day ago", read: true },
    { id: 7, type: "holiday", title: "Holiday Notice", message: "School will remain closed on March 15, 2025 for Holi", time: "2 days ago", read: true },
];

const typeIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    fee: { icon: Mail, color: "var(--success)", bg: "rgba(16, 185, 129, 0.15)" },
    attendance: { icon: AlertCircle, color: "var(--danger)", bg: "rgba(239, 68, 68, 0.15)" },
    exam: { icon: Bell, color: "var(--primary)", bg: "rgba(99, 102, 241, 0.15)" },
    admission: { icon: MessageSquare, color: "var(--secondary)", bg: "rgba(6, 182, 212, 0.15)" },
    system: { icon: Bell, color: "var(--text-muted)", bg: "rgba(100, 116, 139, 0.15)" },
    holiday: { icon: Bell, color: "var(--accent)", bg: "rgba(245, 158, 11, 0.15)" },
};

export default function NotificationsPage() {
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Notifications</h1>
                    <p className="page-subtitle">{unreadCount} unread notifications</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn btn-secondary"><Check size={16} /> Mark All Read</button>
                    <button className="btn btn-ghost" style={{ color: "var(--danger)" }}><Trash2 size={16} /> Clear All</button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {notifications.map((notification) => {
                    const typeInfo = typeIcons[notification.type] || typeIcons.system;
                    const Icon = typeInfo.icon;
                    return (
                        <div
                            key={notification.id}
                            className="card"
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                                padding: "16px 20px",
                                borderLeft: !notification.read ? `3px solid var(--primary)` : undefined,
                                background: !notification.read ? "rgba(99, 102, 241, 0.03)" : undefined,
                            }}
                        >
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: typeInfo.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon size={18} style={{ color: typeInfo.color }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{notification.title}</h4>
                                    {!notification.read && (
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
                                    )}
                                </div>
                                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{notification.message}</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>{notification.time}</p>
                            </div>
                            <button className="btn btn-ghost btn-icon btn-sm" title="Delete">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
