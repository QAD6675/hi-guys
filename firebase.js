import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRVKTrrbfyFhpjMDlA9HT869wwq8L5QC4",
  authDomain: "hi-guys-7d28c.firebaseapp.com",
  projectId: "hi-guys-7d28c",
  storageBucket: "hi-guys-7d28c.appspot.com",
  messagingSenderId: "904969734966",
  appId: "1:904969734966:web:58a2a4f28a65c101e58197",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  expirementalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
