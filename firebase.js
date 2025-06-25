import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSfnDjgQFF7YL8xLDF9SSZznga5i-Liao",
  authDomain: "app-language-49b2f.firebaseapp.com",
  projectId: "app-language-49b2f",
  storageBucket: "app-language-49b2f.appspot.com", // Đã sửa lại đúng
  messagingSenderId: "323833094747",
  appId: "1:323833094747:web:21beed089a5da86b54957e",
  measurementId: "G-P382MLSGRH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);