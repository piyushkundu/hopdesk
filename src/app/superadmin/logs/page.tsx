"use client";

import { ScrollText, Building2, UserCog, CreditCard, Shield, AlertCircle, CheckCircle, Power } from "lucide-react";

const logs = [
    { id: 1, time: "2026-03-08 09:35:21", action: "School Activated", detail: "SCH009 (Heritage School) activated by Super Admin", type: "success", icon: Power },
    { id: 2, time: "2026-03-08 09:20:15", action: "Plan Changed", detail: "SCH003 (Green Valley) upgraded from Basic to Standard", type: "primary", icon: CreditCard },
    { id: 3, time: "2026-03-08 08:45:00", action: "Super Admin Login", detail: "superadmin@erp.com logged in from 192.168.1.100", type: "info", icon: Shield },
    { id: 4, time: "2026-03-07 16:30:45", action: "School Created", detail: "SCH012 (Indus Valley School) created", type: "success", icon: Building2 },
    { id: 5, time: "2026-03-07 14:20:00", action: "Admin Password Reset", detail: "Password reset for admin@sunrise.com (SCH004)", type: "warning", icon: UserCog },
    { id: 6, time: "2026-03-07 11:10:30", action: "School Deactivated", detail: "SCH004 (Sunrise Public) deactivated due to non-payment", type: "danger", icon: AlertCircle },
    { id: 7, time: "2026-03-07 09:00:00", action: "Super Admin Login", detail: "superadmin@erp.com logged in from 10.0.0.1", type: "info", icon: Shield },
    { id: 8, time: "2026-03-06 17:45:12", action: "School Created", detail: "SCH011 (Sapphire International) created", type: "success", icon: Building2 },
    { id: 9, time: "2026-03-06 15:30:00", action: "Plan Changed", detail: "SCH007 (DAV Public) upgraded from Standard to Premium", type: "primary", icon: CreditCard },
    { id: 10, time: "2026-03-06 12:00:00", action: "Admin Created", detail: "New admin Mr. Arjun Das created for SCH012", type: "success", icon: UserCog },
    { id: 11, time: "2026-03-05 16:20:00", action: "School Suspended", detail: "SCH009 (Heritage School) suspended — contract expired", type: "danger", icon: AlertCircle },
    { id: 12, time: "2026-03-05 10:00:00", action: "Super Admin Login", detail: "superadmin@erp.com logged in from 192.168.1.50", type: "info", icon: Shield },
    { id: 13, time: "2026-03-04 14:30:00", action: "Plan Changed", detail: "SCH002 (St. Mary) upgraded from Premium to Enterprise", type: "primary", icon: CreditCard },
    { id: 14, time: "2026-03-04 09:15:00", action: "School Created", detail: "SCH010 (Kendriya Vidyalaya) created", type: "success", icon: Building2 },
    { id: 15, time: "2026-03-03 11:00:00", action: "Admin Password Reset", detail: "Password reset for admin@greenvalley.com (SCH003)", type: "warning", icon: UserCog },
];

const typeBg: Record<string, string> = { success: "rgba(16,185,129,0.12)", danger: "rgba(244,63,94,0.12)", warning: "rgba(245,158,11,0.12)", primary: "rgba(99,102,241,0.12)", info: "rgba(6,182,212,0.12)" };
const typeColor: Record<string, string> = { success: "#10b981", danger: "#f43f5e", warning: "#f59e0b", primary: "#6366f1", info: "#06b6d4" };

export default function LogsPage() {
    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">System Logs</h1><p className="page-subtitle">Activity audit trail for the Super Admin panel</p></div>
                <div className="badge badge-info" style={{ fontSize: 12, padding: "6px 14px" }}>{logs.length} entries</div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                {logs.map((log, i) => (
                    <div key={log.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: i < logs.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: typeBg[log.type], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <log.icon size={18} style={{ color: typeColor[log.type] }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{log.action}</span>
                                <span className={`badge badge-${log.type === "info" ? "info" : log.type}`} style={{ fontSize: 10 }}>{log.type}</span>
                            </div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{log.detail}</p>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{log.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
