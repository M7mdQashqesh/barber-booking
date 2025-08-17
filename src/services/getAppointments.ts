import { firestore } from "../config/firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { renderSlots } from "./renderSlots.js";
import { bookBtn } from "../scripts/home.js";

let appointments: string[] = [];
export async function getAppointments(area: string) {
  let loader = document.getElementById("loader") as HTMLElement;
  try {
    if (loader) loader.classList.remove("hidden");
    bookBtn?.classList.add("hidden");
    const collRef = collection(firestore, "allAppointments");
    const snapshot = await getDocs(collRef);

    const appointmentsArea = document.querySelector(
      `.${area} ul`
    ) as HTMLElement;
    if (!appointmentsArea) return;

    if (snapshot.docs.length > 0) {
      appointmentsArea.textContent = "";
      snapshot.docs.forEach((doc: any) => {
        renderSlots(doc.data(), area);
        appointments.push(doc.data().slot);
      });
      bookBtn?.classList.remove("hidden");
    } else {
      appointmentsArea.textContent = "لم تنشئ مواعيد بعد";
    }
    if (loader) loader.classList.add("hidden");
  } catch (error) {
    console.error(error);
  }
  return appointments;
}
