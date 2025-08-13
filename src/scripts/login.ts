import { popup } from "../components/popup.js";
import { firestore, auth } from "../config/firebase.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user: any) => {
  if (user) window.location.href = "../pages/index.html";
  else document.body.classList.remove("hidden");
});

const form = document.querySelector("form");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.querySelector(
    "input[type='email']"
  ) as HTMLInputElement | null;
  const passwordInput = document.querySelector(
    "input[type='password']"
  ) as HTMLInputElement | null;

  if (!validateLogin(emailInput!, passwordInput!)) return;

  const email = emailInput?.value.trim();
  const password = passwordInput?.value;

  try {
    const useRef = doc(firestore, "users", email);
    const userSnap = await getDoc(useRef);
    if (!userSnap.exists()) popup("لا يوجد حساب بهذا البريد");
    else {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      popup("تم تسجيل الدخول");
      const userInputs = [emailInput, passwordInput];
      userInputs.forEach((input) => {
        if (input) input.value = "";
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid })
      );
      setTimeout(() => {
        window.location.href = "../pages/index.html";
      }, 1500);
    }
  } catch (error: any) {
    popup("البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى التحقق مرة أخرى");
    console.error("Login error:", error.code, error.message);
  }
});

function validateLogin(
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement
): boolean {
  if (!emailInput || !passwordInput) {
    console.error("No Input Fields");
    return false;
  }

  if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
    popup("يرجى إدخال جميع الحقول");
    return false;
  }
  return true;
}

const googleBtn = document.getElementById(
  "google-btn"
) as HTMLInputElement | null;

googleBtn?.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.displayName || !user.email)
      throw new Error("Google Account Is Missing Email or Display Name");

    const useRef = doc(firestore, "users", user.email);
    const userSnap = await getDoc(useRef);

    if (!userSnap.exists()) {
      popup("لا يوجد حساب لهذا البريد الإلكتروني");
      await signOut(auth);
    } else {
      popup("تم تسجيل الدخول بنجاح");

      setTimeout(() => {
        window.location.href = "../pages/index.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Google SignIn Error:", error);
  }
});
