import { popup } from "../components/popup.js";
import { firestore, auth } from "../config/firebase.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { Iauth } from "../types/authTypes.js";

const form = document.querySelector("form");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullNameInput = document.getElementById(
    "fullname"
  ) as HTMLInputElement | null;
  const emailInput = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password"
  ) as HTMLInputElement | null;
  const confirmPasswordInput = document.getElementById(
    "confirm_password"
  ) as HTMLInputElement | null;

  if (
    !validateSignup(
      fullNameInput!,
      emailInput!,
      passwordInput!,
      confirmPasswordInput!
    )
  )
    return;

  const fullname = fullNameInput?.value.trim();
  const email = emailInput?.value.trim();
  const password = passwordInput?.value;

  if (!fullname || !email) {
    throw new Error("Full name and email are required");
  }

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

    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1500);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use")
      popup("هذا الحساب مسجل بالفعل");
    else console.error("Failed While Create Account: ", error);
  }
});

function validateSignup(
  fullNameText: HTMLInputElement,
  emailText: HTMLInputElement,
  passwordText: HTMLInputElement,
  confirmPasswordText: HTMLInputElement
): boolean {
  if (
    fullNameText.value.trim() === "" ||
    emailText.value.trim() === "" ||
    passwordText.value.trim() === "" ||
    confirmPasswordText.value.trim() === ""
  ) {
    popup("يرجى تعبئة جميع الحقول");
    return false;
  }

  const fullnameRegex = /^[\u0621-\u064Aa-zA-Z\s\-']{2,50}$/;
  if (!fullnameRegex.test(fullNameText.value.trim())) {
    popup("يرجى إدخال اسم صحيح (حروف عربية أو إنجليزية فقط)");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailText.value.trim())) {
    popup("يرجى إدخال بريد إلكتروني صالح");
    return false;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(passwordText.value)) {
    popup(
      "يرجى إدخال كلمة سر صحيحة تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص"
    );
    return false;
  }

  if (passwordText.value !== confirmPasswordText.value) {
    popup("كلمتا المرور غير متطابقتين");
    return false;
  }

  return true;
}

const googleBtn = document.getElementById(
  "google-btn"
) as HTMLButtonElement | null;

googleBtn?.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email || !user.displayName)
      throw new Error("Google Account Is Missing Email or Display Name");

    const useRef = doc(firestore, "users", user.email);
    const userSnap = await getDoc(useRef, "users", user.email);

    if (!userSnap.exists()) {
      const userData: Iauth = {
        createdAt: new Date().toISOString(),
        fullname: user.displayName,
        email: user.email,
      };
      await setDoc(useRef, userData);
      popup("تم انشاء الحساب بنجاح");
      setTimeout(() => {
        window.location.href = "../pages/login.html";
      }, 1500);
    } else popup("الحساب مسجل بالفعل");
  } catch (error: any) {
    console.error("Error while Create Account: ", error.message);
  }
});
