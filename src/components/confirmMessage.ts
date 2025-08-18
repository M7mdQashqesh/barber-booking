import { firestore } from "../config/firebase.js";
import {
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { popup } from "./popup.js";

export function confirmMessage(timeSlot: string): void {
  const backMsgDiv = document.createElement("div") as HTMLElement;
  backMsgDiv.style.cssText =
    "position: fixed; top:0; bottom:0; left:0; right:0; background-color: #00000080; backdrop-filter: blur(2px); z-index:9999;";

  const msgDiv = document.createElement("div") as HTMLElement;
  msgDiv.style.cssText =
    "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); padding: 20px; border:1px solid gray; border-radius:8px; background-color: white; min-width: 250px; text-align:center;";

  const message = document.createElement("p") as HTMLElement;
  message.textContent = `هل انت متأكد من إزالة الموعد ${timeSlot} ؟`;

  const btns = document.createElement("div");
  btns.style.cssText =
    "display: flex; justify-content:center; gap: 20px; margin-top: 20px";

  const closeBtn = document.createElement("button") as HTMLButtonElement;
  closeBtn.textContent = "إغلاق";
  closeBtn.style.cssText =
    "padding: 5px 15px; background-color: #ddd; border:none; border-radius:5px; cursor:pointer;";

  const confirmBtn = document.createElement("button") as HTMLButtonElement;
  confirmBtn.textContent = "حذف";
  confirmBtn.style.cssText =
    "padding: 5px 15px; background-color: #d9534f; color:white; border:none; border-radius:5px; cursor:pointer;";

  closeBtn.onclick = () => {
    document.body.removeChild(backMsgDiv);
  };

  confirmBtn.onclick = async () => {
    await deleteDoc(doc(firestore, "allAppointments", timeSlot));
    popup("تم حذف الموعد بنجاح");
    document.body.removeChild(backMsgDiv);
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  backMsgDiv.appendChild(msgDiv);
  msgDiv.appendChild(message);
  btns.appendChild(closeBtn);
  btns.appendChild(confirmBtn);
  msgDiv.appendChild(btns);
  document.body.appendChild(backMsgDiv);
}
