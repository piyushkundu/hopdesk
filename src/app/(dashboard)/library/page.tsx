"use client";

import { useState } from "react";
import { Search, Plus, BookOpen, Eye, Edit, RotateCcw } from "lucide-react";

const demoBooks = [
    { id: "BK001", name: "Mathematics for Class 10", author: "R.D. Sharma", category: "Mathematics", isbn: "978-0-1234-5678-0", totalCopies: 50, availableCopies: 42 },
    { id: "BK002", name: "Concepts of Physics", author: "H.C. Verma", category: "Physics", isbn: "978-0-1234-5679-7", totalCopies: 40, availableCopies: 35 },
    { id: "BK003", name: "Organic Chemistry", author: "Morrison Boyd", category: "Chemistry", isbn: "978-0-1234-5680-3", totalCopies: 30, availableCopies: 28 },
    { id: "BK004", name: "Wren & Martin English Grammar", author: "Wren & Martin", category: "English", isbn: "978-0-1234-5681-0", totalCopies: 60, availableCopies: 55 },
    { id: "BK005", name: "Biology NCERT Class 12", author: "NCERT", category: "Biology", isbn: "978-0-1234-5682-7", totalCopies: 45, availableCopies: 40 },
    { id: "BK006", name: "Indian History", author: "Bipin Chandra", category: "History", isbn: "978-0-1234-5683-4", totalCopies: 25, availableCopies: 22 },
];

const issuedBooks = [
    { id: "ISS001", studentName: "Aarav Sharma", bookName: "Concepts of Physics", issueDate: "2025-02-15", dueDate: "2025-03-15", status: "issued" },
    { id: "ISS002", studentName: "Priya Patel", bookName: "Organic Chemistry", issueDate: "2025-02-20", dueDate: "2025-03-20", status: "issued" },
    { id: "ISS003", studentName: "Rohan Kumar", bookName: "Mathematics for Class 10", issueDate: "2025-01-10", dueDate: "2025-02-10", status: "overdue" },
    { id: "ISS004", studentName: "Kavya Gupta", bookName: "Biology NCERT Class 12", issueDate: "2025-02-25", dueDate: "2025-03-25", status: "issued" },
];

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"catalog" | "issued">("catalog");

    const filteredBooks = demoBooks.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Library</h1>
                    <p className="page-subtitle">Manage books, issued copies, and returns</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn btn-secondary"><RotateCcw size={16} /> Return Book</button>
                    <button className="btn btn-primary"><Plus size={16} /> Issue Book</button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                {[
                    { label: "Total Books", value: demoBooks.reduce((a, b) => a + b.totalCopies, 0), color: "var(--primary-light)", bg: "rgba(99, 102, 241, 0.15)" },
                    { label: "Available", value: demoBooks.reduce((a, b) => a + b.availableCopies, 0), color: "var(--success-light)", bg: "rgba(16, 185, 129, 0.15)" },
                    { label: "Issued", value: issuedBooks.filter(b => b.status === "issued").length, color: "var(--secondary-light)", bg: "rgba(6, 182, 212, 0.15)" },
                    { label: "Overdue", value: issuedBooks.filter(b => b.status === "overdue").length, color: "var(--danger-light)", bg: "rgba(239, 68, 68, 0.15)" },
                ].map((stat) => (
                    <div key={stat.label} className="card" style={{ padding: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <BookOpen size={20} style={{ color: stat.color }} />
                            </div>
                            <div>
                                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{stat.label}</p>
                                <p style={{ fontSize: 20, fontWeight: 700 }}>{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="profile-tabs" style={{ marginBottom: 20 }}>
                <button className={`profile-tab ${activeTab === "catalog" ? "active" : ""}`} onClick={() => setActiveTab("catalog")}>Book Catalog</button>
                <button className={`profile-tab ${activeTab === "issued" ? "active" : ""}`} onClick={() => setActiveTab("issued")}>Issued Books</button>
            </div>

            {activeTab === "catalog" && (
                <>
                    <div className="filter-bar">
                        <div className="filter-search">
                            <Search size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                            <input placeholder="Search by book name or author..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <select className="form-select"><option value="">All Categories</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option><option>English</option><option>Biology</option></select>
                    </div>
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <table className="data-table">
                            <thead><tr><th>Book</th><th>Author</th><th>Category</th><th>ISBN</th><th>Total</th><th>Available</th><th>Actions</th></tr></thead>
                            <tbody>
                                {filteredBooks.map((book) => (
                                    <tr key={book.id}>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <BookOpen size={16} style={{ color: "var(--primary-light)" }} />
                                                </div>
                                                {book.name}
                                            </div>
                                        </td>
                                        <td>{book.author}</td>
                                        <td><span className="badge badge-primary">{book.category}</span></td>
                                        <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{book.isbn}</td>
                                        <td>{book.totalCopies}</td>
                                        <td><span className={`badge ${book.availableCopies > 10 ? "badge-success" : "badge-warning"}`}>{book.availableCopies}</span></td>
                                        <td>
                                            <div style={{ display: "flex", gap: 4 }}>
                                                <button className="btn btn-ghost btn-icon btn-sm"><Eye size={14} /></button>
                                                <button className="btn btn-ghost btn-icon btn-sm"><Edit size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {activeTab === "issued" && (
                <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                    <table className="data-table">
                        <thead><tr><th>Student</th><th>Book</th><th>Issue Date</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {issuedBooks.map((issue) => (
                                <tr key={issue.id}>
                                    <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{issue.studentName}</td>
                                    <td>{issue.bookName}</td>
                                    <td>{issue.issueDate}</td>
                                    <td>{issue.dueDate}</td>
                                    <td><span className={`badge ${issue.status === "issued" ? "badge-info" : "badge-danger"}`}>{issue.status}</span></td>
                                    <td><button className="btn btn-success btn-sm" style={{ fontSize: 12, padding: "4px 12px" }}>Return</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
