"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { GraduationCap, Mail, Lock, LogIn, Eye, EyeOff, Hash, Key, UserPlus, Building2, User, Users, BookOpen, ShieldCheck } from "lucide-react";
import * as fs from "@/lib/firestore-service";

type Mode = "login" | "register";
type Role = "admin" | "teacher" | "student" | "parent";

export default function LoginPage() {
    const [mode, setMode] = useState<Mode>("login");
    const [role, setRole] = useState<Role>("admin");
    const [loginType, setLoginType] = useState<"email" | "teacherId">("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [pin, setPin] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Registration fields
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regPhone, setRegPhone] = useState("");
    const [regSchoolCode, setRegSchoolCode] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn, signInWithTeacherId } = useAuth();
    const router = useRouter();

    const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
        { id: "admin", label: "School Admin", icon: <ShieldCheck size={18} /> },
        { id: "teacher", label: "Teacher", icon: <BookOpen size={18} /> },
        { id: "student", label: "Student", icon: <User size={18} /> },
        { id: "parent", label: "Parent", icon: <Users size={18} /> },
    ];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setSuccess("");
        setLoading(true);
        try {
            if (loginType === "teacherId") {
                await signInWithTeacherId(teacherId, pin);
            } else {
                await signIn(email, password);
            }
            router.push("/dashboard");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed. Check credentials.");
        }
        setLoading(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (!regName || !regEmail || !regPassword || !regSchoolCode) {
            setError("Please fill all required fields.");
            return;
        }
        setLoading(true);
        try {
            const school: any = await fs.getSchoolByCode(regSchoolCode.toUpperCase());
            if (!school) { setError("Invalid school code. Ask your school admin for the correct code."); setLoading(false); return; }

            const existing = await fs.getUserByEmail(regEmail);
            if (existing) { setError("Email already registered. Try logging in."); setLoading(false); return; }

            await fs.addUser({
                email: regEmail,
                password: regPassword,
                displayName: regName,
                name: regName,
                role: role,
                schoolId: school.id,
                schoolName: school.name,
                schoolCode: regSchoolCode.toUpperCase(),
                phone: regPhone,
                status: "pending",
            });

            setSuccess(`Registration successful! Your ${role} account is pending approval by the school admin.`);
            setRegName(""); setRegEmail(""); setRegPassword(""); setRegPhone(""); setRegSchoolCode("");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Registration failed.");
        }
        setLoading(false);
    };

    return (
        <div className="lp-wrapper">
            <div className="lp-container animate-scale-in">
                {/* Left - Branding */}
                <div className="lp-brand-side">
                    <div className="lp-brand-content">
                        <div className="lp-brand-logo">
                            <GraduationCap size={32} />
                        </div>
                        <h1 className="lp-brand-title">SchoolERP</h1>
                        <p className="lp-brand-desc">
                            Modern school management system for administrators, teachers, students & parents.
                        </p>
                        <div className="lp-brand-features">
                            <div className="lp-feature-item">
                                <ShieldCheck size={16} />
                                <span>Secure & Reliable</span>
                            </div>
                            <div className="lp-feature-item">
                                <BookOpen size={16} />
                                <span>Easy to Use</span>
                            </div>
                            <div className="lp-feature-item">
                                <Users size={16} />
                                <span>Role-Based Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Form */}
                <div className="lp-form-side">
                    <h2 className="lp-form-title">
                        {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="lp-form-subtitle">
                        {mode === "login" ? "Sign in to continue to your dashboard" : `Register as a new ${roles.find(r => r.id === role)?.label}`}
                    </p>

                    {/* Role Selection */}
                    <div className="lp-role-grid">
                        {roles.map(r => (
                            <button
                                key={r.id}
                                className={`lp-role-btn ${role === r.id ? "active" : ""}`}
                                onClick={() => { setRole(r.id); setMode("login"); setError(""); setSuccess(""); }}
                            >
                                {r.icon}
                                <span>{r.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* LOGIN FORM */}
                    {mode === "login" && (
                        <>
                            {(role === "teacher") && (
                                <div className="lp-login-type-toggle">
                                    <button className={`lp-toggle-btn ${loginType === "email" ? "active" : ""}`} onClick={() => setLoginType("email")}>
                                        <Mail size={14} /> Email
                                    </button>
                                    <button className={`lp-toggle-btn ${loginType === "teacherId" ? "active" : ""}`} onClick={() => setLoginType("teacherId")}>
                                        <Hash size={14} /> Teacher ID
                                    </button>
                                </div>
                            )}
                            <form onSubmit={handleLogin} className="lp-form">
                                {(role !== "teacher" || loginType === "email") ? (
                                    <>
                                        <div className="lp-field">
                                            <label className="lp-label">Email</label>
                                            <div className="lp-input-wrap">
                                                <Mail size={18} className="lp-input-icon" />
                                                <input type="email" className="lp-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="lp-field">
                                            <label className="lp-label">Password</label>
                                            <div className="lp-input-wrap">
                                                <Lock size={18} className="lp-input-icon" />
                                                <input type={showPassword ? "text" : "password"} className="lp-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="lp-eye-btn">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="lp-field">
                                            <label className="lp-label">Teacher ID</label>
                                            <div className="lp-input-wrap">
                                                <Hash size={18} className="lp-input-icon" />
                                                <input className="lp-input" placeholder="e.g. TCH001" value={teacherId} onChange={(e) => setTeacherId(e.target.value.toUpperCase())} required />
                                            </div>
                                        </div>
                                        <div className="lp-field">
                                            <label className="lp-label">PIN</label>
                                            <div className="lp-input-wrap">
                                                <Key size={18} className="lp-input-icon" />
                                                <input type={showPassword ? "text" : "password"} className="lp-input" placeholder="4-digit PIN" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} required />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {error && <div className="lp-error">{error}</div>}

                                <button type="submit" className="lp-submit-btn" disabled={loading}>
                                    {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><LogIn size={18} /> Sign In</>}
                                </button>
                            </form>

                            {/* Register link for non-admin roles */}
                            {role !== "admin" && (
                                <div className="lp-switch-mode">
                                    Don&apos;t have an account?{" "}
                                    <button onClick={() => { setMode("register"); setError(""); setSuccess(""); }} className="lp-switch-btn">
                                        <UserPlus size={14} /> Register
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* REGISTER FORM */}
                    {mode === "register" && (
                        <>
                            <form onSubmit={handleRegister} className="lp-form">
                                <div className="lp-field">
                                    <label className="lp-label">Full Name *</label>
                                    <div className="lp-input-wrap">
                                        <User size={18} className="lp-input-icon" />
                                        <input className="lp-input" placeholder="Enter your full name" value={regName} onChange={(e) => setRegName(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="lp-field">
                                    <label className="lp-label">Email *</label>
                                    <div className="lp-input-wrap">
                                        <Mail size={18} className="lp-input-icon" />
                                        <input type="email" className="lp-input" placeholder="Enter your email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="lp-field">
                                    <label className="lp-label">Password *</label>
                                    <div className="lp-input-wrap">
                                        <Lock size={18} className="lp-input-icon" />
                                        <input type="password" className="lp-input" placeholder="Create a password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="lp-field">
                                    <label className="lp-label">Phone</label>
                                    <div className="lp-input-wrap">
                                        <User size={18} className="lp-input-icon" />
                                        <input className="lp-input" placeholder="Your phone number" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="lp-field">
                                    <label className="lp-label">School Code * <span className="lp-label-hint">(Ask your school admin)</span></label>
                                    <div className="lp-input-wrap">
                                        <Building2 size={18} className="lp-input-icon" />
                                        <input className="lp-input" placeholder="e.g. SCH001" value={regSchoolCode} onChange={(e) => setRegSchoolCode(e.target.value.toUpperCase())} required />
                                    </div>
                                </div>

                                {error && <div className="lp-error">{error}</div>}
                                {success && <div className="lp-success">{success}</div>}

                                <button type="submit" className="lp-submit-btn" disabled={loading}>
                                    {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><UserPlus size={18} /> Register as {roles.find(r => r.id === role)?.label}</>}
                                </button>
                            </form>

                            <div className="lp-switch-mode">
                                Already have an account?{" "}
                                <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className="lp-switch-btn">
                                    <LogIn size={14} /> Sign In
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
