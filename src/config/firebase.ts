import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe9uYpJVNmrhjupwZZ4soedchXPmB-hqo",
  authDomain: "delivery-food-20f12.firebaseapp.com",
  projectId: "delivery-food-20f12",
  storageBucket: "delivery-food-20f12.appspot.com",
  messagingSenderId: "926964975250",
  appId: "1:926964975250:web:0941188440b6dbd0ae484b",
  measurementId: "G-MYCXX82YZL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
