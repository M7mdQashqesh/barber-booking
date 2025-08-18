import { firestore } from "../config/firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { renderSlots } from "./renderSlots.js";
import { bookBtn } from "../scripts/home.js";

export async function getAppointments(area: string) {
  let appointments: string[] = [];
  const loader = document.getElementById("loader") as HTMLElement;
  if (loader) loader.classList.remove("hidden");

  const appointmentsArea = document.querySelector(area) as HTMLElement;
  if (!appointmentsArea) return;

  if (area === ".appointments-area ul") {
    bookBtn?.classList.add("hidden");
    try {
      const collRef = collection(firestore, "allAppointments");
      const snapshot = await getDocs(collRef);
      snapshot.docs.forEach((doc: any) => {
        if (
          doc.data().status === "available" ||
          doc.data().userId ===
            JSON.parse(window.localStorage.getItem("user")!).uid
        ) {
          renderSlots(doc.data(), area);
          appointments.push(doc.data().slot);
        }
      });
      bookBtn?.classList.remove("hidden");

      if (appointments.length === 0 && snapshot.docs.length > 0) {
        appointmentsArea.textContent = "لا يوجد مواعيد متاحة";
        bookBtn?.classList.add("hidden");
      } else if (snapshot.docs.length === 0) {
        appointmentsArea.textContent = "لم يتم إنشاء المواعيد بعد";
        bookBtn?.classList.add("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  } else if (area === ".appointments-table table") {
    try {
      const collRef = collection(firestore, "allAppointments");
      const snapshot = await getDocs(collRef);
      snapshot.docs.forEach((doc: any) => {
        if (doc.data().status === "Booked") {
          renderSlots(doc.data(), area);
          appointments.push(doc.data().slot);
        }
      });
      if (appointments.length === 0 && snapshot.docs.length > 0) {
        appointmentsArea.textContent = "لم يحجز أحد بعد";
        bookBtn?.classList.add("hidden");
      } else if (snapshot.docs.length === 0) {
        appointmentsArea.textContent = "لم يتم إنشاء المواعيد بعد";
        bookBtn?.classList.add("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  } else if (area === ".create-appointments-area ul") {
    try {
      const collRef = collection(firestore, "allAppointments");
      const snapshot = await getDocs(collRef);
      snapshot.docs.forEach((doc: any) => {
        if (doc.data().status === "available") {
          renderSlots(doc.data(), area);
          appointments.push(doc.data().slot);
        }
      });

      if (appointments.length === 0 && snapshot.docs.length > 0) {
        appointmentsArea.textContent = "لا يوجد مواعيد متاحة";
        bookBtn?.classList.add("hidden");
      } else if (snapshot.docs.length === 0) {
        appointmentsArea.textContent = "لم يتم إنشاء المواعيد بعد";
        bookBtn?.classList.add("hidden");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loader) loader.classList.add("hidden");

  return appointments;
}
