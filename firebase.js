import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFX9eqY603To_3E68Pg3GqTrvbIaeSXhk",
  authDomain: "hy-guys.firebaseapp.com",
  projectId: "hy-guys",
  storageBucket: "hy-guys.appspot.com",
  messagingSenderId: "497320092967",
  appId: "1:497320092967:web:f14d2de95190130b007502"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}