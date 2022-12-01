const deleteToday = docuemnt.getElementById("delete-todays-play");
const deleteAlltime = document.getElementById("delete-alltime-play");
const playAgainButton = document.getElementById("play-game-again");

deleteToday.addEventListener("click", (e) => {
  clearTodaysBest();
});

deleteAlltime.addEventListener("click", (e) => {
  clearAlltimeBest();
});

playAgainButton.addEventListener("click", () => {
  location.reload();
});
