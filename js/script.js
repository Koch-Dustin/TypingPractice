const typingText = document.getElementById("text-to-write"),
  inpField = document.getElementById("input-of-text"),
  tryAgainBtn = document.getElementById("try-again-button"),
  gameFrame = document.getElementById("game"),
  resultFrame = document.getElementById("scoreboard"),
  alltimeMistake = document.getElementById("alltime_mistakes"),
  alltimeWpm = document.getElementById("alltime_wpm"),
  alltimeCpm = document.getElementById("alltime_cpm"),
  alltimeTime = document.getElementById("alltime_time"),
  alltimeAcc = document.getElementById("alltime_acc"),
  todaysMistake = document.getElementById("today_mistakes"),
  todaysWpm = document.getElementById("today_wpm"),
  todaysCpm = document.getElementById("today_cpm"),
  todaysTime = document.getElementById("today_time"),
  todaysScore = document.getElementById("today_score"),
  todaysAcc = document.getElementById("today_acc"),
  lastMistake = document.getElementById("last_mistakes"),
  lastWpm = document.getElementById("last_wpm"),
  lastCpm = document.getElementById("last_cpm"),
  lastTime = document.getElementById("last_time"),
  lastScore = document.getElementById("last_score"),
  lastAcc = document.getElementById("last_acc"),
  wordCounter = document.getElementById("word-count"),
  generateWordButton = document.getElementById("generate-text-button");

var intervalId;
let timeSpendToFinish;
let charactersPerMinute;
let wordsPerMinuteWithoutMistakes;
let wordsPerMinuteWithMistakes;
let mistakes = 0;
let acc;

let timer;
let timeSpend = 0;
let charIndex = 0;
let isTyping = 0;
let gameHasended = false;
let firstCharacterTyped = false;

function toggleGame() {
  if (gameHasended) {
    gameFrame.style.display = "none";
    resultFrame.style.display = "block";
  } else {
    resultFrame.style.display = "none";
  }
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

async function generateWords() {
  await getWords();
  typingText.focus();

  clearInterval(intervalId);
  timeSpend = 0;
  firstCharacterTyped = false;

  wordCounter.style.display = "none";
  generateWordButton.style.display = "none";
}

async function getWords() {
  fetch(
    "https://random-word-api.herokuapp.com/word?number=" +
      document.getElementById("word-count").value
  )
    .then((res) => res.json())
    .then((data) => (output = data.toString().replaceAll(",", " ")))
    .then((output) => (typingText.innerHTML = output))
    .then(() => splitWords());
}

function splitWords() {
  let text = typingText.innerHTML;
  let myArray;
  typingText.innerHTML = "";
  myArray = text.split("");
  myArray.forEach((span) => {
    let spanTag = `<span class="test">${span}</span>`;
    typingText.innerHTML += spanTag;
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
  const characters = typingText.innerText;
  const typedCharactersNumber = document.getElementsByClassName("test");
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
      list.remove("active");
      list.add("correct");
      list.add("typed");
    }
    list.remove("active");
    list.add("correct");
    list.add("typed");
  } else {
    list.remove("active");
    list.add("incorrect");
    list.add("typed");
    mistakes++;
  }

  charIndex++;
  if (numberOfWrittenCharacters == characters.length) {
    timeSpendToFinish = timeSpend;
    timeSpendToFinishInMinutes = timeSpendToFinish / 60;
    charactersPerMinute = Math.round(
      (numberOfWrittenCharacters / timeSpend) * 60
    );
    wordsPerMinuteWithMistakes = Math.round(
      (typedCharactersNumber.length / 5 / timeSpendToFinish) * 60
    );
    wordsPerMinuteWithoutMistakes =
      Math.round((numberOfCorrectCharacters / 5 / timeSpendToFinish) * 60) + 1;
    acc = Math.round(
      (wordsPerMinuteWithoutMistakes / wordsPerMinuteWithMistakes) * 100
    );

    document.addEventListener("keydown", (e) => {
      e.preventDefault();
    });

    gameHasended = true;
    toggleGame();
    setLastPlay();

    clearInterval(intervalId);

    timeSpend = 0;
    firstCharacterTyped = false;
  }
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 8) {
    e.preventDefault();
  }
});

toggleGame();
tryAgainBtn.addEventListener("click", refreshPage);
inpField.addEventListener("input", typing);

function setUpScores() {
  if (localStorage.getItem("todaysBestWpm" == null)) {
    localStorage.setItem("todaysBestWpm", 0);
    localStorage.setItem("todaysBestCpm", 0);
    localStorage.setItem("todaysBestAcc", 0);
    localStorage.setItem("todaysBestMistakes", 0);
    localStorage.setItem("todaysBestScore", 0);
  }

  if (localStorage.getItem("alltimeBestWpm" == null)) {
    localStorage.setItem("alltimeBestWpm", 0);
    localStorage.setItem("alltimeBestCpm", 0);
    localStorage.setItem("alltimeBestAcc", 0);
    localStorage.setItem("alltimeBestMistakes", 0);
    localStorage.setItem("alltimeBestScore", 0);
  }
}

function setLastPlay() {
  score = Math.round(wordsPerMinuteWithoutMistakes + acc);

  lastPlayIsBetterThanTodaysBest = score > getScore("todaysBestScore");
  if (lastPlayIsBetterThanTodaysBest) {
    localStorage.setItem("todaysBestWpm", wordsPerMinuteWithoutMistakes);
    todaysWpm.innerText = getScore("todaysBestWpm");

    localStorage.setItem("todaysBestCpm", charactersPerMinute);
    todaysCpm.innerText = getScore("todaysBestCpm");

    localStorage.setItem("todaysBestAcc", acc);
    todaysAcc.innerText = getScore("todaysBestAcc") + "%";

    localStorage.setItem("todaysBestMistakes", mistakes);
    todaysMistake.innerText = getScore("todaysBestMistakes");

    localStorage.setItem("todaysBestTime", timeSpendToFinish);
    todaysTime.innerText = getScore("todaysBestTime");

    localStorage.setItem("todaysBestScore", score);
  }

  lastPlayIsBetterThanAlltimesBest = score > getScore("alltimeBestScore");
  if (lastPlayIsBetterThanAlltimesBest) {
    localStorage.setItem("alltimeBestWpm", wordsPerMinuteWithoutMistakes);
    alltimeWpm.innerText = getScore("alltimeBestWpm");

    localStorage.setItem("alltimeBestCpm", charactersPerMinute);
    alltimeCpm.innerText = getScore("alltimeBestCpm");

    localStorage.setItem("alltimeBestAcc", acc);
    alltimeAcc.innerText = getScore("alltimeBestAcc") + "%";

    localStorage.setItem("alltimeBestMistakes", mistakes);
    alltimeMistake.innerText = getScore("alltimeBestMistakes");

    localStorage.setItem("allTimeBestTime", timeSpendToFinish);
    alltimeTime.innerText = getScore("allTimeBestTime");

    localStorage.setItem("alltimeBestScore", score);
  }

  lastMistake.innerText = mistakes;
  lastCpm.innerText = charactersPerMinute;
  lastWpm.innerText = wordsPerMinuteWithoutMistakes;
  lastAcc.innerText = acc + "%";
  lastTime.innerText = timeSpendToFinish;
}

function getScore(typeOfBestScore) {
  return localStorage.getItem(typeOfBestScore);
}

function loadStats() {
  alltimeWpm.innerText = getScore("alltimeBestWpm");
  alltimeCpm.innerText = getScore("alltimeBestCpm");
  alltimeAcc.innerText = getScore("alltimeBestAcc") + "%";
  alltimeMistake.innerText = getScore("alltimeBestMistakes");
  alltimeTime.innerText = getScore("allTimeBestTime");

  todaysWpm.innerText = getScore("todaysBestWpm");
  todaysCpm.innerText = getScore("todaysBestCpm");
  todaysAcc.innerText = getScore("todaysBestAcc") + "%";
  todaysMistake.innerText = getScore("todaysBestMistakes");
  todaysTime.innerText = getScore("todaysBestTime");
}

function clearTodaysBest() {
  localStorage.setItem("todaysBestWpm", 0);
  localStorage.setItem("todaysBestCpm", 0);
  localStorage.setItem("todaysBestAcc", 0);
  localStorage.setItem("todaysBestMistakes", 0);
  localStorage.setItem("todaysBestScore", 0);
  localStorage.setItem("todaysBestTime", 0);

  todaysWpm.innerText = getScore("todaysBestWpm");
  todaysCpm.innerText = getScore("todaysBestCpm");
  todaysAcc.innerText = getScore("todaysBestAcc") + "%";
  todaysMistake.innerText = getScore("todaysBestMistakes");
  todaysTime.innerText = getScore("todaysBestTime");
}

function clearAlltimeBest() {
  localStorage.setItem("alltimeBestWpm", 0);
  localStorage.setItem("alltimeBestCpm", 0);
  localStorage.setItem("alltimeBestAcc", 0);
  localStorage.setItem("alltimeBestMistakes", 0);
  localStorage.setItem("alltimeBestScore", 0);
  localStorage.setItem("allTimeBestTime", 0);

  alltimeWpm.innerText = getScore("alltimeBestWpm");
  alltimeCpm.innerText = getScore("alltimeBestCpm");
  alltimeAcc.innerText = getScore("alltimeBestAcc") + "%";
  alltimeMistake.innerText = getScore("alltimeBestMistakes");
  alltimeTime.innerText = getScore("allTimeBestTime");
}

const today = new Date();
const date = today.getDate();

if (date != localStorage.getItem("date")) {
  localStorage.setItem("date", date);
  clearTodaysBest();
}

function refreshPage() {
  location.reload();
}

setUpScores();
loadStats();
