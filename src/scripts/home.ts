import { popup } from "../components/popup.js";
import { app, auth } from "../config/firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getAppointments } from "../services/getAppointments.js";
import { bookAppointments } from "../services/bookAppointments.js";

onAuthStateChanged(auth, (user: any) => {
  if (!user) window.location.href = "/src/pages/login.html";
  else document.body.classList.remove("hidden");
});

const dashboardBtn = document.getElementById(
  "dashboard-btn"
) as HTMLButtonElement | null;

const userLocal = window.localStorage.getItem("user");
const role = userLocal ? JSON.parse(userLocal).uid.slice(-5) : "";

if (role !== "admin") dashboardBtn?.remove();

dashboardBtn?.addEventListener("click", function () {
  window.location.href = "/src/pages/dashboard/appointments.html";
});

const logoutBtn = document.getElementById(
  "logout-btn"
) as HTMLButtonElement | null;

logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);

    popup("تم تسجيل الخروج بنجاح");
    window.localStorage.removeItem("user");

    setTimeout(() => {
      window.location.href = "/src/pages/login.html";
    }, 1500);
  } catch (error) {
    console.error("Failed SignOut: ", error);
  }
});

const days: string[] = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const now = new Date();
export const bookBtn = document.getElementById(
  "book-appointments"
) as HTMLElement;

const appointments = await getAppointments("appointments-area");

bookBtn.addEventListener("click", () => {
  bookAppointments(appointments);
});

/* Date & Day Rendering */
const todayIndex: number = now.getDay();
const dayField = document.getElementById("day") as HTMLElement;
if (dayField && days[todayIndex]) dayField.textContent = days[todayIndex];

const [day, month, year] = [
  now.getDate(),
  now.getMonth() + 1,
  now.getFullYear(),
];
const dateField = document.getElementById("date") as HTMLElement;
if (dateField) dateField.textContent = `${day}/${month}/${year}`;
