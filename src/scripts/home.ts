import { popup } from "../components/popup.js";

window.localStorage.setItem(
  "appointments",
  window.localStorage.getItem("appointments")! || "[]"
);

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
const bookBtn = document.getElementById("book-appointments") as HTMLElement;

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
const openingTime: string = "10:00am";
const closingTime: string = "12:00pm";
const slots: string[] = generateTimeSlots(openingTime, closingTime);
renderSlots(slots);
/* Test Open And Close Time and Render Slots */

/* Function To Generate Time Slots */
function generateTimeSlots(startTime: string, endTime: string): string[] {
  const timeSlots: string[] = [];
  let hour: number = parseInt(startTime.slice(0, 2));
  let minute: number = parseInt(startTime.slice(3, 5));
  let period: string = startTime.slice(5);

  let timeSlot: string = "";

  while (timeSlot.slice(0, 7) !== endTime) {
    if (minute === 0) {
      timeSlot = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}${period} - ${hour
        .toString()
        .padStart(2, "0")}:30${period}`;
      minute = 30;
    } else if (minute === 30) {
      let nextHour: number = hour + 1;
      let nextPeriod: string = period;
      if (nextHour === 12) nextPeriod = period === "am" ? "pm" : "am";
      if (nextHour > 12) nextHour -= 12;
      timeSlot = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}${period} - ${nextHour
        .toString()
        .padStart(2, "0")}:00${nextPeriod}`;

      minute = 0;
      hour = nextHour;
      period = nextPeriod;
    }
    timeSlots.push(timeSlot);
  }
  return timeSlots;
}

/* Function To Render Time Slots */
function renderSlots(slots: string[]): void {
  const appointmentsArea = document.querySelector(
    ".appointments-area ul"
  ) as HTMLElement;
  if (!appointmentsArea) return;
  const localSlots = window.localStorage.getItem("appointments");
  let selectedAppointments: string[] = localSlots ? JSON.parse(localSlots) : [];

  for (let i: number = 0; i < slots.length - 1; i++) {
    const li = document.createElement("li") as HTMLElement;
    li.textContent = slots[i] ?? "";
    if (selectedAppointments.includes(li.textContent))
      li.classList.add("select");
    if (selectedAppointments.length === 0) bookBtn.classList.add("disable");
    checkBookBtnStatus();

    li.addEventListener("click", function () {
      if (!li.classList.contains("select")) {
        li.classList.add("select");
        selectedAppointments.push(li.textContent ?? "");
      } else {
        li.classList.remove("select");
        selectedAppointments = selectedAppointments.filter(
          (item) => item !== li.textContent
        );
      }
      window.sessionStorage.setItem(
        "appointments",
        JSON.stringify(selectedAppointments)
      );
      if (selectedAppointments.length !== 0) {
        bookBtn.classList.remove("disable");
        bookBtn.textContent = "إحجز الموعد";
      } else if (
        selectedAppointments.length === 0 &&
        JSON.parse(window.localStorage.getItem("appointments")!).length !== 0
      ) {
        bookBtn.textContent = "إلغاء الحجز";
        bookBtn.classList.remove("disable");
      }
    });
    appointmentsArea.appendChild(li);
  }
}

/* Add Booking Appointments To Local Storage */
bookBtn.addEventListener("click", saveAppointmentsToLocal);

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

function checkBookBtnStatus(): void {
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
