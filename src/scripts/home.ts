import { popup } from "../components/popup.js";
import { auth } from "../config/firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { generateTimeSlots } from "../services/generateTimeSlots.js";
import { renderSlots } from "../services/renderSlots.js";

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

/* Test Open And Close Time and Render Slots */
const openingTime: string = "10:00AM";
const closingTime: string = "12:00PM";
const slots: string[] = generateTimeSlots(openingTime, closingTime);
renderSlots(slots, "appointments-area");
/* Test Open And Close Time and Render Slots */

/* Add Booking Appointments To Local Storage */
bookBtn?.addEventListener("click", saveAppointmentsToLocal);

function saveAppointmentsToLocal() {
  const sessionStored = window.sessionStorage.getItem("appointments");
  const savedAppointments = sessionStored ? JSON.parse(sessionStored) : [];
  window.localStorage.setItem(
    "appointments",
    JSON.stringify(savedAppointments)
  );
  if (bookBtn.textContent === "إلغاء الحجز") popup("تم الغاء حجز الموعد");
  else popup("تم حجز الموعد");

  window.sessionStorage.clear();
  checkBookBtnStatus();
}

export function checkBookBtnStatus(): void {
  if (
    JSON.parse(window.sessionStorage.getItem("appointments")!) === null ||
    (JSON.parse(window.sessionStorage.getItem("appointments")!).length === 0 &&
      JSON.parse(window.localStorage.getItem("appointments")!).length > 0)
  )
    bookBtn.classList.add("disable");

  if (
    JSON.parse(window.sessionStorage.getItem("appointments")!) ===
    JSON.parse(window.localStorage.getItem("appointments")!)
  ) {
    bookBtn.classList.add("disable");
  }
}
