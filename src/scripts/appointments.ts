import { auth } from "../config/firebase.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const searchDiv = document.getElementById("search");

onAuthStateChanged(auth, (user: any) => {
  if (!user) window.location.href = "/src/pages/login.html";
  else document.body.classList.remove("hidden");
});

searchDiv?.addEventListener("click", function () {
  const searchInput = document.querySelector(
    "input[type='search']"
  ) as HTMLInputElement;
  searchInput.focus();
});

const logoutBtn = document.getElementById("logout") as HTMLElement | null;
logoutBtn?.addEventListener("click", async function () {
  await signOut(auth);
  window.localStorage.removeItem("user");
  window.location.href = "/src/pages/login.html";
});
