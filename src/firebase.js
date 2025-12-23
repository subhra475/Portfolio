import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4IpF-ImSq5x-macSxesFTb7ipe1Lris",
  authDomain: "subhra-portfolio.firebaseapp.com",
  projectId: "subhra-portfolio",
  storageBucket: "subhra-portfolio.appspot.com",
  messagingSenderId: "186220793102",
  appId: "1:186220793102:web:c265d6a3f7ca3d9ca1b5f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
