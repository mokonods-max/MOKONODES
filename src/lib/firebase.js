import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCKK0fy2uqdclFDku4oS1cQMxFJIy2zagA',
  authDomain: 'mokonodes.firebaseapp.com',
  projectId: 'mokonodes',
  storageBucket: 'mokonodes.firebasestorage.app',
  messagingSenderId: '338012472603',
  appId: '1:338012472603:web:98716a5a88944699bb7fbe',
  measurementId: 'G-6WZWBRSRJW',
};

// Initialize Firebase (prevent duplicate initialization in dev/HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Core services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}
export { analytics };

export default app;
