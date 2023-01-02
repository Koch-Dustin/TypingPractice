const textToWrite = document.getElementById("text-to-write");
const inpField = document.getElementById("input-of-text");
const tryAgainBtn = document.getElementById("try-again-button");
const gameFrame = document.getElementById("game");
const resultFrame = document.getElementById("scoreboard");
const wordCounter = document.getElementById("word-count");

let intervalId;
let timeSpentToFinish;
let charactersPerMinute;
let wordsPerMinuteWithoutMistakes;
let wordsPerMinuteWithMistakes;
let accuracy;
let timer;

let mistakes = 0;
let timeSpend = 0;
let charIndex = 0;
let isTyping = 0;
let gameHasEnded = false;
let firstCharacterTyped = false;
let blockinput = false;

function toggleGame() {
  if (gameHasEnded) {
    $(gameFrame).hide();
    $(resultFrame).show();
  } else {
    $(resultFrame).hide();
  }
  document.addEventListener("keydown", () => inpField.focus());
  textToWrite.addEventListener("click", () => inpField.focus());
}

async function generateWords() {
  await getWords();
  textToWrite.focus();

  clearInterval(intervalId);
  timeSpend = 0;
  firstCharacterTyped = false;

  $(wordCounter).hide();
  $(generateWordButton).hide();
}

async function getWords() {
  fetch(
    "https://random-word-api.herokuapp.com/word?number=" +
      document.getElementById("word-count").value
  )
    .then((res) => res.json())
    .then((data) => (output = data.toString().replaceAll(",", " ")))
    .then((output) => (textToWrite.innerHTML = output))
    .then(() => splitWords());
}

function splitWords() {
  let text = textToWrite.innerHTML;
  let myArray;
  textToWrite.innerHTML = "";
  myArray = text.split("");
  myArray.forEach((span) => {
    let spanTag = `<span class="letter">${span}</span>`;
    textToWrite.innerHTML += spanTag;
  });
}

function startTimer() {
  if (firstCharacterTyped == false) {
    firstCharacterTyped = true;
    intervalId = window.setInterval(function () {
      timeSpend++;
    }, 1000);
  }
}

function typing() {
  const characters = textToWrite.innerText;
  const typedCharactersNumber = document.getElementsByClassName("letter");
  const numberOfWrittenCharacters =
    document.getElementsByClassName("typed").length + 1;
  let typedChar = inpField.value.split("")[charIndex];
  const character = characters[charIndex];
  const list = typedCharactersNumber[charIndex].classList;
  const numberOfCorrectCharacters =
    document.getElementsByClassName("correct").length;

  startTimer();

  if (character == typedChar) {
    if (typedChar == " ") {
      list.add("correct");
      list.add("typed");
    }
    list.add("correct");
    list.add("typed");
  } else {
    list.add("incorrect");
    list.add("typed");
    mistakes = document.getElementsByClassName("incorrect").length;
  }

  charIndex++;
  if (numberOfWrittenCharacters == characters.length) {
    blockinput = true;
    timeSpentToFinish = timeSpend;
    timeSpentToFinishInMinutes = timeSpentToFinish / 60;
    charactersPerMinute = Math.round(
      (numberOfWrittenCharacters / timeSpend) * 60
    );
    wordsPerMinuteWithMistakes = Math.round(
      (typedCharactersNumber.length / 5 / timeSpentToFinish) * 60
    );
    wordsPerMinuteWithoutMistakes =
      Math.round((numberOfCorrectCharacters / 5 / timeSpentToFinish) * 60) + 1;
    accuracy = Math.round(
      (wordsPerMinuteWithoutMistakes / wordsPerMinuteWithMistakes) * 100
    );

    gameHasEnded = true;
    toggleGame();
    setLastPlay();

    clearInterval(intervalId);

    timeSpend = 0;
    firstCharacterTyped = false;
    return;
  }

  if (blockinput) {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
    });
  } else {
    document.removeEventListener("keydown", () => {});
  }
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 8) {
    e.preventDefault();
  }
});

toggleGame();
inpField.addEventListener("input", typing);

const today = new Date();
const date = today.getDate();

if (date != localStorage.getItem("date")) {
  localStorage.setItem("date", date);
  clearTodaysBest();
}
