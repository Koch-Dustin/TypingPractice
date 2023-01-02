const alltimeMistake = document.getElementById("alltime_mistakes");
const alltimeWpm = document.getElementById("alltime_wpm");
const alltimeCpm = document.getElementById("alltime_cpm");
const alltimeTime = document.getElementById("alltime_time");
const alltimeaccuracy = document.getElementById("alltime_accuracy");
const todaysMistake = document.getElementById("today_mistakes");
const todaysWpm = document.getElementById("today_wpm");
const todaysCpm = document.getElementById("today_cpm");
const todaysTime = document.getElementById("today_time");
const todaysScore = document.getElementById("today_score");
const todaysaccuracy = document.getElementById("today_accuracy");
const lastMistake = document.getElementById("last_mistakes");
const lastWpm = document.getElementById("last_wpm");
const lastCpm = document.getElementById("last_cpm");
const lastTime = document.getElementById("last_time");
const lastScore = document.getElementById("last_score");
const lastaccuracy = document.getElementById("last_accuracy");

function setUpScores() {
  if (localStorage.getItem("todaysBestWpm" == null)) {
    localStorage.setItem("todaysBestWpm", 0);
    localStorage.setItem("todaysBestCpm", 0);
    localStorage.setItem("todaysBestaccuracy", 0);
    localStorage.setItem("todaysBestMistakes", 0);
    localStorage.setItem("todaysBestScore", 0);
  }

  if (localStorage.getItem("alltimeBestWpm" == null)) {
    localStorage.setItem("alltimeBestWpm", 0);
    localStorage.setItem("alltimeBestCpm", 0);
    localStorage.setItem("alltimeBestaccuracy", 0);
    localStorage.setItem("alltimeBestMistakes", 0);
    localStorage.setItem("alltimeBestScore", 0);
  }
}

function setLastPlay() {
  score = Math.round(wordsPerMinuteWithoutMistakes + accuracy);

  lastPlayIsBetterThanTodaysBest = score > getScore("todaysBestScore");
  if (lastPlayIsBetterThanTodaysBest) {
    localStorage.setItem("todaysBestWpm", wordsPerMinuteWithoutMistakes);
    todaysWpm.innerText = getScore("todaysBestWpm");

    localStorage.setItem("todaysBestCpm", charactersPerMinute);
    todaysCpm.innerText = getScore("todaysBestCpm");

    localStorage.setItem("todaysBestaccuracy", accuracy);
    todaysaccuracy.innerText = getScore("todaysBestaccuracy") + "%";

    localStorage.setItem("todaysBestMistakes", mistakes);
    todaysMistake.innerText = getScore("todaysBestMistakes");

    localStorage.setItem("todaysBestTime", timeSpentToFinish);
    todaysTime.innerText = getScore("todaysBestTime");

    localStorage.setItem("todaysBestScore", score);
  }

  lastPlayIsBetterThanAlltimesBest = score > getScore("alltimeBestScore");
  if (lastPlayIsBetterThanAlltimesBest) {
    localStorage.setItem("alltimeBestWpm", wordsPerMinuteWithoutMistakes);
    alltimeWpm.innerText = getScore("alltimeBestWpm");

    localStorage.setItem("alltimeBestCpm", charactersPerMinute);
    alltimeCpm.innerText = getScore("alltimeBestCpm");

    localStorage.setItem("alltimeBestaccuracy", accuracy);
    alltimeaccuracy.innerText = getScore("alltimeBestaccuracy") + "%";

    localStorage.setItem("alltimeBestMistakes", mistakes);
    alltimeMistake.innerText = getScore("alltimeBestMistakes");

    localStorage.setItem("allTimeBestTime", timeSpentToFinish);
    alltimeTime.innerText = getScore("allTimeBestTime");

    localStorage.setItem("alltimeBestScore", score);
  }

  lastMistake.innerText = mistakes;
  lastCpm.innerText = charactersPerMinute;
  lastWpm.innerText = wordsPerMinuteWithoutMistakes;
  lastaccuracy.innerText = accuracy + "%";
  lastTime.innerText = timeSpentToFinish;
}

function getScore(typeOfBestScore) {
  return localStorage.getItem(typeOfBestScore);
}

function loadStats() {
  alltimeWpm.innerText = getScore("alltimeBestWpm");
  alltimeCpm.innerText = getScore("alltimeBestCpm");
  alltimeaccuracy.innerText = getScore("alltimeBestaccuracy") + "%";
  alltimeMistake.innerText = getScore("alltimeBestMistakes");
  alltimeTime.innerText = getScore("allTimeBestTime");

  todaysWpm.innerText = getScore("todaysBestWpm");
  todaysCpm.innerText = getScore("todaysBestCpm");
  todaysaccuracy.innerText = getScore("todaysBestaccuracy") + "%";
  todaysMistake.innerText = getScore("todaysBestMistakes");
  todaysTime.innerText = getScore("todaysBestTime");
}

function clearTodaysBest() {
  localStorage.setItem("todaysBestWpm", 0);
  localStorage.setItem("todaysBestCpm", 0);
  localStorage.setItem("todaysBestaccuracy", 0);
  localStorage.setItem("todaysBestMistakes", 0);
  localStorage.setItem("todaysBestScore", 0);
  localStorage.setItem("todaysBestTime", 0);

  todaysWpm.innerText = getScore("todaysBestWpm");
  todaysCpm.innerText = getScore("todaysBestCpm");
  todaysaccuracy.innerText = getScore("todaysBestaccuracy") + "%";
  todaysMistake.innerText = getScore("todaysBestMistakes");
  todaysTime.innerText = getScore("todaysBestTime");
}

function clearAlltimeBest() {
  localStorage.setItem("alltimeBestWpm", 0);
  localStorage.setItem("alltimeBestCpm", 0);
  localStorage.setItem("alltimeBestaccuracy", 0);
  localStorage.setItem("alltimeBestMistakes", 0);
  localStorage.setItem("alltimeBestScore", 0);
  localStorage.setItem("allTimeBestTime", 0);

  alltimeWpm.innerText = getScore("alltimeBestWpm");
  alltimeCpm.innerText = getScore("alltimeBestCpm");
  alltimeaccuracy.innerText = getScore("alltimeBestaccuracy") + "%";
  alltimeMistake.innerText = getScore("alltimeBestMistakes");
  alltimeTime.innerText = getScore("allTimeBestTime");
}

setUpScores();
loadStats();
