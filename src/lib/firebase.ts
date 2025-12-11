import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAesxkuZfSrMZ6BrfpUdfmpWwmiR2O5Tv4",
  authDomain: "musio-token-studio.firebaseapp.com",
  projectId: "musio-token-studio",
  storageBucket: "musio-token-studio.firebasestorage.app",
  messagingSenderId: "564639895942",
  appId: "1:564639895942:web:7781b562408020418e9c07"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
