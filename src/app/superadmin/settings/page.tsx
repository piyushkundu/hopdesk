"use client";

import { useState } from "react";
import { Save, Shield, Globe, Lock, Bell } from "lucide-react";

export default function SuperAdminSettings() {
    const [toast, setToast] = useState<string | null>(null);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const [settings, setSettings] = useState({
        siteName: "SchoolERP SaaS",
        siteUrl: "https://erp.yoursite.com",
        adminEmail: "superadmin@erp.com",
        maxSchools: "100",
        twoFactorEnabled: true,
        ipRestriction: true,
        allowedIPs: "192.168.1.0/24, 10.0.0.0/8",
        rateLimitPerMin: "60",
        emailNotif: true,
        smsNotif: false,
        maintenanceMode: false,
    });

    const updateSetting = (key: string, val: any) => setSettings({ ...settings, [key]: val });

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Super Admin system configuration</p></div>
            </div>

            {/* General */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <Globe size={20} style={{ color: "var(--primary)" }} />
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>General Settings</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group"><label className="form-label">Site Name</label><input className="form-input" value={settings.siteName} onChange={(e) => updateSetting("siteName", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Site URL</label><input className="form-input" value={settings.siteUrl} onChange={(e) => updateSetting("siteUrl", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Admin Email</label><input className="form-input" value={settings.adminEmail} onChange={(e) => updateSetting("adminEmail", e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Max Schools</label><input className="form-input" type="number" value={settings.maxSchools} onChange={(e) => updateSetting("maxSchools", e.target.value)} /></div>
                </div>
            </div>

            {/* Security */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <Lock size={20} style={{ color: "#6366f1" }} />
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>Security</h3>
                </div>
                {[
                    { key: "twoFactorEnabled", label: "Two-Factor Authentication (2FA)", desc: "Require 2FA for super admin login" },
                    { key: "ipRestriction", label: "IP Restriction", desc: "Restrict access to allowed IP ranges" },
                    { key: "maintenanceMode", label: "Maintenance Mode", desc: "Put entire system in maintenance mode" },
                ].map((item) => (
                    <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border-light)" }}>
                        <div><p style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{item.label}</p><p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{item.desc}</p></div>
                        <button onClick={() => updateSetting(item.key, !(settings as any)[item.key])} style={{ width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s ease", background: (settings as any)[item.key] ? "#6366f1" : "var(--border-color)" }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, transition: "all 0.2s ease", left: (settings as any)[item.key] ? 25 : 3 }} />
                        </button>
                    </div>
                ))}
                <div className="form-group" style={{ marginTop: 16 }}>
                    <label className="form-label">Allowed IP Ranges</label>
                    <input className="form-input" value={settings.allowedIPs} onChange={(e) => updateSetting("allowedIPs", e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Rate Limit (requests/min)</label>
                    <input className="form-input" type="number" value={settings.rateLimitPerMin} onChange={(e) => updateSetting("rateLimitPerMin", e.target.value)} />
                </div>
            </div>

            {/* Notifications */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <Bell size={20} style={{ color: "#6366f1" }} />
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b" }}>Notifications</h3>
                </div>
                {[
                    { key: "emailNotif", label: "Email Notifications", desc: "Receive alerts via email" },
                    { key: "smsNotif", label: "SMS Notifications", desc: "Receive alerts via SMS" },
                ].map((item) => (
                    <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border-light)" }}>
                        <div><p style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{item.label}</p><p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{item.desc}</p></div>
                        <button onClick={() => updateSetting(item.key, !(settings as any)[item.key])} style={{ width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s ease", background: (settings as any)[item.key] ? "#6366f1" : "var(--border-color)" }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 3, transition: "all 0.2s ease", left: (settings as any)[item.key] ? 25 : 3 }} />
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button className="btn btn-secondary">Reset</button>
                <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} onClick={() => showToast("Settings saved!")}><Save size={16} /> Save Settings</button>
            </div>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "var(--success)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "var(--shadow-lg)" }}>✅ {toast}</div>}
        </div>
    );
}
