"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
    LayoutDashboard, Users, UserCog, School, CalendarCheck, ClipboardList,
    DollarSign, Calendar, BookOpen, Bell, Settings, GraduationCap,
    ChevronLeft, ChevronRight, LogOut, BookOpenCheck, Megaphone, FileText,
    User, Baby, Inbox,
} from "lucide-react";
import { useState } from "react";

interface NavItemType {
    section?: string;
    title?: string;
    href?: string;
    icon?: React.ElementType;
    badge?: number;
}

// Admin menu - full access
const adminNav: NavItemType[] = [
    { section: "MAIN" },
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { section: "MANAGEMENT" },
    { title: "Students", href: "/students", icon: Users },
    { title: "Teachers", href: "/teachers", icon: UserCog },
    { title: "Approvals", href: "/approvals", icon: UserCog, badge: 0 },
    { title: "Classes", href: "/classes", icon: School },
    { section: "ACADEMIC" },
    { title: "Attendance", href: "/attendance", icon: CalendarCheck },
    { title: "Exams", href: "/exams", icon: ClipboardList },
    { title: "Homework", href: "/homework", icon: BookOpenCheck },
    { section: "ENQUIRY" },
    { title: "Enquiries", href: "/enquiries", icon: Inbox, badge: 2 },
    { section: "FINANCE" },
    { title: "Fees", href: "/fees", icon: DollarSign },
    { section: "OTHERS" },
    { title: "Timetable", href: "/timetable", icon: Calendar },
    { title: "Library", href: "/library", icon: BookOpen },
    { title: "Notices", href: "/notices", icon: Megaphone },
    { title: "Reports", href: "/reports", icon: FileText },
    { title: "Settings", href: "/settings", icon: Settings },
];

// Teacher menu
const teacherNav: NavItemType[] = [
    { section: "MAIN" },
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { section: "TEACHING" },
    { title: "My Classes", href: "/my-classes", icon: School },
    { title: "Attendance", href: "/attendance", icon: CalendarCheck },
    { title: "Marks Entry", href: "/marks", icon: ClipboardList },
    { title: "Homework", href: "/homework", icon: BookOpenCheck },
    { section: "ENQUIRY" },
    { title: "Enquiries", href: "/enquiries", icon: Inbox },
    { title: "Approvals", href: "/approvals", icon: UserCog },
    { section: "SCHEDULE" },
    { title: "Timetable", href: "/timetable", icon: Calendar },
    { title: "Notices", href: "/notices", icon: Megaphone, badge: 2 },
];

// Student menu
const studentNav: NavItemType[] = [
    { section: "MAIN" },
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { section: "ACADEMICS" },
    { title: "My Profile", href: "/my-profile", icon: User },
    { title: "Attendance", href: "/my-attendance", icon: CalendarCheck },
    { title: "Homework", href: "/my-homework", icon: BookOpenCheck },
    { title: "Exam Results", href: "/my-results", icon: ClipboardList },
    { section: "OTHER" },
    { title: "Fee Status", href: "/my-fees", icon: DollarSign },
    { title: "Timetable", href: "/timetable", icon: Calendar },
    { title: "Notices", href: "/notices", icon: Megaphone, badge: 3 },
];

// Parent menu
const parentNav: NavItemType[] = [
    { section: "MAIN" },
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { section: "CHILD INFO" },
    { title: "Child Profile", href: "/child-profile", icon: Baby },
    { title: "Attendance", href: "/child-attendance", icon: CalendarCheck },
    { title: "Results", href: "/child-results", icon: ClipboardList },
    { section: "OTHER" },
    { title: "Fee Status", href: "/child-fees", icon: DollarSign },
    { title: "Notices", href: "/notices", icon: Megaphone, badge: 2 },
];

const navByRole: Record<string, NavItemType[]> = {
    admin: adminNav,
    teacher: teacherNav,
    student: studentNav,
    parent: parentNav,
};

export default function Sidebar() {
    const pathname = usePathname();
    const { userProfile, signOut } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    const role = userProfile?.role || "admin";
    const navItems = navByRole[role] || adminNav;

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <GraduationCap size={22} />
                </div>
                {!collapsed && (
                    <div>
                        <div className="logo-text">SchoolERP</div>
                        <div className="logo-subtitle" style={{ textTransform: "capitalize" }}>{role} Panel</div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((item, index) => {
                    if (item.section) {
                        if (collapsed) return null;
                        return (
                            <div key={`section-${index}`} className="sidebar-section-title">
                                {item.section}
                            </div>
                        );
                    }

                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href!}
                            className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                            title={collapsed ? item.title : undefined}
                        >
                            {Icon && <Icon size={20} className="nav-icon" />}
                            {!collapsed && <span>{item.title}</span>}
                            {!collapsed && item.badge && (
                                <span className="nav-badge">{item.badge}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User & Collapse */}
            <div
                style={{
                    padding: collapsed ? "12px" : "16px 12px",
                    borderTop: "1px solid var(--border-color)",
                }}
            >
                {!collapsed && userProfile && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "12px",
                            borderRadius: "var(--radius-md)",
                            background: "rgba(99, 102, 241, 0.08)",
                            marginBottom: 8,
                        }}
                    >
                        <div className="user-avatar">
                            {userProfile.displayName?.charAt(0) || "U"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {userProfile.displayName}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "var(--text-muted)",
                                    textTransform: "capitalize",
                                }}
                            >
                                {userProfile.role}
                            </div>
                        </div>
                    </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        className="btn btn-ghost btn-icon"
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        style={{ flex: collapsed ? "auto" : undefined }}
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                    {!collapsed && (
                        <button
                            className="btn btn-ghost"
                            onClick={signOut}
                            style={{ flex: 1, justifyContent: "center" }}
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
