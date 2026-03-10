"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";

export default function AddStudentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "", fatherName: "", className: "", section: "",
        rollNumber: "", phone: "", email: "", address: "",
        dateOfBirth: "", gender: "male", admissionDate: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Student added successfully! (Demo mode)");
        router.push("/students");
    };

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Link href="/students" className="btn btn-ghost btn-icon"><ArrowLeft size={20} /></Link>
                    <div>
                        <h1 className="page-title">Add New Student</h1>
                        <p className="page-subtitle">Fill in the details to register a new student</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Photo</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div style={{ width: 80, height: 80, borderRadius: "var(--radius-lg)", background: "var(--bg-card-hover)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed var(--border-color)" }}>
                            <Upload size={24} style={{ color: "var(--text-muted)" }} />
                        </div>
                        <div>
                            <button type="button" className="btn btn-secondary btn-sm">Upload Photo</button>
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>JPG, PNG. Max size 2MB</p>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Personal Information</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                        <div className="form-group"><label className="form-label">Full Name *</label><input name="name" className="form-input" value={formData.name} onChange={handleChange} placeholder="Enter student name" required /></div>
                        <div className="form-group"><label className="form-label">Father&apos;s Name *</label><input name="fatherName" className="form-input" value={formData.fatherName} onChange={handleChange} placeholder="Enter father's name" required /></div>
                        <div className="form-group"><label className="form-label">Date of Birth</label><input name="dateOfBirth" type="date" className="form-input" value={formData.dateOfBirth} onChange={handleChange} /></div>
                        <div className="form-group"><label className="form-label">Gender</label><select name="gender" className="form-select" value={formData.gender} onChange={handleChange}><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
                        <div className="form-group"><label className="form-label">Phone *</label><input name="phone" className="form-input" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required /></div>
                        <div className="form-group"><label className="form-label">Email</label><input name="email" type="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="student@email.com" /></div>
                    </div>
                    <div className="form-group"><label className="form-label">Address</label><textarea name="address" className="form-input" value={formData.address} onChange={handleChange} placeholder="Enter full address" /></div>
                </div>

                <div className="card" style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--text-primary)" }}>Academic Information</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                        <div className="form-group"><label className="form-label">Class *</label><select name="className" className="form-select" value={formData.className} onChange={handleChange} required><option value="">Select Class</option><option value="8">Class 8</option><option value="9">Class 9</option><option value="10">Class 10</option></select></div>
                        <div className="form-group"><label className="form-label">Section *</label><select name="section" className="form-select" value={formData.section} onChange={handleChange} required><option value="">Select Section</option><option value="A">Section A</option><option value="B">Section B</option></select></div>
                        <div className="form-group"><label className="form-label">Roll Number</label><input name="rollNumber" className="form-input" value={formData.rollNumber} onChange={handleChange} placeholder="Enter roll number" /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 24px" }}>
                        <div className="form-group"><label className="form-label">Admission Date</label><input name="admissionDate" type="date" className="form-input" value={formData.admissionDate} onChange={handleChange} /></div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                    <Link href="/students" className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary"><Save size={16} /> Save Student</button>
                </div>
            </form>
        </div>
    );
}
