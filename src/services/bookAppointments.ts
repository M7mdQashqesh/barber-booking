import { popup } from "../components/popup.js";
import { app, firestore } from "../config/firebase.js";
import {
  doc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { bookBtn } from "../scripts/home.js";

export async function bookAppointments(appointments: any) {
  const sessionSelectedAppointments = window.sessionStorage.getItem(
    "sessionSelectedAppointments"
  );
  const selectedAppointments = sessionSelectedAppointments
    ? JSON.parse(sessionSelectedAppointments)
    : [];

  const sessionUnSelectedAppointments = window.sessionStorage.getItem(
    "sessionUnSelectedAppointments"
  );
  const unSelectedAppointments = sessionUnSelectedAppointments
    ? JSON.parse(sessionUnSelectedAppointments)
    : [];

  try {
    for (let i = 0; i < appointments.length; i++) {
      for (const appointment of selectedAppointments) {
        if (appointment === appointments[i]) {
          const useRef = doc(firestore, "allAppointments", appointments[i]);
          await updateDoc(useRef, {
            status: "Booked",
            fullname: JSON.parse(window.localStorage.getItem("user")!).fullname,
          });
        }
      }
    }
    if (selectedAppointments.length > 0) {
      popup("تم حجز الموعد");
      setTimeout(() => {
        window.location.reload();
      }, 600);
    }

    for (let i = 0; i < appointments.length; i++) {
      for (const appointment of unSelectedAppointments) {
        if (appointment === appointments[i]) {
          const useRef = doc(firestore, "allAppointments", appointments[i]);
          await updateDoc(useRef, {
            status: "available",
            fullname: null,
          });
        }
      }
    }
    if (unSelectedAppointments.length > 0) {
      popup("تم إلغاء الموعد");
      bookBtn.textContent = "إحجز الموعد";
      setTimeout(() => {
        window.location.reload();
      }, 600);
    }

    if (
      selectedAppointments.length === 0 &&
      unSelectedAppointments.length === 0
    )
      popup("يرجى اختيار الموعد لحجزه او الغاء حجزه");

    window.sessionStorage.clear();
  } catch (error) {
    console.error(error);
  }
}
