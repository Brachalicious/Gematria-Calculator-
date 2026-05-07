import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOZlGP9cnkES6gJbnOneVGu9jxu548qAE",
  authDomain: "mysticminded33-gematria-calc.firebaseapp.com",
  projectId: "mysticminded33-gematria-calc",
  storageBucket: "mysticminded33-gematria-calc.firebasestorage.app",
  messagingSenderId: "295647948321",
  appId: "1:295647948321:web:795bcb5a43ba0b99583d60",
  measurementId: "G-YCV4SYZ3WH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
