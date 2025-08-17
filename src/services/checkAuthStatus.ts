import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { auth } from "../config/firebase.js";

export function checkAuthStatus(source: string, href: string) {
  onAuthStateChanged(auth, (user: any) => {
    if (source === "login" || source === "signup") {
      if (user && window.localStorage.getItem("user"))
        window.location.href = href;
      else document.body.classList.remove("hidden");
    } else {
      if (!user || !window.localStorage.getItem("user"))
        window.location.href = href;
      else document.body.classList.remove("hidden");
    }
  });
}
