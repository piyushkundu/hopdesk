"use client";

import { useState } from "react";
import { demoFees } from "@/lib/demo-data";
import { Search, DollarSign, Download, Plus, Eye, CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function FeesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const filtered = demoFees.filter((fee) => {
        const matchSearch = fee.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) || fee.studentId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = filterStatus ? fee.status === filterStatus : true;
        return matchSearch && matchStatus;
    });

    const totalCollected = demoFees.filter(f => f.status === "paid").reduce((a, b) => a + b.amount, 0);
    const totalPending = demoFees.filter(f => f.status !== "paid").reduce((a, b) => a + b.amount, 0);

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Fee Management</h1>
                    <p className="page-subtitle">Track fees, payments, and generate receipts</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn btn-secondary"><Download size={16} /> Export</button>
                    <button className="btn btn-primary"><Plus size={16} /> Collect Fee</button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                <div className="card-stat green" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CheckCircle size={20} style={{ color: "var(--success)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Collected</p>
                            <p style={{ fontSize: 20, fontWeight: 700, color: "var(--success)" }}>₹{totalCollected.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="card-stat amber" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <AlertCircle size={20} style={{ color: "var(--danger)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Pending</p>
                            <p style={{ fontSize: 20, fontWeight: 700, color: "var(--danger)" }}>₹{totalPending.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <DollarSign size={20} style={{ color: "var(--primary-light)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Total Records</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoFees.length}</p>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Clock size={20} style={{ color: "var(--accent-light)" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Partial</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{demoFees.filter(f => f.status === "partial").length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="filter-search">
                    <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input placeholder="Search by student name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                </select>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Class</th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Payment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((fee) => (
                            <tr key={fee.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 6, background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white" }}>
                                            {fee.studentName?.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{fee.studentName}</div>
                                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{fee.studentId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge badge-primary">{fee.className}</span></td>
                                <td>{fee.month} {fee.year}</td>
                                <td style={{ fontWeight: 600 }}>₹{fee.amount.toLocaleString()}</td>
                                <td><span className={`badge ${fee.status === "paid" ? "badge-success" : fee.status === "unpaid" ? "badge-danger" : "badge-warning"}`}>{fee.status}</span></td>
                                <td>{fee.paymentDate || "—"}</td>
                                <td>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        <button className="btn btn-ghost btn-icon btn-sm" title="View Receipt"><Eye size={14} /></button>
                                        {fee.status !== "paid" && <button className="btn btn-success btn-sm" style={{ fontSize: 12, padding: "4px 12px" }}>Collect</button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
