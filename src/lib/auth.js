import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();

// ─── تفعيل بقاء تسجيل الدخول (Persistence) ───
// هذا يضمن عدم ضياع تسجيل الدخول عند تحديث الصفحة
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("خطأ في إعداد بقاء تسجيل الدخول:", error);
});

// ──────────────────────────────────────────────
// إنشاء حساب جديد بالإيميل وكلمة المرور
// ──────────────────────────────────────────────
export async function registerWithEmail(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // إنشاء ملف المستخدم في Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    subscriptionTier: 'free',
    createdAt: serverTimestamp(),
  });

  return user;
}

// ──────────────────────────────────────────────
// تسجيل الدخول بالإيميل وكلمة المرور
// ──────────────────────────────────────────────
export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// ──────────────────────────────────────────────
// تسجيل الدخول باستخدام Google
// ──────────────────────────────────────────────
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // إنشاء ملف المستخدم إذا لم يكن موجوداً
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      subscriptionTier: 'free',
      createdAt: serverTimestamp(),
    });
  }

  return user;
}

// ──────────────────────────────────────────────
// تسجيل الخروج
// ──────────────────────────────────────────────
export async function logout() {
  await signOut(auth);
}

// ──────────────────────────────────────────────
// مراقبة حالة المصادقة
// ──────────────────────────────────────────────
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
