const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".design-of-game-boxes .input-field"),
tryAgainBtn = document.querySelector(".credits-retry button"),
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
let acc

let timer,
  timeSpend = 0
  charIndex = (mistakes = isTyping = 0);
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
}

function Typing() {
  const characters = typingText.innerText;
  const typedCharactersNumber = document.getElementsByClassName('test')
  const numberOfWritenCharacters = document.getElementsByClassName('typed').length;
  let typedChar = inpField.value.split("")[charIndex];
  const character = characters[charIndex];
  const list = typedCharactersNumber[charIndex].classList;

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

    timeSpend = 0
    firstCharacterTyped = false

    groswpm = Math.round(((typedCharactersNumber.length / 5) / TimeSpendToFinish) * 60)
    netwpm = Math.round(groswpm - (mistakes / (TimeSpendToFinish / 60)))
    acc = (netwpm / groswpm) * 100
    console.log("GrossWpm: " + groswpm)
    console.log("NetWpm: " + netwpm)
    console.log("Acc: " + acc)
  }

  if(character === typedChar) {
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
inpField.addEventListener("input", Typing, calculateAcc);




function calculateAcc() {
// globale variablen
  const characters = typingText.innerText;
  const typedCharactersNumber = document.getElementsByClassName('test')
  const numberOfWritenCharacters = document.getElementsByClassName('typed').length;
  let typedChar = inpField.value.split("")[charIndex];
  const character = characters[charIndex];
  const list = typedCharactersNumber[charIndex].classList;
  let neededCharacter = inpField.value[charIndex - 1]

// correctWordCount
  var correctWordCount
// wordCount
  var wordCount
// currentWordIsCorrect
  var currentWordIsCorrect 
// correctCharacter
  var correctCharacter


// in event listener

  if(character === typedChar) {
    correctCharacter++
    if( typedChar == " ") {
      wordCount++
      if(currentWordIsCorrect) {
        correctWordCount++
        currentWordCount ++
      }else {
        currentWordIsCorrect = true
      }
    }
  }else {
    if(neededCharacter == " ") {
      wordCount++
    }

  }

  console.log(correctWordCount)
  console.log(correctWordCount)
  console.log(currentWordIsCorrect)
}

//=================================================
// 
// Remake of ScoreSystem & Localstorage
// 
//=================================================

todaysBestWpm = "todays-best-wpm"
todaysBestCpm = "todays-best-cpm"
todaysBestAcc = "todays-best-acc"
todaysBestMistakes = "todays-best-mistakes"
todaysBestScore = "todays-best-score"

alltimeBestWpm = "alltime-best-wpm"
alltimeBestCpm = "alltime-best-cpm"
alltimeBestAcc = "alltime-best-acc"
alltimeBestMistakes = "alltime-best-mistakes"
alltimeBestScore = "alltime-best-score"

function setUpScores() {
  if(localStorage.getItem(todaysBestWpm == null)) {
    localStorage.setItem(todaysBestWpm = "0")
    localStorage.setItem(todaysBestCpm) = "0"
    localStorage.setItem(todaysBestAcc = "0")
    localStorage.setItem(todaysBestMistakes = "0")
  }
  if(localStorage.getItem(alltimeBestWpm == null)) {
    localStorage.setItem(alltimeBestWpm = "0")
    localStorage.setItem(alltimeBestCpm = "0")
    localStorage.setItem(alltimeBestAcc = "0")
    localStorage.setItem(alltimeBestMistakes = "0")
  }
}

function setLastPlay() {

  score = netwpm + acc

  lastPlayIsBetterThanTodaysBest = score
  if(lastPlayIsBetterThanTodaysBest) {
    localStorage.setItem(todaysBestWpm, netwpm)
    localStorage.setItem(todaysBestCpm, cpm)
    localStorage.setItem(todaysBestAcc, acc)
    localStorage.setItem(todaysBestMistakes, mistakes)
    localStorage.setItem(todaysBestScore, score)
  }

  lastPlayIsBetterThanAlltimesBest
  if(lastPlayIsBetterThanAlltimesBest) {
    localStorage.setItem(alltimeBestWpm, netwpm)
    localStorage.setItem(alltimeBestCpm, cpm)
    localStorage.setItem(alltimeBestAcc, acc)
    localStorage.setItem(alltimeBestMistakes, mistakes)
    localStorage.setItem(alltimeBestScore, score)
  }  
}

function getScores() {

}
