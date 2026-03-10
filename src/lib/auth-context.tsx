"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserByEmail, getUserByTeacherId } from "@/lib/firestore-service";

export interface UserProfile {
    uid: string;
    id?: string;
    email: string;
    displayName: string;
    role: "admin" | "teacher" | "student" | "parent" | "super_admin";
    schoolId?: string;
    schoolName?: string;
    teacherId?: string;
    status?: string;
    createdAt: string;
}

interface AuthContextType {
    user: null;
    userProfile: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithTeacherId: (teacherId: string, pin: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signIn: async () => { },
    signInWithTeacherId: async () => { },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = localStorage.getItem("erp-session");
        if (session) {
            try {
                setUserProfile(JSON.parse(session));
            } catch {
                localStorage.removeItem("erp-session");
            }
        }
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        const user: any = await getUserByEmail(email);
        if (!user) throw new Error("User not found. Check your email.");
        if (user.password !== password) throw new Error("Incorrect password.");
        if (user.status === "pending") throw new Error("Your account is pending approval. Please wait for admin to approve.");
        if (user.status === "rejected") throw new Error("Your account was rejected. Contact your school admin.");

        const profile: UserProfile = {
            uid: user.id, id: user.id,
            email: user.email,
            displayName: user.displayName || user.name || email,
            role: user.role,
            schoolId: user.schoolId || "",
            schoolName: user.schoolName || "",
            teacherId: user.teacherId || "",
            status: user.status || "approved",
            createdAt: user.createdAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
        };
        setUserProfile(profile);
        localStorage.setItem("erp-session", JSON.stringify(profile));
    };

    const signInWithTeacherId = async (teacherId: string, pin: string) => {
        const user: any = await getUserByTeacherId(teacherId);
        if (!user) throw new Error("Teacher ID not found.");
        if (user.pin !== pin) throw new Error("Incorrect PIN.");
        if (user.status === "pending") throw new Error("Your account is pending approval.");
        if (user.status === "rejected") throw new Error("Your account was rejected.");

        const profile: UserProfile = {
            uid: user.id, id: user.id,
            email: user.email || "",
            displayName: user.displayName || user.name || teacherId,
            role: "teacher",
            schoolId: user.schoolId || "",
            schoolName: user.schoolName || "",
            teacherId: user.teacherId,
            status: user.status || "approved",
            createdAt: user.createdAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
        };
        setUserProfile(profile);
        localStorage.setItem("erp-session", JSON.stringify(profile));
    };

    const signOut = async () => {
        localStorage.removeItem("erp-session");
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ user: null, userProfile, loading, signIn, signInWithTeacherId, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
