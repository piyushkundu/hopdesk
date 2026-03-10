"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/layout/sidebar";
import TopNavbar from "@/components/layout/top-navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userProfile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !userProfile) {
            router.push("/login");
        }
    }, [userProfile, loading, router]);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="spinner" />
            </div>
        );
    }

    if (!userProfile) {
        return null;
    }

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <TopNavbar />
                <div className="page-content">{children}</div>
            </div>
        </>
    );
}
