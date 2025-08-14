const searchDiv = document.getElementById("search");

searchDiv?.addEventListener("click", function () {
  const searchInput = document.querySelector(
    "input[type='search']"
  ) as HTMLInputElement;
  searchInput.focus();
});
