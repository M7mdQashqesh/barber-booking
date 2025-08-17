import { popup } from "../components/popup.js";
import { firestore, auth } from "../config/firebase.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

export async function loginAccount(
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement
) {
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
      if (user.uid !== userSnap.data().userId)
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            uid: user.uid + "admin",
            fullname: userSnap.data().fullname,
          })
        );
      else
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
            fullname: userSnap.data().fullname,
          })
        );
      setTimeout(() => {
        window.location.href = "../../index.html";
      }, 1000);
    }
  } catch (error: any) {
    popup("البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى التحقق مرة أخرى");
    console.error("Login error:", error.code, error.message);
  }
}
