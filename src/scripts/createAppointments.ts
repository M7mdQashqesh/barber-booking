import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { generateTimeSlots } from "../services/generateTimeSlots.js";
import { getAppointments } from "../services/getAppointments.js";
import { checkAuthStatus } from "../services/checkAuthStatus.js";
import { logout } from "../services/logout.js";

getAppointments("create-appointments-area");

checkAuthStatus("createAppointments", "/src/pages/login.html");

const createAppointmentsForm = document.querySelector("form") as HTMLElement;

// Creating Opening and Closing Time and format it
createAppointmentsForm.addEventListener("submit", async (e) => {
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

  // Generate Time Slots depend on Opening and Closing Time
  generateTimeSlots(openingTime, closingTime);

  const timeInfo: [HTMLInputElement, HTMLInputElement] = [
    openingTimeInput,
    closingTimeInput,
  ];
  timeInfo.forEach((input) => (input.value = ""));

  getAppointments("create-appointments-area");
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


const logoutBtn = document.getElementById("logout") as HTMLElement;
logoutBtn?.addEventListener("click", logout);
