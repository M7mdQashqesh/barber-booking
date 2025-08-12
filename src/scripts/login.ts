import { popup } from "../components/popup.js";

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
