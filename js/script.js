const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".game-box .input-field"),
  tryAgainBtn = document.querySelector(".credits-retry button"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  gameFrame = document.querySelector("#game"),
  resultFrame = document.querySelector("#scoreboard"),
  alltimeMistake = document.querySelector("#alltime_mistakes"),
  alltimeWpm = document.querySelector("#alltime_wpm"),
  alltimeCpm = document.querySelector("#alltime_cpm"),
  alltimeTime = document.querySelector("#alltime_time"),
  alltimeAcc = document.querySelector("#alltime_acc"),
  todaysMistake = document.querySelector("#today_mistakes"),
  todaysWpm = document.querySelector("#today_wpm"),
  todaysCpm = document.querySelector("#today_cpm"),
  todaysTime = document.querySelector("#today_time"),
  todaysScore = document.querySelector("#today_score"),
  todaysAcc = document.querySelector("#today_acc"),
  lastMistake = document.querySelector("#last_mistakes"),
  lastWpm = document.querySelector("#last_wpm"),
  lastCpm = document.querySelector("#last_cpm"),
  lastTime = document.querySelector("#last_time"),
  lastScore = document.querySelector("#last_score"),
  lastAcc = document.querySelector("#last_acc"),
  deleteToday = document.querySelector(".delete-today"),
  deleteAlltime = document.querySelector(".delete-alltime"),
  playAgainButton = document.querySelector(".play-again");
  wordCounter = document.querySelector(".word-count")
  generateWordButton = document.querySelector(".generate-text-button")

var intervalId;
let TimeSpendToFinish;
let cpm;
let netwpm;
let groswpm;
let mistakes;
let acc;

let timer,
  timeSpend = 0;
charIndex = mistakes = isTyping = 0;
gamehasended = false;
firstCharacterTyped = false;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

deleteToday.addEventListener("click", (e) => {
  clearTodaysBest();
});

deleteAlltime.addEventListener("click", (e) => {
  clearAlltimeBest();
});

playAgainButton.addEventListener("click", () => {
  location.reload();
});

function toggleGame() {
  if (gamehasended) {
    print;
    gameFrame.style.display = "none";
    resultFrame.style.display = "block";
  } else {
    resultFrame.style.display = "none";
  }
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

async function generateWords() {
  fetch(
    "https://random-word-api.herokuapp.com/word?number=" +
      document.getElementById("word-count").value
  )
    .then((res) => res.json())
    .then((data) => (output = data.toString().replaceAll(",", " ")))
    .then((output) => (typingText.innerHTML = output))
    .then(() => splitWords());
  typingText.focus();

  clearInterval(intervalId);
  timeSpend = 0;
  firstCharacterTyped = false;

  wordCounter.style.display = "none"
  generateWordButton.style.display = "none"
}

let myArray;

function splitWords() {
  let text = typingText.innerHTML;
  typingText.innerHTML = "";
  myArray = text.split("");
  myArray.forEach((span) => {
    let spanTag = `<span class="test">${span}</span>`;
    typingText.innerHTML += spanTag;
  });
}

function Typing() {
  const characters = typingText.innerText;
  const typedCharactersNumber = document.getElementsByClassName("test");
  const numberOfWritenCharacters =
    document.getElementsByClassName("typed").length;
  let typedChar = inpField.value.split("")[charIndex];
  const character = characters[charIndex];
  const list = typedCharactersNumber[charIndex].classList;
  const numberOfCorrectCharacters =
    document.getElementsByClassName("correct").length;

  if (firstCharacterTyped == false) {
    firstCharacterTyped = true;
    intervalId = window.setInterval(function () {
      timeSpend++;
    }, 1000);
  }

  if (character === typedChar) {
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
  if (numberOfWritenCharacters + 1 == characters.length) {
    TimeSpendToFinish = timeSpend;
    TimeSpendToFinishInMinutes = TimeSpendToFinish / 60;
    cpm = Math.round((numberOfWritenCharacters / timeSpend) * 60);
    groswpm = Math.round(
      (typedCharactersNumber.length / 5 / TimeSpendToFinish) * 60
    );
    netwpm =
      Math.round((numberOfCorrectCharacters / 5 / TimeSpendToFinish) * 60) + 1;
    acc = Math.round((netwpm / groswpm) * 100);
    console.log("GrossWpm: " + groswpm);
    console.log("NetWpm: " + netwpm);
    console.log("Acc: " + acc);
    console.log("Mistakes: " + mistakes);

    document.addEventListener("keydown", (e) => {
      e.preventDefault();
    });

    gamehasended = true;
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
inpField.addEventListener("input", Typing);

//=================================================
//
// Remake of ScoreSystem & Localstorage
//
//=================================================

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
  score = Math.round(netwpm + acc);

  lastPlayIsBetterThanTodaysBest = score > getScore("todaysBestScore");
  if (lastPlayIsBetterThanTodaysBest) {
    localStorage.setItem("todaysBestWpm", netwpm);
    todaysWpm.innerText = getScore("todaysBestWpm");

    localStorage.setItem("todaysBestCpm", cpm);
    todaysCpm.innerText = getScore("todaysBestCpm");

    localStorage.setItem("todaysBestAcc", acc);
    todaysAcc.innerText = getScore("todaysBestAcc") + "%";

    localStorage.setItem("todaysBestMistakes", mistakes);
    todaysMistake.innerText = getScore("todaysBestMistakes");

    localStorage.setItem("todaysBestTime", TimeSpendToFinish);
    todaysTime.innerText = getScore("todaysBestTime");

    localStorage.setItem("todaysBestScore", score);
  }

  lastPlayIsBetterThanAlltimesBest = score > getScore("alltimeBestScore");
  if (lastPlayIsBetterThanAlltimesBest) {
    localStorage.setItem("alltimeBestWpm", netwpm);
    alltimeWpm.innerText = getScore("alltimeBestWpm");

    localStorage.setItem("alltimeBestCpm", cpm);
    alltimeCpm.innerText = getScore("alltimeBestCpm");

    localStorage.setItem("alltimeBestAcc", acc);
    alltimeAcc.innerText = getScore("alltimeBestAcc") + "%";

    localStorage.setItem("alltimeBestMistakes", mistakes);
    alltimeMistake.innerText = getScore("alltimeBestMistakes");

    localStorage.setItem("allTimeBestTime", TimeSpendToFinish);
    alltimeTime.innerText = getScore("allTimeBestTime");

    localStorage.setItem("alltimeBestScore", score);
  }

  lastMistake.innerText = mistakes;
  lastCpm.innerText = cpm;
  lastWpm.innerText = netwpm;
  lastAcc.innerText = acc + "%";
  lastTime.innerText = TimeSpendToFinish;

  console.log(score);
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
const date1 = today.getDate();

if (date1 != localStorage.getItem("date")) {
  localStorage.setItem("date", date1);
  clearTodaysBest();
}

function refreshPage() {
  location.reload();
}

setUpScores();
loadStats();
