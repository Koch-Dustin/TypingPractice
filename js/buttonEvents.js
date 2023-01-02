const deleteTodayButton = document.getElementById("delete-todays-play");
const deleteAlltimeButton = document.getElementById("delete-alltimes-play");
const playAgainButton = document.getElementById("play-game-again");

deleteTodayButton.addEventListener("click", () => {
  clearTodaysBest();
});

deleteAlltimeButton.addEventListener("click", () => {
  clearAlltimeBest();
});

playAgainButton.addEventListener("click", () => {
  restartGame();
});

tryAgainBtn.addEventListener("click", () => {
  restartGame();
});

function restartGame() {
  $(gameFrame).show();
  $(resultFrame).hide();

  $(wordCounter).show();
  $(generateWordButton).show();

  timeSpend = 0;
  textToWrite.innerHTML = "";
  inpField.value = "";
  firstCharacterTyped = false;
  charIndex = 0;
  isTyping = 0;
  gameHasEnded = false;
  blockinput = false;

  clearInterval(intervalId);
  toggleGame();
}
