import { checkAuthStatus } from "../services/checkAuthStatus.js";
import { logout } from "../services/logout.js";
const searchDiv = document.getElementById("search");

checkAuthStatus("appointments", "/src/pages/login.html");

searchDiv?.addEventListener("click", function () {
  const searchInput = document.querySelector(
    "input[type='search']"
  ) as HTMLInputElement;
  searchInput.focus();
});

const logoutBtn = document.getElementById("logout") as HTMLElement;
logoutBtn?.addEventListener("click", logout);
