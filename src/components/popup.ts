export function popup(message: string): void {
  const popupDiv = document.createElement("div");
  popupDiv.className = "popup";
  popupDiv.textContent = message;
  document.body.appendChild(popupDiv);

  setTimeout(function () {
    popupDiv.remove();
  }, 3000);
}
