import {
    collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
    query, where, setDoc, serverTimestamp, Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

// Helper: sort by createdAt desc (client-side to avoid composite index requirement)
function sortByCreatedAt(docs: any[]) {
    return docs.sort((a, b) => {
        try {
            const getTime = (v: any) => {
                if (!v) return 0;
                if (v.toDate) return v.toDate().getTime();
                if (v.seconds) return v.seconds * 1000;
                const d = new Date(v);
                return isNaN(d.getTime()) ? 0 : d.getTime();
            };
            return getTime(b.createdAt) - getTime(a.createdAt);
        } catch { return 0; }
    });
}

// ==================== SCHOOLS ====================
export async function getSchools() {
    const snap = await getDocs(collection(db, "schools"));
    const schools = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return sortByCreatedAt(schools);
}

export async function addSchool(data: any) {
    const ref = await addDoc(collection(db, "schools"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateSchool(id: string, data: any) {
    await updateDoc(doc(db, "schools", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteSchool(id: string) {
    await deleteDoc(doc(db, "schools", id));
}

export async function getSchoolByCode(code: string) {
    const snap = await getDocs(query(collection(db, "schools"), where("code", "==", code)));
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

// ==================== USERS (Auth) ====================
export async function getUserByEmail(email: string) {
    const snap = await getDocs(query(collection(db, "users"), where("email", "==", email)));
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function getUserByTeacherId(teacherId: string) {
    const snap = await getDocs(query(collection(db, "users"), where("teacherId", "==", teacherId)));
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function addUser(data: any) {
    const ref = await addDoc(collection(db, "users"), {
        ...data,
        createdAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateUser(id: string, data: any) {
    await updateDoc(doc(db, "users", id), { ...data });
}

export async function deleteUser(id: string) {
    await deleteDoc(doc(db, "users", id));
}

export async function getUsers() {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getUsersBySchool(schoolId: string) {
    const snap = await getDocs(query(collection(db, "users"), where("schoolId", "==", schoolId)));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getPendingUsersBySchool(schoolId: string, role?: string) {
    let snap;
    if (role) {
        snap = await getDocs(query(collection(db, "users"), where("schoolId", "==", schoolId), where("status", "==", "pending"), where("role", "==", role)));
    } else {
        snap = await getDocs(query(collection(db, "users"), where("schoolId", "==", schoolId), where("status", "==", "pending")));
    }
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ==================== TEACHERS ====================
export async function getTeachersBySchool(schoolId: string) {
    const snap = await getDocs(query(collection(db, "teachers"), where("schoolId", "==", schoolId)));
    return sortByCreatedAt(snap.docs.map(d => ({ id: d.id, ...d.data() })));
}

export async function addTeacher(data: any) {
    const ref = await addDoc(collection(db, "teachers"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateTeacher(id: string, data: any) {
    await updateDoc(doc(db, "teachers", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTeacher(id: string) {
    await deleteDoc(doc(db, "teachers", id));
}

export async function getNextTeacherId(schoolId: string) {
    const teachers = await getTeachersBySchool(schoolId);
    const num = teachers.length + 1;
    return `TCH${String(num).padStart(3, "0")}`;
}

// ==================== STUDENTS ====================
export async function getStudentsBySchool(schoolId: string) {
    const snap = await getDocs(query(collection(db, "students"), where("schoolId", "==", schoolId)));
    return sortByCreatedAt(snap.docs.map(d => ({ id: d.id, ...d.data() })));
}

export async function addStudent(data: any) {
    const ref = await addDoc(collection(db, "students"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateStudent(id: string, data: any) {
    await updateDoc(doc(db, "students", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteStudent(id: string) {
    await deleteDoc(doc(db, "students", id));
}

export async function getNextStudentId(schoolId: string) {
    const students = await getStudentsBySchool(schoolId);
    const num = students.length + 1;
    return `STU${String(num).padStart(3, "0")}`;
}

// ==================== ENQUIRIES ====================
export async function getEnquiriesBySchool(schoolId: string) {
    const snap = await getDocs(query(collection(db, "enquiries"), where("schoolId", "==", schoolId)));
    return sortByCreatedAt(snap.docs.map(d => ({ id: d.id, ...d.data() })));
}

export async function addEnquiry(data: any) {
    const ref = await addDoc(collection(db, "enquiries"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateEnquiry(id: string, data: any) {
    await updateDoc(doc(db, "enquiries", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteEnquiry(id: string) {
    await deleteDoc(doc(db, "enquiries", id));
}

// ==================== STATS ====================
export async function getGlobalStats() {
    const schoolsSnap = await getDocs(collection(db, "schools"));
    const usersSnap = await getDocs(collection(db, "users"));
    const teachersSnap = await getDocs(collection(db, "teachers"));
    const studentsSnap = await getDocs(collection(db, "students"));
    const enquiriesSnap = await getDocs(collection(db, "enquiries"));

    const schools = schoolsSnap.docs.map(d => d.data());
    return {
        totalSchools: schools.length,
        activeSchools: schools.filter((s: any) => s.status === "active").length,
        inactiveSchools: schools.filter((s: any) => s.status !== "active").length,
        totalStudents: studentsSnap.size,
        totalTeachers: teachersSnap.size,
        totalEnquiries: enquiriesSnap.size,
        totalUsers: usersSnap.size,
    };
}

export async function getSchoolStats(schoolId: string) {
    const teachers = await getTeachersBySchool(schoolId);
    const students = await getStudentsBySchool(schoolId);
    const enquiries = await getEnquiriesBySchool(schoolId);
    return {
        totalTeachers: teachers.length,
        totalStudents: students.length,
        totalEnquiries: enquiries.length,
    };
}

// ==================== AUTO-GENERATE SCHOOL CODE ====================
export async function getNextSchoolCode() {
    const schoolsSnap = await getDocs(collection(db, "schools"));
    const num = schoolsSnap.size + 1;
    return `SCH${String(num).padStart(3, "0")}`;
}
