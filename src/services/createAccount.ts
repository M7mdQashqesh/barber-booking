import { popup } from "../components/popup.js";
import { firestore, auth } from "../config/firebase.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { Iauth } from "../types/authTypes.js";

export async function createAccount(
  fullNameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  confirmPasswordInput: HTMLInputElement
) {
  const fullname = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const useRef = doc(firestore, "users", email);

    const userData: Iauth = {
      createdAt: new Date().toISOString(),
      fullname,
      email,
    };
    await setDoc(useRef, userData);

    popup("تم انشاء الحساب بنجاح");
    const userInputs = [
      fullNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ];
    userInputs.forEach((input) => {
      if (input) input.value = "";
    });
    await signOut(auth);
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1500);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use")
      popup("هذا الحساب مسجل بالفعل");
    else console.error("Failed While Create Account: ", error);
  }
}
