"use client";

import { useState } from "react";
import { CreditCard, Check, Edit, Save, X, Crown, Zap, Building2, Star } from "lucide-react";
import Modal from "@/components/ui/modal";

const initialPlans = [
    { id: "basic", name: "Basic", price: 999, color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)", students: 500, teachers: 30, storage: "5 GB", features: ["Student Management", "Attendance", "Basic Reports"], schools: 3, icon: CreditCard },
    { id: "standard", name: "Standard", price: 2499, color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", students: 2000, teachers: 100, storage: "25 GB", features: ["Student Management", "Attendance", "Exams", "Fees", "Homework", "Reports", "Timetable"], schools: 4, icon: Zap },
    { id: "premium", name: "Premium", price: 4999, color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", students: 5000, teachers: 300, storage: "100 GB", features: ["All Standard Features", "Enquiry Management", "Library", "Analytics", "Custom Reports", "Priority Support", "API Access"], schools: 4, popular: true, icon: Crown },
    { id: "enterprise", name: "Enterprise", price: 9999, color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899, #f472b6)", students: -1, teachers: -1, storage: "Unlimited", features: ["All Premium Features", "Multi-Branch", "Custom Modules", "Dedicated Server", "SLA", "24/7 Support", "White Label", "Custom Domain"], schools: 2, icon: Star },
];

export default function PlansPage() {
    const [plans, setPlans] = useState(initialPlans);
    const [editPlan, setEditPlan] = useState<any>(null);
    const [editForm, setEditForm] = useState<any>(null);
    const [toast, setToast] = useState<string | null>(null);
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const openEdit = (plan: any) => {
        setEditForm({ ...plan, features: [...plan.features] });
        setEditPlan(plan);
    };

    const handleSave = () => {
        setPlans(plans.map(p => p.id === editPlan.id ? { ...p, ...editForm } : p));
        showToast(`${editForm.name} plan updated successfully!`);
        setEditPlan(null);
        setEditForm(null);
    };

    const addFeature = () => {
        setEditForm({ ...editForm, features: [...editForm.features, ""] });
    };

    const removeFeature = (idx: number) => {
        setEditForm({ ...editForm, features: editForm.features.filter((_: any, i: number) => i !== idx) });
    };

    const updateFeature = (idx: number, val: string) => {
        const f = [...editForm.features];
        f[idx] = val;
        setEditForm({ ...editForm, features: f });
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1e293b" }}>Plans & Pricing</h1>
                    <p style={{ color: "#94a3b8", marginTop: 4, fontSize: 14 }}>Manage subscription plans for schools</p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    return (
                        <div key={plan.id} style={{
                            position: "relative",
                            background: "white",
                            borderRadius: 16,
                            border: plan.popular ? `2px solid ${plan.color}` : "1px solid #e8eaed",
                            overflow: "visible",
                            padding: "28px 22px 22px",
                            transition: "all 0.25s ease",
                            boxShadow: plan.popular ? `0 8px 30px ${plan.color}20` : "0 2px 8px rgba(0,0,0,0.04)",
                        }}>
                            {plan.popular && (
                                <div style={{
                                    position: "absolute",
                                    top: -13,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: plan.gradient,
                                    color: "white",
                                    padding: "5px 18px",
                                    borderRadius: 20,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                    boxShadow: `0 4px 12px ${plan.color}40`,
                                }}>★ MOST POPULAR</div>
                            )}

                            {/* Icon & Name */}
                            <div style={{ textAlign: "center", marginBottom: 20 }}>
                                <div style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 14,
                                    background: plan.gradient,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 14px",
                                    boxShadow: `0 4px 14px ${plan.color}30`,
                                }}>
                                    <Icon size={24} style={{ color: "white" }} />
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b" }}>{plan.name}</h3>
                                <div style={{ margin: "10px 0 4px" }}>
                                    <span style={{ fontSize: 32, fontWeight: 800, color: "#1e293b" }}>₹{plan.price.toLocaleString()}</span>
                                    <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>/mo</span>
                                </div>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    background: `${plan.color}10`,
                                    color: plan.color,
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}>
                                    <Building2 size={12} /> {plan.schools} school(s)
                                </div>
                            </div>

                            {/* Limits */}
                            <div style={{
                                padding: "16px 0",
                                borderTop: "1px solid #f0f1f3",
                                borderBottom: "1px solid #f0f1f3",
                                marginBottom: 16,
                            }}>
                                {[
                                    { label: "Students", value: plan.students === -1 ? "Unlimited" : plan.students.toLocaleString() },
                                    { label: "Teachers", value: plan.teachers === -1 ? "Unlimited" : plan.teachers.toString() },
                                    { label: "Storage", value: plan.storage },
                                ].map((r) => (
                                    <div key={r.label} style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: 13,
                                        padding: "5px 0",
                                    }}>
                                        <span style={{ color: "#94a3b8" }}>{r.label}</span>
                                        <span style={{ fontWeight: 600, color: "#1e293b" }}>{r.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Features */}
                            <div style={{ marginBottom: 18 }}>
                                {plan.features.map((f) => (
                                    <div key={f} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        fontSize: 13,
                                        padding: "5px 0",
                                        color: "#475569",
                                    }}>
                                        <div style={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: "50%",
                                            background: `${plan.color}15`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}>
                                            <Check size={11} style={{ color: plan.color }} />
                                        </div>
                                        {f}
                                    </div>
                                ))}
                            </div>

                            {/* Edit Button */}
                            <button
                                onClick={() => openEdit(plan)}
                                style={{
                                    width: "100%",
                                    padding: "10px 0",
                                    borderRadius: 10,
                                    border: `1px solid ${plan.color}30`,
                                    background: `${plan.color}08`,
                                    color: plan.color,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 6,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <Edit size={15} /> Edit Plan
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Edit Plan Modal */}
            <Modal open={!!editPlan} onClose={() => { setEditPlan(null); setEditForm(null); }} title={`Edit ${editForm?.name || ""} Plan`} width={560}>
                {editForm && (
                    <div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                            <div className="form-group">
                                <label className="form-label" style={{ color: "#1e293b" }}>Plan Name</label>
                                <input className="form-input" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: "#1e293b" }}>Price (₹/mo)</label>
                                <input className="form-input" type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: "#1e293b" }}>Max Students</label>
                                <input className="form-input" type="number" value={editForm.students} onChange={(e) => setEditForm({ ...editForm, students: parseInt(e.target.value) || 0 })} />
                                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Use -1 for unlimited</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: "#1e293b" }}>Max Teachers</label>
                                <input className="form-input" type="number" value={editForm.teachers} onChange={(e) => setEditForm({ ...editForm, teachers: parseInt(e.target.value) || 0 })} />
                                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Use -1 for unlimited</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: "#1e293b" }}>Storage</label>
                                <input className="form-input" value={editForm.storage} onChange={(e) => setEditForm({ ...editForm, storage: e.target.value })} />
                            </div>
                        </div>

                        {/* Features */}
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <label className="form-label" style={{ color: "#1e293b", margin: 0 }}>Features</label>
                                <button
                                    onClick={addFeature}
                                    style={{
                                        background: "#eef2ff",
                                        color: "#6366f1",
                                        border: "none",
                                        padding: "4px 12px",
                                        borderRadius: 6,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >+ Add</button>
                            </div>
                            {editForm.features.map((f: string, i: number) => (
                                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                    <input
                                        className="form-input"
                                        value={f}
                                        onChange={(e) => updateFeature(i, e.target.value)}
                                        placeholder="Feature name"
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        onClick={() => removeFeature(i)}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 8,
                                            border: "1px solid #fecaca",
                                            background: "#fef2f2",
                                            color: "#ef4444",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            flexShrink: 0,
                                        }}
                                    ><X size={14} /></button>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 14, borderTop: "1px solid #f0f1f3" }}>
                            <button className="btn btn-secondary" onClick={() => { setEditPlan(null); setEditForm(null); }}>Cancel</button>
                            <button
                                onClick={handleSave}
                                style={{
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 22px",
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    cursor: "pointer",
                                }}
                            ><Save size={15} /> Save Changes</button>
                        </div>
                    </div>
                )}
            </Modal>

            {toast && <div style={{ position: "fixed", bottom: 24, right: 24, background: "#10b981", color: "white", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, zIndex: 300, boxShadow: "0 8px 20px rgba(16,185,129,0.3)" }}>✅ {toast}</div>}
        </div>
    );
}
