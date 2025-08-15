import { firestore } from "../config/firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { renderSlots } from "./renderSlots.js";

export async function getAppointments(area: string) {
  try {
    const collRef = collection(firestore, "allAppointments");
    const snapshot = await getDocs(collRef);

    const allAppointmentsArea = document.querySelector(
      `.${area} ul`
    ) as HTMLElement;
    if (!allAppointmentsArea) return;

    if (snapshot.docs.length > 0) {
      allAppointmentsArea.textContent = "";
      snapshot.docs.forEach((doc: any) =>
        renderSlots(doc.data().timeSlots, area)
      );
    } else {
      allAppointmentsArea.textContent = "لم تنشئ مواعيد بعد";
    }
  } catch (error) {
    console.error(error);
  }
}
