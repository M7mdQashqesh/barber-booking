import { checkAuthStatus } from "../services/checkAuthStatus.js";
import { getAppointments } from "../services/getAppointments.js";
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

getAppointments(".appointments-table table");

const menuBtn = document.querySelector(".fa-bars") as HTMLElement;
menuBtn.addEventListener("click", function () {
  const sideMenu = document.querySelector(".side-menu") as HTMLElement;
  if (sideMenu.classList.contains("show")) {
    sideMenu.classList.remove("show");
    sideMenu.classList.add("hide");
  } else {
    sideMenu.classList.remove("hide");
    sideMenu.classList.add("show");
  }
});

document.addEventListener("click", function (e) {
  const element: any = e.target;
  if (!element?.classList.contains("fa-bars")) {
    const sideMenu = document.querySelector(".side-menu") as HTMLElement;
    if (sideMenu.classList.contains("show")) {
      sideMenu.classList.remove("show");
      sideMenu.classList.add("hide");
    }
  }
});
