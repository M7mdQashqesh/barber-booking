// @ts-ignore
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// @ts-ignore
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// @ts-ignore
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnZqpRuyt72FszNAOigorKm2sxeobmiJc",
  authDomain: "barbershop-b18ca.firebaseapp.com",
  projectId: "barbershop-b18ca",
  storageBucket: "barbershop-b18ca.firebasestorage.app",
  messagingSenderId: "1097661806282",
  appId: "1:1097661806282:web:ae64f127cb253b9cc22633",
  measurementId: "G-XYMW769EFK",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
