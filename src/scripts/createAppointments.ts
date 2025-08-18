import { generateTimeSlots } from "../services/generateTimeSlots.js";
import { getAppointments } from "../services/getAppointments.js";
import { checkAuthStatus } from "../services/checkAuthStatus.js";
import { logout } from "../services/logout.js";
import { popup } from "../components/popup.js";

getAppointments(".create-appointments-area ul");

checkAuthStatus("createAppointments", "/src/pages/login.html");

const createAppointmentsForm = document.querySelector("form") as HTMLElement;

// Creating Opening and Closing Time and format it
createAppointmentsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let [nowTimeHour, nowTimeMinute, nowTimePeriod]: [number, number, string] = [
    new Date().getHours(),
    new Date().getMinutes(),
    "",
  ];

  const nowTime = formatTime(nowTimeHour, nowTimeMinute, nowTimePeriod);

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

  if (openingTimeMinute === 0 || openingTimeMinute === 30) {
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

    if (
      (nowTime.slice(5) === openingTime.slice(5) &&
        nowTime.slice(0, 2) < openingTime.slice(0, 2) &&
        nowTime.slice(3, 5) > openingTime.slice(3, 5)) ||
      (nowTime.slice(0, 2) === openingTime.slice(0, 2) &&
        nowTime.slice(3, 5) < openingTime.slice(3, 5))
    ) {
      // Generate Time Slots depend on Opening and Closing Time
      await generateTimeSlots(openingTime, closingTime);

      const timeInfo: [HTMLInputElement, HTMLInputElement] = [
        openingTimeInput,
        closingTimeInput,
      ];
      timeInfo.forEach((input) => (input.value = ""));

      getAppointments(".create-appointments-area ul");
      window.location.reload();
    } else popup("يجب ان يكون التوقيت في المستقبل");
  } else popup("الدقائق يجب ان تكون اما 00 او 30");
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
