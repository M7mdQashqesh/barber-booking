import { popup } from "../components/popup.js";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { loginAccount } from "../services/loginAccount.js";

onAuthStateChanged(auth, (user: any) => {
  if (user && window.localStorage.getItem("user"))
    window.location.href = "../../index.html";
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

  loginAccount(emailInput!, passwordInput!);
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
