import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firestore } from "../config/firebase.js";

export async function getCollectionSize() {
  try {
    const collRef = collection(firestore, "users");
    const snapshot = await getDocs(collRef);

    return snapshot.size;
  } catch (error) {
    console.error(error);
  }
}
