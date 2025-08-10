import { popup } from "../components/popup.js";

const form = document.querySelector("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateLogin()) {
    // TODO: أضف هنا كود تسجيل الدخول باستخدام Firebase Auth
  }
});

function validateLogin(): boolean {
  const emailInput = document.querySelector(
    "input[type='email']"
  ) as HTMLInputElement | null;
  const passwordInput = document.querySelector(
    "input[type='password']"
  ) as HTMLInputElement | null;

  if (!emailInput || !passwordInput) {
    console.error("No Input Fields");
    return false;
  }

  if (emailInput.value.trim() === "") {
    popup("يرجى إدخال البريد الإلكتروني");
    emailInput.focus();
    return false;
  }

  if (passwordInput.value.trim() === "") {
    popup("يرجى إدخال كلمة المرور");
    passwordInput.focus();
    return false;
  }

  return true;
}
