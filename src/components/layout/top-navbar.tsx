"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, Moon, Sun, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { demoNotices } from "@/lib/role-data";

export default function TopNavbar() {
    const { userProfile } = useAuth();
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [showNotifications, setShowNotifications] = useState(false);
    const [readIds, setReadIds] = useState<string[]>([]);
    const notifRef = useRef<HTMLDivElement>(null);

    // Load theme from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("theme") as "dark" | "light" | null;
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };

    // Filter notices by role
    const role = userProfile?.role || "admin";
    const visibleNotices = role === "admin"
        ? demoNotices
        : demoNotices.filter((n) => n.visibleTo.includes(role as "student" | "teacher" | "parent"));
    const unreadCount = visibleNotices.filter((n) => !readIds.includes(n.id)).length;

    const markAllRead = () => setReadIds(visibleNotices.map((n) => n.id));

    const typeIcons: Record<string, { color: string; emoji: string }> = {
        holiday: { color: "var(--accent)", emoji: "🎉" },
        exam: { color: "var(--primary)", emoji: "📝" },
        event: { color: "var(--secondary)", emoji: "🎯" },
        important: { color: "var(--danger)", emoji: "🔴" },
        general: { color: "var(--text-muted)", emoji: "📢" },
    };

    return (
        <header className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div className="topbar-search">
                    <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input placeholder="Search students, teachers, classes..." />
                </div>
            </div>

            <div className="topbar-actions">
                {/* Theme Toggle */}
                <button className="topbar-btn" title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"} onClick={toggleTheme}>
                    {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Notifications */}
                <div style={{ position: "relative" }} ref={notifRef}>
                    <button className="topbar-btn" title="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
                        <Bell size={20} />
                        {unreadCount > 0 && <span className="notification-dot" />}
                    </button>

                    {showNotifications && (
                        <>
                            <div className="notification-overlay" onClick={() => setShowNotifications(false)} />
                            <div className="notification-dropdown">
                                <div className="notification-dropdown-header">
                                    <div>
                                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Notifications</h3>
                                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{unreadCount} unread</p>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {unreadCount > 0 && (
                                            <button className="btn btn-ghost btn-sm" onClick={markAllRead} style={{ fontSize: 12 }}>Mark all read</button>
                                        )}
                                        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setShowNotifications(false)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>

                                {visibleNotices.length === 0 ? (
                                    <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
                                        No notifications
                                    </div>
                                ) : (
                                    visibleNotices.map((notice) => {
                                        const isRead = readIds.includes(notice.id);
                                        const icon = typeIcons[notice.type] || typeIcons.general;
                                        return (
                                            <div
                                                key={notice.id}
                                                className="notification-item"
                                                onClick={() => !isRead && setReadIds([...readIds, notice.id])}
                                                style={{ opacity: isRead ? 0.6 : 1 }}
                                            >
                                                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon.emoji}</span>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                                                        <p style={{ fontSize: 13, fontWeight: isRead ? 400 : 600, color: "var(--text-primary)" }}>{notice.title}</p>
                                                        {!isRead && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />}
                                                    </div>
                                                    <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{notice.message}</p>
                                                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{notice.postedDate}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* User Info */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 8, cursor: "pointer" }}>
                    <div className="user-avatar">
                        {userProfile?.displayName?.charAt(0) || "U"}
                    </div>
                    <div style={{ lineHeight: 1.3 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                            {userProfile?.displayName || "User"}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "capitalize" }}>
                            {userProfile?.role || "admin"}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
