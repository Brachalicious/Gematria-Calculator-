import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnKQNnqSZaqB-iFHrUH_B2mK0T8V2mN1Q",
  authDomain: "gematria-calculater.firebaseapp.com",
  projectId: "gematria-calculater",
  storageBucket: "gematria-calculater.firebasestorage.app",
  messagingSenderId: "1087038497278",
  appId: "1:1087038497278:web:a42dfef9fbbadb1f44a0af",
  measurementId: "G-Z1F9D20WSE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
