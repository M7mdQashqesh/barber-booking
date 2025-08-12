import { popup } from "../components/popup.js";

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

googleBtn?.addEventListener("click", async () => {});
