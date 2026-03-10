"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, LogIn, Eye, EyeOff, Server, Layers, Zap } from "lucide-react";

export default function SuperAdminLogin() {
    const [email, setEmail] = useState("superadmin@erp.com");
    const [password, setPassword] = useState("super123");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setTimeout(() => {
            if (email === "superadmin@erp.com" && password === "super123") {
                localStorage.setItem("superadmin-session", JSON.stringify({ email, role: "super_admin" }));
                router.push("/superadmin/dashboard");
            } else {
                setError("Invalid credentials. Please check and try again.");
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="lp-wrapper">
            <div className="lp-container animate-scale-in">
                {/* Left - Branding */}
                <div className="lp-brand-side" style={{ background: "linear-gradient(145deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)" }}>
                    <div className="lp-brand-content">
                        <div className="lp-brand-logo">
                            <Shield size={32} />
                        </div>
                        <h1 className="lp-brand-title">SuperAdmin</h1>
                        <p className="lp-brand-desc">
                            Multi-School ERP Control Panel. Manage schools, admins, plans, and system settings.
                        </p>
                        <div className="lp-brand-features">
                            <div className="lp-feature-item">
                                <Server size={16} />
                                <span>Multi-School Management</span>
                            </div>
                            <div className="lp-feature-item">
                                <Layers size={16} />
                                <span>Plan & Subscription Control</span>
                            </div>
                            <div className="lp-feature-item">
                                <Zap size={16} />
                                <span>Real-Time Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Form */}
                <div className="lp-form-side">
                    <h2 className="lp-form-title">Control Panel</h2>
                    <p className="lp-form-subtitle">Sign in to manage all schools and system settings</p>

                    <form onSubmit={handleLogin} className="lp-form">
                        <div className="lp-field">
                            <label className="lp-label">Email</label>
                            <div className="lp-input-wrap">
                                <Mail size={18} className="lp-input-icon" />
                                <input
                                    type="email"
                                    className="lp-input"
                                    placeholder="Enter admin email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="lp-field">
                            <label className="lp-label">Password</label>
                            <div className="lp-input-wrap">
                                <Lock size={18} className="lp-input-icon" />
                                <input
                                    type={showPw ? "text" : "password"}
                                    className="lp-input"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)} className="lp-eye-btn">
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <div className="lp-error">{error}</div>}

                        <button type="submit" className="lp-submit-btn" disabled={loading}>
                            {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><LogIn size={18} /> Sign In as Super Admin</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
