const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".design-of-game-boxes .input-field"),
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
lastTime = document.querySelector("#last_time")
deleteToday = document.querySelector(".delete-today");
deleteAlltime = document.querySelector(".delete-alltime");

var intervalId;
let TimeSpendToFinish
let cpm
let netwpm
let groswpm
let mistakes

let timer,
  timeSpend = 0
  charIndex = (mistakes = isTyping = 0);
gamehasended = false;
firstCharacterTyped = false;

function saveTodaysBest() {
  localStorage.setItem("todays_wpm", wpmTag.innerText);
  todaysWpm.innerHTML = localStorage.getItem("todays_wpm")

  localStorage.setItem("todays_mistakes", mistakeTag.innerText);
  todaysMistake.innerHTML = localStorage.getItem("todays_mistakes")

  localStorage.setItem("todays_cpm", cpmTag.innerText);
  todaysCpm.innerHTML = localStorage.getItem("todays_cpm")

  localStorage.setItem("todays_time", )
}

function saveAllTimesBest() {
  localStorage.setItem("alltimes_mistakes", mistakeTag.innerText);
  alltimeMistake.innerHTML = localStorage.getItem("alltimes_mistakes")

  localStorage.setItem("alltimes_wpm", "" + wpmTag.innerText);
  alltimeWpm.innerHTML = localStorage.getItem("alltimes_wpm")

  localStorage.setItem("alltimes_cpm", "" + cpmTag.innerText);
  alltimeCpm.innerHTML = localStorage.getItem("alltimes_cpm")
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
  lastMistake.innerText = mistakes

  lastCpm.innerText = Math.round(cpm)

  lastWpm.innerText = netwpm

  lastTime.innerText = TimeSpendToFinish


  console.log()

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

function initTimer() {
  const characters = typingText.innerText;
  const numberOfWritenCharacters = document.getElementsByClassName('typed').length + 1;


  // while ((numberOfWritenCharacters) != characters.length) {
  //   console.log("awdiohjawdhoiawoihdawiohd")
  // }

}

deleteToday.addEventListener("click", (e) => {
  console.log("Todays Best score is deleted")
});

deleteAlltime.addEventListener("click", (e) => {
  console.log("Alltimes Best score is deleted")
});

function resetGame() {
  generateWords();
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
  } else {
    resultFrame.style.display = "none";
  }
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function setupScores() {
  console.log("AlltimeMistakes: " + localStorage.getItem("alltimes_mistakes"))
  console.log("AlltimeWpm: " + localStorage.getItem("alltimes_wpm"))
  console.log("AlltimeCpm: " + localStorage.getItem("alltimes_cpm"))
  console.log("TodaysMistakes: " + localStorage.getItem("todays_mistakes"))
  console.log("TodaysWpm: " + localStorage.getItem("todays_wpm"))
  console.log("TodaysCpm: " + localStorage.getItem("todays_cpm"))

  alltimeMistake.innerText = localStorage.getItem("alltimes_mistakes");
  alltimeWpm.innerText = localStorage.getItem("alltimes_wpm");
  alltimeCpm.innerText = localStorage.getItem("alltimes_cpm");

  todaysMistake.innerText = localStorage.getItem("todays_mistakes")
  todaysWpm.innerText = localStorage.getItem("todays_wpm")
  todaysCpm.innerText = localStorage.getItem("todays_cpm")
}

setupScores();

if(getTodaysBest("wpm") == null) {
  localStorage.setItem("todays_mistakes", "0");
  localStorage.setItem("todays_wpm", "0");
  localStorage.setItem("todays_cpm", "0");
}

async function generateWords() {
  fetch('https://random-word-api.herokuapp.com/word?number=' + document.getElementById('word-count').value)
    .then(res => res.json())
    .then(data => output = data.toString().replaceAll(",", " "))
    .then(output => typingText.innerHTML = output)
    .then(() => splitWords())
  typingText.focus();
  
  clearInterval(intervalId)
  timeSpend = 0
  firstCharacterTyped = false

}

let myArray

function splitWords() {
  let text = typingText.innerHTML;
  typingText.innerHTML = ""
  myArray = text.split("");
  myArray.forEach(span => {
    let spanTag = `<span class="test">${span}</span>`;
    typingText.innerHTML += spanTag;
  })
  console.log(myArray);
}

function Typing() {
  const characters = typingText.innerText;
  const characters2 = document.getElementsByClassName('test')
  const numberOfWritenCharacters = document.getElementsByClassName('typed').length;
  let typedChar = inpField.value.split("")[charIndex];
  const character = characters[charIndex];
  const list = characters2[charIndex].classList;

  if (firstCharacterTyped == false) {
    firstCharacterTyped = true;
    intervalId = window.setInterval(function() {
        timeSpend++;
    }, 1000);
  }

  if(numberOfWritenCharacters + 1 == characters.length) {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
    })

    gamehasended =  true
    toggleGame()
    
    clearInterval(intervalId)

    TimeSpendToFinish = timeSpend;
    TimeSpendToFinishInMinutes = (TimeSpendToFinish / 60)
    console.log(TimeSpendToFinishInMinutes)
    cpm = (numberOfWritenCharacters / timeSpend) * 60
    netwpm = Math.round((numberOfWritenCharacters - mistakes) * TimeSpendToFinishInMinutes)
    netwpm = Math.round()
    groswpm = Math.round(numberOfWritenCharacters / TimeSpendToFinishInMinutes)

    setLastPlay()
    timeSpend = 0
    firstCharacterTyped = false

    acc = (netwpm / groswpm) * 100
    console.log("t" + TimeSpendToFinish)
    console.log(TimeSpendToFinishInMinutes)
    console.log(netwpm)
    console.log(groswpm)
    console.log(netwpm / groswpm)
    console.log("acc: " + acc)
  }

  CurrentWord = 1
  if(character === typedChar) {
    if(typedChar == " ") {
      CurrentWord++
    }
    console.log("correct")
    list.remove("active")
    list.add('correct');
    list.add('typed')
  }else {
    console.log("incorrect")
    list.remove("active")
    list.add('incorrect');
    list.add('typed')
    mistakes++;
  }
  charIndex++;

}

document.addEventListener('keydown', function(e) {
  if(e.keyCode == 8) {
    e.preventDefault();
  }
});

// stelle im Array wo der Text in einzelnen Chars abgespeichert wird.

toggleGame();
tryAgainBtn.addEventListener("click", resetGame);
inpField.addEventListener("input", Typing);



// Formel

// woerter geschrieben (nicht generiert)
