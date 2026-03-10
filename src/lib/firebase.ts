import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyArJHd8F_InPqL-aXad5UG5zmlBA_Qdtqs",
    authDomain: "schoolerp-9b98a.firebaseapp.com",
    projectId: "schoolerp-9b98a",
    storageBucket: "schoolerp-9b98a.firebasestorage.app",
    messagingSenderId: "936536571876",
    appId: "1:936536571876:web:08411d95942cff851b11f1",
    measurementId: "G-4W1XR2BND4",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

export { auth, db, storage };
export default app!;
