"use client";

import { studentFeeData } from "@/lib/role-data";
import { DollarSign, CheckCircle, AlertCircle, Receipt } from "lucide-react";

export default function MyFeesPage() {
    const paidFees = studentFeeData.filter(f => f.status === "paid");
    const pendingFees = studentFeeData.filter(f => f.status === "pending");
    const totalPaid = paidFees.reduce((a, b) => a + b.amount, 0);
    const totalPending = pendingFees.reduce((a, b) => a + b.amount, 0);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Fee Status</h1>
                    <p className="page-subtitle">Your fee payment history and pending dues</p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card" style={{ padding: 20, textAlign: "center" }}>
                    <CheckCircle size={28} style={{ color: "var(--success)", margin: "0 auto 10px" }} />
                    <p style={{ fontSize: 24, fontWeight: 700, color: "var(--success)" }}>₹{totalPaid.toLocaleString()}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Paid</p>
                </div>
                <div className="card" style={{ padding: 20, textAlign: "center" }}>
                    <AlertCircle size={28} style={{ color: pendingFees.length > 0 ? "var(--danger)" : "var(--success)", margin: "0 auto 10px" }} />
                    <p style={{ fontSize: 24, fontWeight: 700, color: pendingFees.length > 0 ? "var(--danger)" : "var(--success)" }}>₹{totalPending.toLocaleString()}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Pending</p>
                </div>
                <div className="card" style={{ padding: 20, textAlign: "center" }}>
                    <Receipt size={28} style={{ color: "var(--primary-light)", margin: "0 auto 10px" }} />
                    <p style={{ fontSize: 24, fontWeight: 700, color: "var(--primary-light)" }}>{studentFeeData.length}</p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Months</p>
                </div>
            </div>

            {/* Pending Fee Alert */}
            {pendingFees.length > 0 && (
                <div className="card" style={{ marginBottom: 24, padding: 20, borderLeft: "3px solid var(--danger)", background: "rgba(239, 68, 68, 0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <AlertCircle size={24} style={{ color: "var(--danger)" }} />
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Pending Fee</h3>
                                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{pendingFees[0].month} — ₹{pendingFees[0].amount.toLocaleString()}</p>
                            </div>
                        </div>
                        <button className="btn btn-primary"><DollarSign size={16} /> Pay Now</button>
                    </div>
                </div>
            )}

            {/* Payment History */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>Payment History</h3>
                </div>
                <table className="data-table">
                    <thead><tr><th>Month</th><th>Amount</th><th>Status</th><th>Payment Date</th><th>Action</th></tr></thead>
                    <tbody>
                        {studentFeeData.map((fee) => (
                            <tr key={fee.month}>
                                <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{fee.month}</td>
                                <td style={{ fontWeight: 600 }}>₹{fee.amount.toLocaleString()}</td>
                                <td><span className={`badge ${fee.status === "paid" ? "badge-success" : "badge-danger"}`}>{fee.status}</span></td>
                                <td>{fee.date || "—"}</td>
                                <td>
                                    {fee.status === "paid" ? (
                                        <button className="btn btn-ghost btn-sm"><Receipt size={14} /> Receipt</button>
                                    ) : (
                                        <button className="btn btn-primary btn-sm">Pay Now</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
