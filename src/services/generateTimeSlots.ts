import { popup } from "../components/popup.js";

export function generateTimeSlots(
  openingTime: string,
  closingTime: string
): string[] {
  if (!openingTime || !closingTime)
    popup("يجب ادخال وقت فتح المحل ووقت اغلاق المحل");

  const timeSlots: string[] = [];

  let timeSlot: string = "";
  let hour: number = parseInt(openingTime.slice(0, 2));
  let minute: number = parseInt(openingTime.slice(3, 5));
  let period: string = openingTime.slice(5);

  while (timeSlot.slice(0, 7) !== closingTime) {
    if (minute === 0) {
      timeSlot = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}${period} - ${hour
        .toString()
        .padStart(2, "0")}:30${period}`;
      minute = 30;
    } else if (minute === 30) {
      let nextHour: number = hour + 1;
      let nextPeriod: string = period;
      if (nextHour === 12) nextPeriod = period === "AM" ? "PM" : "AM";
      if (nextHour > 12) nextHour -= 12;
      timeSlot = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}${period} - ${nextHour
        .toString()
        .padStart(2, "0")}:00${nextPeriod}`;

      minute = 0;
      hour = nextHour;
      period = nextPeriod;
    }
    timeSlots.push(timeSlot);
  }

  return timeSlots;
}
