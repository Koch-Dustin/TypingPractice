const typingText = document.getElementById("text-to-write");
const generateWordButton = document.getElementById("generate-text-button");

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
