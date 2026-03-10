// Homework Demo Data
export interface Homework {
    id: string;
    title: string;
    description: string;
    subject: string;
    className: string;
    section?: string;
    teacherName: string;
    dueDate: string;
    assignedDate: string;
    status: "active" | "completed" | "overdue";
}

export const demoHomework: Homework[] = [
    { id: "HW001", title: "Algebra Practice Set", description: "Solve exercise 5.1 and 5.2 from NCERT textbook. Show all working steps.", subject: "Mathematics", className: "10", section: "A", teacherName: "Dr. Meena Iyer", dueDate: "2025-03-10", assignedDate: "2025-03-05", status: "active" },
    { id: "HW002", title: "Newton's Laws Essay", description: "Write a 500-word essay on applications of Newton's three laws of motion in daily life.", subject: "Physics", className: "10", section: "A", teacherName: "Rajiv Menon", dueDate: "2025-03-08", assignedDate: "2025-03-04", status: "active" },
    { id: "HW003", title: "English Grammar Worksheet", description: "Complete the worksheet on active and passive voice transformations.", subject: "English", className: "10", section: "A", teacherName: "Sunita Devi", dueDate: "2025-03-07", assignedDate: "2025-03-03", status: "overdue" },
    { id: "HW004", title: "Periodic Table Quiz Prep", description: "Memorize the first 30 elements and their properties. Quiz on Monday.", subject: "Chemistry", className: "10", section: "A", teacherName: "Amit Tiwari", dueDate: "2025-03-12", assignedDate: "2025-03-06", status: "active" },
    { id: "HW005", title: "Biology Diagram", description: "Draw and label the human digestive system. Use colored pencils.", subject: "Biology", className: "10", section: "A", teacherName: "Pooja Nair", dueDate: "2025-03-09", assignedDate: "2025-03-05", status: "active" },
    { id: "HW006", title: "Quadratic Equations", description: "Solve all problems from exercise 4.3 NCERT.", subject: "Mathematics", className: "9", section: "A", teacherName: "Dr. Meena Iyer", dueDate: "2025-03-11", assignedDate: "2025-03-06", status: "active" },
];

// Notice Board Demo Data
export interface Notice {
    id: string;
    title: string;
    message: string;
    type: "holiday" | "exam" | "event" | "important" | "general";
    postedBy: string;
    postedDate: string;
    visibleTo: ("student" | "teacher" | "parent")[];
    priority: "high" | "medium" | "low";
}

export const demoNotices: Notice[] = [
    { id: "NOT001", title: "Holi Holiday", message: "School will remain closed on March 14-15, 2025 on account of Holi festival. Classes resume on March 17.", type: "holiday", postedBy: "Admin", postedDate: "2025-03-05", visibleTo: ["student", "teacher", "parent"], priority: "high" },
    { id: "NOT002", title: "Mid-Term Exam Schedule", message: "Mid-term examinations for Class 8-10 will begin from March 20, 2025. Timetable has been uploaded. Students are advised to prepare accordingly.", type: "exam", postedBy: "Admin", postedDate: "2025-03-04", visibleTo: ["student", "teacher", "parent"], priority: "high" },
    { id: "NOT003", title: "Annual Sports Day", message: "Annual Sports Day will be held on April 5, 2025. All students must participate in at least one event. Registration forms available at sports room.", type: "event", postedBy: "Admin", postedDate: "2025-03-03", visibleTo: ["student", "teacher", "parent"], priority: "medium" },
    { id: "NOT004", title: "Fee Payment Reminder", message: "Last date for fee payment for March 2025 is March 10. Late fee of ₹100 will be charged after due date.", type: "important", postedBy: "Admin", postedDate: "2025-03-02", visibleTo: ["student", "parent"], priority: "high" },
    { id: "NOT005", title: "PTA Meeting", message: "Parent-Teacher Association meeting scheduled for March 22, 2025 at 10:00 AM. All parents are requested to attend.", type: "event", postedBy: "Admin", postedDate: "2025-03-01", visibleTo: ["teacher", "parent"], priority: "medium" },
    { id: "NOT006", title: "Staff Meeting", message: "All teachers are requested to attend the staff meeting on March 8, 2025 at 3:00 PM in the conference hall.", type: "general", postedBy: "Admin", postedDate: "2025-02-28", visibleTo: ["teacher"], priority: "low" },
    { id: "NOT007", title: "Library Book Return", message: "All borrowed books must be returned by March 15, 2025. Fine of ₹5/day for overdue books.", type: "general", postedBy: "Admin", postedDate: "2025-02-27", visibleTo: ["student"], priority: "low" },
];

// Teacher's assigned classes data
export const teacherClasses = [
    { classId: "CLS005", className: "10", section: "A", subject: "Mathematics", studentCount: 40, todayPeriods: 2 },
    { classId: "CLS006", className: "10", section: "B", subject: "Mathematics", studentCount: 37, todayPeriods: 1 },
];

// Student result data (for Aarav Sharma STU001)
export const studentResults = [
    { examName: "Unit Test 1", subject: "Mathematics", marks: 85, total: 100, grade: "A" },
    { examName: "Unit Test 1", subject: "Physics", marks: 78, total: 100, grade: "B+" },
    { examName: "Unit Test 1", subject: "Chemistry", marks: 92, total: 100, grade: "A+" },
    { examName: "Unit Test 1", subject: "English", marks: 88, total: 100, grade: "A" },
    { examName: "Unit Test 1", subject: "Biology", marks: 74, total: 100, grade: "B" },
];

// Student attendance data monthly
export const studentAttendanceMonthly = [
    { month: "Sep", present: 22, absent: 2, leave: 1 },
    { month: "Oct", present: 24, absent: 1, leave: 1 },
    { month: "Nov", present: 20, absent: 3, leave: 2 },
    { month: "Dec", present: 18, absent: 2, leave: 1 },
    { month: "Jan", present: 23, absent: 1, leave: 0 },
    { month: "Feb", present: 21, absent: 2, leave: 1 },
    { month: "Mar", present: 5, absent: 0, leave: 0 },
];

// Student fee data
export const studentFeeData = [
    { month: "September 2024", amount: 5000, status: "paid", date: "2024-09-05" },
    { month: "October 2024", amount: 5000, status: "paid", date: "2024-10-08" },
    { month: "November 2024", amount: 5000, status: "paid", date: "2024-11-10" },
    { month: "December 2024", amount: 5000, status: "paid", date: "2024-12-05" },
    { month: "January 2025", amount: 5000, status: "paid", date: "2025-01-05" },
    { month: "February 2025", amount: 5000, status: "paid", date: "2025-02-07" },
    { month: "March 2025", amount: 5000, status: "pending", date: "" },
];
