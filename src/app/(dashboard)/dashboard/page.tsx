"use client";

import { useAuth } from "@/lib/auth-context";
import AdminDashboard from "@/components/dashboards/admin-dashboard";
import TeacherDashboard from "@/components/dashboards/teacher-dashboard";
import StudentDashboard from "@/components/dashboards/student-dashboard";
import ParentDashboard from "@/components/dashboards/parent-dashboard";

export default function DashboardPage() {
    const { userProfile } = useAuth();
    const role = userProfile?.role || "admin";

    switch (role) {
        case "admin":
            return <AdminDashboard />;
        case "teacher":
            return <TeacherDashboard />;
        case "student":
            return <StudentDashboard />;
        case "parent":
            return <ParentDashboard />;
        default:
            return <AdminDashboard />;
    }
}
