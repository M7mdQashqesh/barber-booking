import { popup } from "../components/popup.js";
import { auth } from "../config/firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

export async function logout() {
  try {
    await signOut(auth);

    popup("تم تسجيل الخروج بنجاح");
    
    window.localStorage.removeItem("user");
    window.location.href = "/src/pages/login.html";
  } catch (error) {
    console.error("Failed SignOut: ", error);
  }
}
