const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.querySelector(".content button"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  gameFrame = document.querySelector("#game"),
  resultFrame = document.querySelector("#scoreboard");
alltimeMistake = document.querySelector("#alltime_mistakes");
alltimeWpm = document.querySelector("#alltime_wpm");
alltimeCpm = document.querySelector("#alltime_cpm");
todaysMistake = document.querySelector("#today_mistakes");
todaysWpm = document.querySelector("#today_wpm");
todaysCpm = document.querySelector("#today_cpm");
lastMistake = document.querySelector("#last_mistakes");
lastWpm = document.querySelector("#last_wpm");
lastCpm = document.querySelector("#last_cpm");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);
gamehasended = false;

function saveTodaysBest() {
  localStorage.setItem("todays_mistakes", mistakeTag.innerText);
  document.querySelector('#today_mistakes').innerHTML = localStorage.getItem("todays_mistakes");
    
  localStorage.setItem("todays_wpm", wpmTag.innerText);
  lastWpm.innerHTML = localStorage.getItem("todays_wpm");

  localStorage.setItem("todays_cpm", cpmTag.innerText);
  lastCpm.innerHTML = localStorage.getItem("todays_cpm");

  reloadBest();
}

function saveAllTimesBest() {
  localStorage.setItem("alltimes_mistakes", mistakeTag.innerText);
  localStorage.setItem("alltimes_wpm", "" + wpmTag.innerText);
  localStorage.setItem("alltimes_cpm", "" + cpmTag.innerText);
}

function getTodaysBest(value) {
  savedTodaysMistakes = localStorage.getItem("todays_mistakes");
  savedTodaysWpm = localStorage.getItem("todays_wpm");
  savedTodaysCpm = localStorage.getItem("todays_cpm");

  if (value == "mistakes") {
    return savedTodaysMistakes;
  }
  if (value == "wpm") {
    return savedTodaysWpm;
  }
  if (value == "cpm") {
    return savedTodaysCpm;
  }
}

function getAllTimesBest(value) {
  savedAlltimeMistakes = localStorage.getItem("alltimes_mistakes");
  savedAlltimeWpm = localStorage.getItem("alltimes_wpm");
  savedAlltimeCpm = localStorage.getItem("alltimes_cpm");

  if (value == "mistakes") {
    return savedAlltimeMistakes;
  }
  if (value == "wpm") {
    return savedAlltimeWpm;
  }
  if (value == "cpm") {
    return savedAlltimeCpm;
  }
}

function reloadBest() {
  alltimeMistake.innerText = getAllTimesBest("mistakes");
  alltimeWpm.innerText = getAllTimesBest("wpm");
  alltimeCpm.innerText = getAllTimesBest("cpm");

  todaysMistake.innerText = getTodaysBest("mistakes");
  todaysCpm.innerText = getTodaysBest("wpm");
  todaysCpm.innerText = getTodaysBest("cpm");
}

function setLastPlay() {
  last_mistakes_number = mistakeTag.innerHTML;
  last_mistakes = document.querySelector("#last_mistakes");
  last_mistakes.innerHTML = last_mistakes_number;
  lastMistake = last_mistakes_number;

  last_cpm_number = cpmTag.innerHTML;
  last_cpm = document.querySelector("#last_cpm");
  last_cpm.innerHTML = last_cpm_number;
  lastCpm = last_cpm_number;

  last_wpm_number = wpmTag.innerHTML;
  last_wpm = document.querySelector("#last_wpm");
  last_wpm.innerHTML = last_wpm_number;
  lastWpm = last_wpm_number;

  localStorage.clear();
    console.log(localStorage.getItem("todays_wpm"))
    if(last_wpm_number > localStorage.getItem("todays_wpm")) {
        console.log("Score getoppt!")
        todaysWpm.innerHTML = last_wpm_number;
    }

}

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

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpmTag.innerText = wpm;
    if (timeLeft == 0) {
      setLastPlay();
      gameFrame.style.display = "none";
      resultFrame.style.display = "block";

      if (lastWpm > "40") {
        saveTodaysBest();
        // return;
      }
      if (wpm.innerText > getAllTimesBest("wpm")) {
        saveAllTimesBest();
        reloadBest();
        return;
      }
    }
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

function toggleGame() {
  if (gamehasended) {
    print;
    gameFrame.style.display = "none";
    resultFrame.style.display = "block";
    if (wpm > getTodaysBest("wpm")) {
      saveTodaysBest(mistakes, wpm, cpm);
    }

    if (wpm > getAllTimesBest("wpm")) {
      saveAllTimesBest(mistakes, wpm, cpm);
    }
    console.log(localStorage.getItem("todays_mistakes"));
  } else {
    resultFrame.style.display = "none";
    loadParagraph();
  }
}
lastMistake = "0";
lastWpm = "0";
lastCpm = "0";

localStorage.setItem("todays_mistakes", "0");
localStorage.setItem("todays_wpm", "0");
localStorage.setItem("todays_cpm", "0");

toggleGame();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
