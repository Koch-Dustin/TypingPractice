const generateWordButton = document.getElementById("generate-text-button");

async function generateWords() {
  await getWords();
  textToWrite.focus();

  clearInterval(intervalId);
  timeSpend = 0;
  firstCharacterTyped = false;

  wordCounter.style.display = "none";
  generateWordButton.style.display = "none";
}

async function getWords() {
  const url =
    "https://random-word-api.herokuapp.com/word?number=" +
    document.getElementById("word-count").value;

  const res = await fetch(url);
  const data = await res.json();
  const output = await data.toString().replaceAll(",", " ");
  textToWrite.innerHTML = await output;
  splitWords();
}
