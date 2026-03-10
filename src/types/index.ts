// Types for SchoolERP

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: "admin" | "teacher" | "student" | "parent" | "super_admin";
    linkedId?: string;
    schoolId?: string;
    schoolName?: string;
    teacherId?: string;
    createdAt: string;
}

export interface Student {
    id: string;
    name: string;
    fatherName: string;
    className: string;
    section: string;
    rollNumber: string;
    phone: string;
    email?: string;
    address: string;
    admissionDate: string;
    dateOfBirth?: string;
    gender: string;
    status: string;
    photo?: string;
    schoolId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Teacher {
    id: string;
    name: string;
    subject: string;
    phone: string;
    email: string;
    joiningDate: string;
    qualification: string;
    salary: number;
    status: string;
    assignedClasses: string[];
    teacherId?: string;
    pin?: string;
    schoolId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SchoolClass {
    id: string;
    className: string;
    section: string;
    classTeacher: string;
    classTeacherName: string;
    roomNumber: string;
    studentCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Fee {
    id: string;
    studentId: string;
    studentName: string;
    className: string;
    amount: number;
    paid: number;
    status: string;
    dueDate: string;
    type: string;
    createdAt: string;
}

export interface Exam {
    id: string;
    name: string;
    className: string;
    subject: string;
    date: string;
    time?: string;
    status: string;
    maxMarks: number;
    createdAt: string;
}

export interface Attendance {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    date: string;
    status: string;
    createdAt: string;
}

export interface Enquiry {
    id: string;
    studentName: string;
    fatherName: string;
    phone: string;
    email?: string;
    classInterested: string;
    previousSchool?: string;
    address: string;
    enquiryDate: string;
    status: string;
    assignedTeacher?: string;
    assignedTeacherName?: string;
    notes?: string;
    followUpDate?: string;
    createdBy: string;
    schoolId?: string;
    createdAt: string;
    updatedAt: string;
}
