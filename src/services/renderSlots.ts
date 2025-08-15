import { bookBtn, checkBookBtnStatus } from "../scripts/home.js";

export function renderSlots(slots: string[], area: string): void {
  if (area === "appointments-area") {
    const appointmentsArea = document.querySelector(
      `.${area} ul`
    ) as HTMLElement;
    if (!appointmentsArea) return;
    const localSlots = window.localStorage.getItem("appointments");
    let selectedAppointments: string[] = localSlots
      ? JSON.parse(localSlots)
      : [];

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
  } else if (area === "create-appointments-area") {
    const appointmentsArea = document.querySelector(
      `.${area} ul`
    ) as HTMLElement;
    if (!appointmentsArea) return;

    for (let i: number = 0; i < slots.length - 1; i++) {
      const li = document.createElement("li") as HTMLElement;
      li.textContent = slots[i] ?? "";
      appointmentsArea.appendChild(li);
    }
  }
}
