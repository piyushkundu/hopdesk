"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard, Building2, UserCog, CreditCard, BarChart3,
    ScrollText, Settings, LogOut, ChevronLeft, ChevronRight, Shield, Search, Bell,
} from "lucide-react";

const navItems = [
    { section: "MAIN" },
    { title: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
    { section: "MANAGEMENT" },
    { title: "Schools", href: "/superadmin/schools", icon: Building2 },
    { title: "School Admins", href: "/superadmin/admins", icon: UserCog },
    { section: "BUSINESS" },
    { title: "Plans", href: "/superadmin/plans", icon: CreditCard },
    { title: "Analytics", href: "/superadmin/analytics", icon: BarChart3 },
    { section: "SYSTEM" },
    { title: "System Logs", href: "/superadmin/logs", icon: ScrollText },
    { title: "Settings", href: "/superadmin/settings", icon: Settings },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        const s = localStorage.getItem("superadmin-session");
        if (!s && pathname !== "/superadmin/login") {
            router.push("/superadmin/login");
        } else if (s) {
            setAuthed(true);
        }
    }, [pathname, router]);

    if (pathname === "/superadmin/login") return <>{children}</>;
    if (!authed) return null;

    return (
        <div data-theme="light" style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
            {/* Sidebar */}
            <aside style={{
                width: collapsed ? 72 : 260,
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                background: "#ffffff",
                borderRight: "1px solid #e8eaed",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.25s ease",
                zIndex: 50,
                boxShadow: "2px 0 8px rgba(0,0,0,0.03)",
            }}>
                {/* Logo */}
                <div style={{
                    height: 68,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: collapsed ? "0 16px" : "0 20px",
                    borderBottom: "1px solid #f0f1f3",
                    flexShrink: 0,
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                    }}>
                        <Shield size={20} />
                    </div>
                    {!collapsed && (
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", letterSpacing: "-0.3px" }}>SuperAdmin</div>
                            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Control Panel</div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
                    {navItems.map((item, i) => {
                        if (item.section) {
                            if (collapsed) return null;
                            return (
                                <div key={`s-${i}`} style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#94a3b8",
                                    letterSpacing: "1px",
                                    padding: "16px 12px 6px",
                                    textTransform: "uppercase",
                                }}>{item.section}</div>
                            );
                        }
                        const Icon = item.icon!;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href!}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: collapsed ? "10px 14px" : "10px 14px",
                                    borderRadius: 10,
                                    marginBottom: 2,
                                    textDecoration: "none",
                                    fontSize: 14,
                                    fontWeight: isActive ? 600 : 500,
                                    color: isActive ? "#6366f1" : "#64748b",
                                    background: isActive ? "#eef2ff" : "transparent",
                                    transition: "all 0.15s ease",
                                }}
                                title={collapsed ? item.title : undefined}
                            >
                                <Icon size={20} style={{ flexShrink: 0 }} />
                                {!collapsed && <span>{item.title}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div style={{
                    padding: collapsed ? "12px" : "16px",
                    borderTop: "1px solid #f0f1f3",
                    flexShrink: 0,
                }}>
                    {!collapsed && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: 10,
                            background: "#f8f9fb",
                            marginBottom: 10,
                        }}>
                            <div style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: 13,
                                fontWeight: 700,
                            }}>SA</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>Super Admin</div>
                                <div style={{ fontSize: 11, color: "#94a3b8" }}>super_admin</div>
                            </div>
                        </div>
                    )}
                    <div style={{ display: "flex", gap: 6 }}>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                flex: collapsed ? "1" : undefined,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 36,
                                width: collapsed ? "100%" : 36,
                                borderRadius: 8,
                                border: "1px solid #e8eaed",
                                background: "white",
                                cursor: "pointer",
                                color: "#64748b",
                                transition: "all 0.15s",
                            }}
                        >
                            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                        </button>
                        {!collapsed && (
                            <button
                                onClick={() => { localStorage.removeItem("superadmin-session"); router.push("/superadmin/login"); }}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 6,
                                    height: 36,
                                    borderRadius: 8,
                                    border: "1px solid #e8eaed",
                                    background: "white",
                                    cursor: "pointer",
                                    color: "#64748b",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    transition: "all 0.15s",
                                }}
                            >
                                <LogOut size={15} /> Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                marginLeft: collapsed ? 72 : 260,
                transition: "margin-left 0.25s ease",
            }}>
                {/* Topbar */}
                <header style={{
                    height: 68,
                    padding: "0 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e8eaed",
                    background: "white",
                    position: "sticky",
                    top: 0,
                    zIndex: 40,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "#f8f9fb",
                            borderRadius: 10,
                            padding: "8px 16px",
                            border: "1px solid #e8eaed",
                            minWidth: 240,
                        }}>
                            <Search size={16} style={{ color: "#94a3b8" }} />
                            <input
                                placeholder="Search..."
                                style={{
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontSize: 13,
                                    color: "#1e293b",
                                    width: "100%",
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <button style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: "1px solid #e8eaed",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#64748b",
                            position: "relative",
                        }}>
                            <Bell size={18} />
                            <div style={{
                                position: "absolute",
                                top: 6,
                                right: 6,
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "#6366f1",
                                border: "2px solid white",
                            }} />
                        </button>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "6px 14px 6px 6px",
                            borderRadius: 12,
                            background: "#f8f9fb",
                            border: "1px solid #e8eaed",
                        }}>
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: 12,
                                fontWeight: 700,
                            }}>SA</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>Admin</div>
                                <div style={{ fontSize: 10, color: "#94a3b8" }}>Super Admin</div>
                            </div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, padding: 32 }}>{children}</main>
            </div>
        </div>
    );
}
