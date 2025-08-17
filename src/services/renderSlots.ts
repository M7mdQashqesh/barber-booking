import { bookBtn } from "../scripts/home.js";

let selectedLi: string[] = [];
let unSelectedLi: string[] = [];
let bookedTime: string[] = [];
export function renderSlots(slots: any, area: string): void {
  if (
    area === "appointments-area" &&
    (slots.status === "available" ||
      slots.userId === JSON.parse(window.localStorage.getItem("user")!).uid)
  ) {
    const appointmentsArea = document.querySelector(
      `.${area} ul`
    ) as HTMLElement;
    if (!appointmentsArea) return;

    const li = document.createElement("li") as HTMLElement;
    li.textContent = slots.slot ?? "";
    if (slots.status === "Booked") {
      li.classList.add("select");
      bookedTime.push(slots.slot);
    }

    appointmentsArea.appendChild(li);

    li.addEventListener("click", function () {
      if (!li.classList.contains("select")) {
        li.classList.add("select");
        selectedLi.push(li.textContent);
        unSelectedLi = unSelectedLi.filter((item) => item !== li.textContent);
      } else {
        li.classList.remove("select");
        unSelectedLi.push(li.textContent);
        selectedLi = selectedLi.filter((item) => item !== li.textContent);
      }
      if (bookedTime.includes(li.textContent))
        bookBtn.textContent = "إلغاء الحجز";
      else bookBtn.textContent = "إحجز الموعد";

      window.sessionStorage.setItem(
        "sessionSelectedAppointments",
        JSON.stringify(selectedLi)
      );
      window.sessionStorage.setItem(
        "sessionUnSelectedAppointments",
        JSON.stringify(unSelectedLi)
      );
    });
  } else if (
    area === "create-appointments-area" &&
    slots.status === "available"
  ) {
    const appointmentsArea = document.querySelector(
      `.${area} ul`
    ) as HTMLElement;
    if (!appointmentsArea) return;

    const li = document.createElement("li") as HTMLElement;
    li.textContent = slots.slot ?? "";
    appointmentsArea.appendChild(li);
  }
}
