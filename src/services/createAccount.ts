import { popup } from "../components/popup.js";
import { firestore, auth } from "../config/firebase.js";
import {
  doc,
  setDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { Iauth } from "../types/authTypes.js";
import { getCollectionSize } from "./getCollectionSize.js";

export async function createAccount(
  fullNameInput: HTMLInputElement,
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  confirmPasswordInput: HTMLInputElement
) {
  const fullname = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let collSize = Number(await getCollectionSize());
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const useRef = doc(firestore, "users", email);

    if (collSize === 0) {
      const userData: Iauth = {
        createdAt: new Date().toISOString(),
        fullname,
        email,
        userId: user.uid + "admin",
      };
      await setDoc(useRef, userData);
    } else {
      const userData: Iauth = {
        createdAt: new Date().toISOString(),
        fullname,
        email,
        userId: user.uid,
      };
      await setDoc(useRef, userData);
    }

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
    }, 1000);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use")
      popup("هذا الحساب مسجل بالفعل");
    else console.error("Failed While Create Account: ", error);
  }
}
