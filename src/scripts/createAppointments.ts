import { popup } from "../components/popup.js";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { generateTimeSlots } from "../services/generateTimeSlots.js";
import { renderSlots } from "../services/renderSlots.js";

onAuthStateChanged(auth, (user: any) => {
  if (!user) window.location.href = "/src/pages/login.html";
  else document.body.classList.remove("hidden");
});

const createAppointmentsForm = document.querySelector("form") as HTMLElement;

createAppointmentsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const openingTimeInput = document.getElementById(
    "open-hour"
  ) as HTMLInputElement;
  let [openingTimeHour, openingTimeMinute, openingTimePeriod]: [
    number,
    number,
    string
  ] = [
    parseInt(openingTimeInput.value.slice(0, 2)),
    parseInt(openingTimeInput.value.slice(3, 5)),
    "",
  ];

  const openingTime = formatTime(
    openingTimeHour,
    openingTimeMinute,
    openingTimePeriod
  );

  const closingTimeInput = document.getElementById(
    "close-hour"
  ) as HTMLInputElement;
  let [closingTimeHour, closingTimeMinute, closingTimePeriod]: [
    number,
    number,
    string
  ] = [
    parseInt(closingTimeInput.value.slice(0, 2)),
    parseInt(closingTimeInput.value.slice(3, 5)),
    "",
  ];

  const closingTime = formatTime(
    closingTimeHour,
    closingTimeMinute,
    closingTimePeriod
  );

  const slots: string[] = generateTimeSlots(openingTime, closingTime);
  renderSlots(slots, "create-appointments-area");
});

function formatTime(timeHour: number, timeMinute: number, timePeriod: string) {
  if (timeHour > 12) {
    timeHour -= 12;
    timePeriod = "PM";
  } else if (timeHour === 0) {
    timeHour += 12;
    timePeriod = "AM";
  } else if (timeHour === 12) timePeriod = "PM";
  else timePeriod = "AM";

  return `${timeHour.toString().padStart(2, "0")}:${timeMinute
    .toString()
    .padStart(2, "0")}${timePeriod}`;
}
